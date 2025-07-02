package com.proyecto.springboot_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "contactar_por")
public class ContactarPor {

    public enum TipoContacto {
        whatsapp, telegram, X, instagram, tiktok, otra
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private TipoContacto nombre;

    @NotNull
    @Column(nullable = false, length = 150)
    private String identificador;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    public ContactarPor() {}

    public ContactarPor(TipoContacto nombre, String identificador, Actividad actividad) {
        this.nombre = nombre;
        this.identificador = identificador;
        this.actividad = actividad;
    }

    public Integer getId() {
        return id;
    }

    public TipoContacto getNombre() {
        return nombre;
    }

    public String getIdentificador() {
        return identificador;
    }

    public Actividad getActividad() {
        return actividad;
    }
}
