package com.proyecto.springboot_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.springboot_app.models.Nota;

public interface NotaRepository extends JpaRepository<Nota, Integer> {
}
