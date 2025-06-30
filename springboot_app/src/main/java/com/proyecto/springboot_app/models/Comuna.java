package com.proyecto.springboot_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "comuna")
public class Comuna {

    @Id
    @NotNull
    private Integer id;

    @Column(nullable = false, length = 200)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @OneToMany(mappedBy = "comuna", cascade = CascadeType.ALL)
    private List<Actividad> actividades;

    public Comuna() {}

    public Comuna(Region region, Integer id, String nombre) {
        this.nombre = nombre;
        this.region = region;
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Region getRegion() {
        return region;
    }

    public List<Actividad> getActividades() {
        return actividades;
    }
}
