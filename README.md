# Decisiones sobre el código y otros comentarios
## Listado
Para esta parte, tomé varias decisiones que afectan a los archivos app.py, listado.js y db.py.

Al final, use promesas AJAX, en particular usé fetch, para poder pasar las actividades al listado en formato JSON con ayuda de una función auxiliar en utils.py, donde la función me formateaba las actividades obtenidas de la base de datos en un formato compatible para jsonify y que así con fetch lo pueda convertir en un JSON. En otras partes del código hice algo similar a esto para poder obtener directamente los datos desde la base de datos.

El otro problema fue las horas de inicio y término, ya que se pedía que se señalen en horas y minutos solamente (además del día, mes y año), por lo que, en el archivo db.py, cree dos métodos auxiliares a los que le añadí la decoración @property, que investigando, se usa para crear getter en clases con atributos privados, pero también se podía usar para tratar a métodos como atributos, de esta forma no era necesario poner al final "()" cada vez que los vaya a usar. Así, los métodos hora_inicio, y hora_termino, los podía llamar directamente como atributos en las demás partes del código en donde se requiera en formato str. 

Fuentes:
- https://www.freecodecamp.org/espanol/news/python-decorador-property/
- https://www-wscubetech-com.translate.goog/resources/python/property?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc&_x_tr_hist=true

## Formulario
Como en la sección anterior, también hice el mismo procedimiento para pasar las regiones y comunas para el pre llenado que se realiza en el JS.

Tal vez no era necesario cargarlos desde la base de datos, pero me hizo más sentido debido a que ya las tenemos, además cualquier modificación que queramos hacerle a las opciones disponibles de regiones y comunas, solo tendríamos que modificar la base de datos, por lo que lo sentía más eficiente.

Además, debo agregar que cuando el formulario falla al enviarse desde el servidor, se recarga toda la página, lo que implica que se tendrían que ingresar los datos de nuevo. Esto lo hago así por simplicidad y porque en ningún momento se nos indica si tenemos que volver a mostrar el formulario con los datos o no, aunque con el formulario de comentarios sí dejo los datos intactos, ya que se nos dice explícitamente que lo mostremos así.

## Estadísticas
Nuevamente, hice lo mismo que en las secciones anteriores de usar una API y fetch para obtener datos asíncronos de la base de datos, en este caso, para algunos datos que se requerían para hacer los gráficos.
También, a pesar de que en un inicio no usé las librerías que nos recomendaron (estaba ocupando Chart.js), la terminé cambiando. Al principio, solo quería probar como se vería con la librería Highcharts, pero cómo me terminó gustando cómo quedó al final, lo terminé dejando así, además que se me redujo bastante el código (aunque creo que es más por cómo había hecho la implementación con Chart.js). Estaba dispuesto a documentar cómo era Chart.js, ya que técnicamente no lo habían pasado en clases como tal, pero ahora cómo lo cambié, ya no es necesario.

## app.py
En este apartado, puse todas las rutas necesarias, separando las API's de las rutas que conducen directamente a algún template. Además, cree funciones auxiliares que guardé en utils.py que me servían para convertir en diccionarios datos más grandes provenientes de la base de datos, para pasarlos a JS con jsonify, de este modo el código quedaba más limpio.

## db.py
Para la database no hay mucho que comentar, salvo que importé de la librería pytz, el método timezone para poder definir como predeterminado la hora actual en Santiago/Chile para la tabla de comentarios.
De esta forma, apenas se agrega un comentario a la database, le agrega la fecha actual en Chile, ya que asumo que las actividades serán enfocadas a esta zona local al final.

## SpringBoot y Flask
Decidí dejar el uso de ambos frameworks en la carpeta del proyecto, de manera que se pueda acceder a lo previamente realizado en Flask, y las nuevas funcionalidades exclusivamente en SpringBoot.
Además, agrego que solo recreé lo necesario en SpringBoot y un poco más de las otras funcionalidades anteriores, pero no más. Me dediqué exclusivamente a la implementación de lo pedido.