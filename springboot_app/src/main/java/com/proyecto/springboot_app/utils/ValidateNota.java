package com.proyecto.springboot_app.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ValidateNota {
    private List<String> errores = new ArrayList<String>();
    public boolean isValid(Map<String, String> data) {
        boolean isValid = true;
        Double nota = null;
        String error = null;
        try {
            nota = data.get("nota") != null ? Double.parseDouble(data.get("nota")) : null;
        } catch (NumberFormatException e) {
            errores.add("La nota debe ser un número válido");
            return false;
        }
        error = validate_nota(nota);
        if (error != null) {
            isValid = false;
            errores.add(error);
        }
        return isValid;
    }

    public List<String> getErrores() {
        return errores;
    }

    private String validate_nota(Double nota) {
        if (nota == null) {
            return "La nota no puede ser nula";
        }
        if (nota < 1 || nota > 7) {
            return "La nota debe estar entre 1 y 7";
        }
        return null;
    }
}
