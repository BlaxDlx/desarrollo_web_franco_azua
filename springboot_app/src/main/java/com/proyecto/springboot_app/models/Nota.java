package com.proyecto.springboot_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "nota")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(nullable = false)
    private Double nota;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    public Nota () {}

    public Nota(Double nota, Actividad actividad) {
        this.nota = nota;
        this.actividad = actividad;
    }

    public Integer getId() {
        return id;
    }

    public Double getNota() {
        return nota;
    }

    public Actividad getActividad() {
        return actividad;
    }
}
