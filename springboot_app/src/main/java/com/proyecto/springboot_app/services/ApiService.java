package com.proyecto.springboot_app.services;

import com.proyecto.springboot_app.models.*;
import com.proyecto.springboot_app.repositories.*;
import com.proyecto.springboot_app.utils.ValidateComentario;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ApiService {

    private final ActividadRepository actividadRepository;
    private final RegionRepository regionRepository;
    private final ComentarioRepository comentarioRepository;

    public ApiService(ActividadRepository actividadRepository,
                      RegionRepository regionRepository,
                      ComentarioRepository comentarioRepository) {
        this.actividadRepository = actividadRepository;
        this.regionRepository = regionRepository;
        this.comentarioRepository = comentarioRepository;
    }

    public List<Actividad> getTodasLasActividades() {
        return actividadRepository.findAll();
    }

    public List<Map<String, Object>> getActividadesParaEstadisticas() {
        List<Actividad> actividades = actividadRepository.findAll();
        List<String> dia_semana = Arrays.asList("Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo");
        return actividades.stream()
                .map(actividad -> {
                    Map<String, Object> actividadMap = new HashMap<>();
                    Integer numeroDia = actividad.getDiaHoraInicio().getDayOfWeek().getValue() - 1; // 0 = Lunes, 6 = Domingo
                    actividadMap.put("dia_semana", dia_semana.get(numeroDia)); // Entrega el dia de la semana de la actividad
                    actividadMap.put("mes", actividad.getDiaHoraInicio().getMonthValue() - 1); // Entrega el mes de la actividad (0 = Enero, 11 = Diciembre)
                    actividadMap.put("bloque_horario",
                            actividad.getDiaHoraInicio().getHour() < 6 ? "Madrugada" :
                            actividad.getDiaHoraInicio().getHour() < 12 ? "Mañana" :
                            actividad.getDiaHoraInicio().getHour() < 18 ? "Mediodía" : "Tarde"
                    ); // Entrega el bloque horario de la actividad
                    actividadMap.put("tema", actividad.getTema() != null ?
                            Map.of(
                                    "tema", actividad.getTema().getTema() != null ? actividad.getTema().getTema() : "",
                                    "glosa_otro", actividad.getTema().getGlosaOtro() != null ? actividad.getTema().getGlosaOtro() : ""
                            ) : Map.of(
                                    "tema", "",
                                    "glosa_otro", ""
                            )
                    );
                    return actividadMap;
                })
                .collect(Collectors.toList());
    }

    public List<Region> getRegiones() {
        return regionRepository.findAll();
    }

    public List<Map<String, String>> getComentariosPorActividad(Integer actividadId) {
        List<Comentario> comentarios = comentarioRepository.findByActividadIdOrderByFechaDesc(actividadId);
        return comentarios.stream().map(c -> Map.of(
                "nombre", c.getNombre(),
                "texto", c.getTexto(),
                "fecha", c.getFecha().toString()
        )).collect(Collectors.toList());
    }

    public List<String> nuevoComentario(Integer actividadId, Map<String, String> data) {
        ValidateComentario validateComentario = new ValidateComentario();
        List<String> errores = new ArrayList<String>();
        Boolean valid = validateComentario.isValid(data);
        if (!valid) {
            errores = validateComentario.getErrores();
            return errores;
        }
        Optional<Actividad> actividadOpt = actividadRepository.findById(actividadId);
        if (actividadOpt.isEmpty()) {
            errores.add("Actividad no encontrada");
            return errores;
        }
        Actividad actividad = actividadOpt.get();
        Comentario nuevo = new Comentario(data.get("nombre"), data.get("texto"), actividad);
        comentarioRepository.save(nuevo);
        return errores;
    }
}
