package com.proyecto.springboot_app.controllers;

import com.proyecto.springboot_app.models.Region;
import com.proyecto.springboot_app.services.ApiService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final ApiService apiService;

    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/actividades")
    public Map<String, Object> getTodasLasActividades() {
        return Map.of("status", "ok", "data", apiService.getTodasLasActividades());
    }

    @GetMapping("/actEstadisticas")
    public Map<String, Object> getEstadisticas() {
        return Map.of("status", "ok", "data", apiService.getActividadesParaEstadisticas());
    }

    @GetMapping("/regiones")
    public Map<String, Object> getRegiones() {
        List<Region> regiones = apiService.getRegiones();
        return Map.of("status", "ok", "data", regiones);
    }

    @GetMapping("/comentarios/{actividadId}")
    public Map<String, Object> getComentarios(@PathVariable Integer actividadId) {
        List<Map<String, String>> comentarios = apiService.getComentariosPorActividad(actividadId);
        return Map.of("status", "ok", "data", comentarios);
    }

    @PostMapping("/comentarios/{actividadId}")
    @ResponseBody
    public Map<String, Object> postComentario(@PathVariable Integer actividadId,
                                              @RequestBody Map<String, String> data) {
        List<String> errores = apiService.nuevoComentario(actividadId, data);
        if (!errores.isEmpty()) {
            return Map.of("status", "error", "errores", errores);
        }
        return Map.of("status", "ok", "mensaje", "Comentario agregado exitosamente");
    }

    @PostMapping("/evaluar")
    @ResponseBody
    public Map<String, Object> evaluarActividadAjax(@RequestBody Map<String, String> body) {
        Integer id = null;
        try {
            id = Integer.parseInt(body.get("actividadId"));
        } catch (NumberFormatException e) {
            return Map.of("status", "error", "mensaje", "Actividad no encontrada");
        }
        List<String> errores = apiService.nuevaNota(id, body);
        if (!errores.isEmpty()) {
            return Map.of("status", "error", "errores", errores);
        }
        Double nuevaCalificacion = apiService.getActividadById(id).getCalificacion();
        return Map.of("status", "ok", "mensaje", "Nota agregada exitosamente", "calificacion", nuevaCalificacion);
    }
}

