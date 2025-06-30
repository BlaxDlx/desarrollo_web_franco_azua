package com.proyecto.springboot_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "nota")
public class Nota {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer nota;

    @ManyToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    public Nota () {}

    public Nota(Integer id, Integer nota, Actividad actividad) {
        this.id = id;
        this.nota = nota;
        this.actividad = actividad;
    }

    public Integer getId() {
        return id;
    }

    public Integer getNota() {
        return nota;
    }

    public Actividad getActividad() {
        return actividad;
    }
}
