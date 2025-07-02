package com.proyecto.springboot_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "region")
public class Region {

    @Id
    @NotNull
    private Integer id;

    @NotNull
    @Column(nullable = false, length = 200)
    private String nombre;

    @NotNull
    @OneToMany(mappedBy = "region", cascade = CascadeType.ALL)
    private List<Comuna> comunas;

    public Region() {}

    public Region(Integer id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public List<Comuna> getComunas() {
        return comunas;
    }
}
