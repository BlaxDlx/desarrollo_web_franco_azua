package com.proyecto.springboot_app.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ValidateComentario {
    private List<String> errores = new ArrayList<String>();
    public boolean isValid(Map<String, String> data) {
        boolean isValid = true;
        String error = validate_nombreComentario(data.get("nombre"));
        if (error != null) {
            isValid = false;
            errores.add(error);
        }
        error = validate_texto(data.get("texto"));
        if (error != null) {
            isValid = false;
            errores.add(error);
        }
        return isValid;
    }

    public List<String> getErrores() {
        return errores;
    }

    private String validate_nombreComentario(String nombre) {
        if (nombre == null || nombre.isEmpty()) {
            return "El nombre no puede estar vacío";
        }
        if (!(nombre.length() <= 80 && nombre.length() >= 3)) {
            return "El nombre no puede exceder los 50 caracteres";
        }
        return null;
    }

    private String validate_texto(String texto) {
        if (texto == null || texto.isEmpty()) {
            return "Debe ingresar un comentario (máx 300 caracteres).";
        }
        if (!(texto.length() >= 5 && texto.length() <= 300)) {
            return "El comentario debe tener entre 5 y 300 caracteres.";
        }
        return null;
    }
}