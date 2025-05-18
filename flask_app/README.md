# Decisiones sobre el código y otros comentarios
### Listado
Para esta parte, tomé varias decisiones que afectan a los archivos app.py, listado.js y db.py. Me encontré principalmente con dos problemas.

El primero fue cómo pasar las actividades obtenidas desde la base de datos al archivo listado.js. Como no se pueden pasar directamente objetos Python a JavaScript, usé el filtro |tojson en la plantilla para convertir las actividades a JSON.

Sin embargo, tuve algunos problemas con el formato, así que creé una función auxiliar en Python que convertía las actividades en una estructura más simple (como un diccionario o lista de diccionarios), más fácil de serializar y consumir desde JS. Luego, pasé ambas representaciones a render_template: una para uso en el HTML y otra que podía usar desde JavaScript.

Consideré usar fetch para obtener los datos mediante AJAX, pero como no se mencionaba en el enunciado, decidí evitarlo. También, pensé en incluir la variable directamente dentro de un <script></script> en el HTML, pero preferí no mezclar lógica dentro del template.

El otro problema fue las horas de inicio y término, ya que se pedía que se señalen en horas y minutos solamente (además del día, mes y año), por lo que, en el archivo db.py, cree dos métodos auxiliares a los que le añadí la decoración @property, que investigando, se usa para crear getter en clases con atributos privados, pero también se podía usar para tratar a métodos como atributos, de esta forma no era necesario poner al final "()" cada vez que los vaya a usar. Así, los métodos hora_inicio, y hora_termino, los podía llamar directamente como atributos en las demás partes del código en donde se requiera. 