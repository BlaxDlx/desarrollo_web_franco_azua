-- Active: 1747361000098@@127.0.0.1@3306@tarea2

-- Actividades
INSERT INTO actividad (id, comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion) VALUES
  (1, 130208, 'Beauchef 850', 'Escuela de Boxeo', 'boxeo@email.com', '912345678', '2025-03-28 12:00:00', '2025-03-28 14:00:00', 'Clase de boxeo para niños'),
  (2, 130210, 'Plaza Ñuñoa', 'Cómo deshidratar fruta', 'huertos@email.com', '912345679', '2025-03-29 19:00:00', '2025-03-29 20:00:00', 'Taller de alimentación saludable'),
  (3, 130207, 'Parque Inés', 'Taller cerámica básica', 'manos@email.com', NULL, '2025-04-02 10:00:00', '2025-04-02 12:30:00', 'Aprende cerámica desde cero'),
  (4, 130209, 'Casa Cultura', 'Pintura al aire libre', 'colores@email.com', NULL, '2025-04-03 16:00:00', '2025-04-03 18:00:00', 'Pintura para todas las edades'),
  (5, 130218, 'Huerto Urbano', 'Introducción a la huerta', 'recoleta@email.com', NULL, '2025-04-05 09:00:00', '2025-04-05 11:00:00', 'Taller de medioambiente'),
  (6, 130210, 'Anfiteatro Parque Bustamante', 'Concierto de Jazz', 'jazz@email.com', '912346001', '2025-04-12 18:00:00', '2025-04-12 20:00:00', 'Concierto gratuito de jazz al aire libre para toda la comunidad');

-- Temas
INSERT INTO actividad_tema (id, actividad_id, tema, glosa_otro) VALUES
  (1, 1, 'Deporte', NULL),
  (2, 2, 'Comida', NULL),
  (3, 3, 'Otro', 'Arte'),
  (4, 4, 'Otro', 'Pintura'),
  (5, 5, 'Otro', 'Medioambiente'),
  (6, 6, 'Música', NULL);

-- Fotos
INSERT INTO foto (id, actividad_id, ruta_archivo, nombre_archivo) VALUES
  (1, 1, 'uploads/boxeo.png', 'boxeo.png'),
  (2, 2, 'uploads/fruta.png', 'fruta.png'),
  (3, 3, 'uploads/ceramica.png', 'ceramica.png'),
  (4, 4, 'uploads/pintura.png', 'pintura.png'),
  (5, 5, 'uploads/huerta.png', 'huerta.png'),
  (6, 1, 'uploads/boxeo1.png', 'boxeo1.png'),
  (7, 1, 'uploads/boxeo2.png', 'boxeo2.png'),
  (8, 1, 'uploads/boxeo3.png', 'boxeo3.png'),
  (9, 1, 'uploads/boxeo4.png', 'boxeo4.png'),
  (10, 6, 'uploads/jazz.png', 'jazz.png');


-- Contactos
INSERT INTO contactar_por (id, nombre, identificador, actividad_id) VALUES
  (1, 'whatsapp', '+56991234567', 1),
  (2, 'instagram', 'escuela_boxeo', 1),
  (3, 'telegram', '@huertos_chile', 2),
  (4, 'whatsapp', '+56991234579', 2),
  (5, 'instagram', 'manos_creativas', 3),
  (6, 'tiktok', 'pintura_arte', 4),
  (7, 'whatsapp', '+56998765432', 5),
  (8, 'otra', 'contacto_medioambiente@gmail.com', 5),
  (9, 'instagram', 'jazz_en_parque', 6),
  (10, 'whatsapp', '+56991234601', 6);