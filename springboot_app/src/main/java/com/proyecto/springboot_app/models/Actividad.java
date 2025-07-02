package com.proyecto.springboot_app.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
@Table(name = "actividad")
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "comuna_id", nullable = false)
    private Comuna comuna;

    private String sector;

    @NotNull
    @Column(nullable = false, length = 200)
    private String nombre;

    @NotNull
    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 15)
    private String celular;

    @NotNull
    @Column(name = "dia_hora_inicio", nullable = false)
    private LocalDateTime diaHoraInicio;

    @Column(name = "dia_hora_termino")
    private LocalDateTime diaHoraTermino;

    @Column(length = 500)
    private String descripcion;

    @NotNull
    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<Foto> fotos;

    @NotNull
    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<ContactarPor> contactos;

    @NotNull
    @OneToOne(mappedBy = "actividad", cascade = CascadeType.ALL)
    private ActividadTema tema;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<Comentario> comentarios;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<Nota> notas;

    public Actividad() {}

    public Actividad(Integer id,
                     Comuna comuna,
                     String nombre,
                     String email,
                     LocalDateTime horaInicio,
                     List<Foto> fotos,
                     List<ContactarPor> contactos,
                     ActividadTema tema,
                     String sector,
                     String celular,
                     LocalDateTime horaTermino,
                     String descripcion) {
        this.id = id;
        this.comuna = comuna;
        this.sector = sector;
        this.nombre = nombre;
        this.email = email;
        this.celular = celular;
        this.diaHoraInicio = horaInicio;
        this.diaHoraTermino = horaTermino;
        this.descripcion = descripcion;
        this.fotos = fotos;
        this.contactos = contactos;
        this.tema = tema;
    }

    public Integer getId() {
        return id;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public String getSector() {
        return sector;
    }

    public String getNombre() {
        return nombre;
    }

    public String getEmail() {
        return email;
    }

    public String getCelular() {
        return celular;
    }

    public LocalDateTime getDiaHoraInicio() {
        return diaHoraInicio;
    }

    public String getHoraInicio() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return diaHoraInicio.format(formatter);
    }

    public LocalDateTime getDiaHoraTermino() {
        return diaHoraTermino;
    }

    public String getHoraTermino() {
        if (diaHoraTermino == null) return "";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return diaHoraTermino.format(formatter);
    }

    public boolean isActividadTerminada() {
        return diaHoraTermino != null && diaHoraTermino.isBefore(LocalDateTime.now());
    }


    public String getDescripcion() {
        return descripcion;
    }

    public List<Foto> getFotos() {
        return fotos;
    }

    public List<ContactarPor> getContactos() {
        return contactos;
    }

    public ActividadTema getTema() {
        return tema;
    }

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public List<Nota> getNotas() {
        return notas;
    }

public double getCalificacion() {
    return notas.stream().mapToDouble(Nota::getNota).average().orElse(0.0);
}
}