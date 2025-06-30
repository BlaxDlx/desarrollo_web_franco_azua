package com.proyecto.springboot_app.models;

import jakarta.persistence.*;

@Entity
@Table(name = "actividad_tema")
public class ActividadTema {

    public enum Tema {
        Música, Deporte, Ciencias, Religión, Política, Tecnología, Juegos, Baile, Comida, Otro
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tema tema;

    @Column(name = "glosa_otro", length = 15)
    private String glosaOtro;

    @OneToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    public ActividadTema() {}

    public ActividadTema(Tema tema, Actividad actividad) {
        this.tema = tema;
        this.actividad = actividad;
    }

    public ActividadTema(Tema tema, Actividad actividad, String glosaOtro) {
        this.tema = tema;
        this.glosaOtro = glosaOtro;
        this.actividad = actividad;
    }

    public Integer getId() {
        return id;
    }

    public Tema getTema() {
        return tema;
    }

    public String getGlosaOtro() {
        return glosaOtro;
    }

    public Actividad getActividad() {
        return actividad;
    }
}