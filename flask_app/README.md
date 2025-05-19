# Decisiones sobre el código y otros comentarios
### Listado
Para esta parte, tomé varias decisiones que afectan a los archivos app.py, listado.js y db.py. Me encontré principalmente con dos problemas.

El primero fue cómo pasar las actividades obtenidas desde la base de datos al archivo listado.js. Como no se pueden pasar directamente objetos Python a JavaScript, usé el filtro |tojson en la plantilla para convertir las actividades a JSON.

Sin embargo, tuve algunos problemas con el formato, así que creé una función auxiliar en Python que convertía las actividades en una estructura más simple (como un diccionario o lista de diccionarios), más fácil de serializar y consumir desde JS. Luego, pasé ambas representaciones a render_template: una para uso en el HTML y otra que podía usar desde JavaScript.

Consideré usar fetch para obtener los datos mediante AJAX, pero como no se mencionaba en el enunciado, decidí evitarlo. Aún así, cree los API para hacer esto para usarlas luego en la tarea 3, donde aquí si se empieza a mencionar su uso junto con AJAX en JavaScript.

El otro problema fue las horas de inicio y término, ya que se pedía que se señalen en horas y minutos solamente (además del día, mes y año), por lo que, en el archivo db.py, cree dos métodos auxiliares a los que le añadí la decoración @property, que investigando, se usa para crear getter en clases con atributos privados, pero también se podía usar para tratar a métodos como atributos, de esta forma no era necesario poner al final "()" cada vez que los vaya a usar. Así, los métodos hora_inicio, y hora_termino, los podía llamar directamente como atributos en las demás partes del código en donde se requiera. 

Fuentes:
- https://www.freecodecamp.org/espanol/news/python-decorador-property/
- https://www-wscubetech-com.translate.goog/resources/python/property?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc&_x_tr_hist=true

### Formulario
Como en la sección anterior, también hice el mismo procedimiento para pasar las regiones y comunas para el prellenado que se realiza en el JS, sin embargo, puse la API correspondiente para en la tarea 3 usarla.

Tal vez no era necesario cargarlos desde la base de datos, pero me hizo más sentido debido a que ya las tenemos, además cualquier modificación que queramos hacerle a las opciones disponibles de regiones y comunas, solo tendríamos que modificar la base de datos, por lo que lo sentía más eficiente.