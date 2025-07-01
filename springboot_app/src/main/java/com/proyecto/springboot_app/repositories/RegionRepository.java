package com.proyecto.springboot_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.proyecto.springboot_app.models.Region;

public interface RegionRepository extends JpaRepository<Region, Integer> {}
