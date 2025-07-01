package com.proyecto.springboot_app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.springboot_app.models.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    List<Comentario> findByActividadIdOrderByFechaDesc(Integer actividadId);
}
