package com.proyecto.springboot_app.repositories;

import com.proyecto.springboot_app.models.Actividad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, Integer> {
    Page<Actividad> findAllByOrderByIdDesc(Pageable pageable);
}
