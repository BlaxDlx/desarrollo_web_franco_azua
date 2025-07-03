package com.proyecto.springboot_app.services;

import com.proyecto.springboot_app.models.*;
import com.proyecto.springboot_app.repositories.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;

@Service
public class AppService {

    private final ActividadRepository actividadRepository;
    private final String pathStatic;

    public AppService(ActividadRepository actividadRepository) throws IOException {
        this.actividadRepository = actividadRepository;

        Path staticDir = Paths.get(ResourceUtils.getFile("classpath:static").getAbsolutePath());
        this.pathStatic = staticDir.toString();
        System.out.println("Static path resolved to: " + this.pathStatic);
    }

    public List<Actividad> getUltimasActividades(int limit) {
        return actividadRepository.findAllByOrderByIdDesc(PageRequest.of(0, limit)).getContent();
    }

    
    public Map<String, Object> getListadoPaginado(int page, int size) {
        Map<String, Object> datos = new HashMap<>();
        List<Actividad> actividades = actividadRepository.findAllByOrderByIdDesc(PageRequest.of(page - 1, size)).getContent();
        long totalActividades = actividadRepository.count();
        int totalPages = (int) Math.ceil((double) totalActividades / size);

        datos.put("actividades", actividades);
        datos.put("page", page);
        datos.put("total_pages", totalPages);
        return datos;
    }
}
