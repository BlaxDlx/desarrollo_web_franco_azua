package com.proyecto.springboot_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "comentario")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(nullable = false, length = 80)
    private String nombre;

    @NotNull
    @Column(nullable = false, length = 300)
    private String texto;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime fecha;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    public Comentario() {}

    public Comentario(String nombre, String texto, Actividad actividad) {
        this.nombre = nombre;
        this.texto = texto;
        this.fecha = LocalDateTime.now();
        this.actividad = actividad;
    }

    public Comentario(String nombre,
                      String texto,
                      LocalDateTime fecha,
                      Actividad actividad) {
        this.nombre = nombre;
        this.texto = texto;
        this.fecha = fecha;
        this.actividad = actividad;
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getTexto() {
        return texto;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public Actividad getActividad() {
        return actividad;
    }
}
