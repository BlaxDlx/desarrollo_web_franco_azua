package com.proyecto.springboot_app.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.springboot_app.models.Nota;

public interface NotaRepository extends JpaRepository<Nota, Integer> {
    Page<Nota> findAllByActividadIdOrderByIdDesc(Integer actividadId, Pageable pageable);
}
