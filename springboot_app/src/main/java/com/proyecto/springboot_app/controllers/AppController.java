package com.proyecto.springboot_app.controllers;

import com.proyecto.springboot_app.services.AppService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class AppController {

    private final AppService appService;

    public AppController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/")
    public String indexRoute(@RequestParam(name = "mensaje", required = false) String mensaje, Model model) {
        model.addAttribute("actividades", appService.getUltimasActividades(5));
        model.addAttribute("mensaje", mensaje);
        return "index";
    }

    @GetMapping("/formulario")
    public String formularioRoute() {
        return "formulario";
    }

    @GetMapping("/listado")
    public String listadoRoute(@RequestParam(name = "page", defaultValue = "1") int page, Model model) {
        Map<String, Object> datos = appService.getListadoPaginado(page, 5);
        model.addAttribute("actividades", datos.get("actividades"));
        model.addAttribute("page", datos.get("page"));
        model.addAttribute("total_pages", datos.get("total_pages"));
        return "listado";
    }

    @GetMapping("/estadisticas")
    public String estadisticasRoute() {
        return "estadisticas";
    }

    @GetMapping("/evaluar")
    public String evaluarRoute(@RequestParam(name = "page", defaultValue = "1") int page, Model model) {
        Map<String, Object> datos = appService.getListadoPaginado(page, 5);
        model.addAttribute("actividades", datos.get("actividades"));
        model.addAttribute("page", datos.get("page"));
        model.addAttribute("total_pages", datos.get("total_pages"));
        return "evaluar";
    }
}

