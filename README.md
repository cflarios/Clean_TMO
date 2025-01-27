# Clean TMO

Este script de Tampermonkey está diseñado para evitar las redirecciones publicitarias en el sitio [zonatmo.com](https://zonatmo.com) cuando accedes a capítulos de manga. Extrae el `uniqid` de la página de manga y te redirige directamente al capítulo sin las interrupciones de publicidad, y maneja dinámicamente el contenido de la página.

### Características

- Evita la redirección a páginas de publicidad.
- Extrae automáticamente el `uniqid` necesario para acceder al capítulo.
- Maneja contenido dinámico al cargar los capítulos.
- Realiza una recarga de la página al finalizar la carga del capítulo para actualizar el contenido correctamente.

### Instalación

1. Instala la extensión **Tampermonkey** en tu navegador.  
   - [Tampermonkey para Chrome](https://tampermonkey.net/?ext=dhdg&browser=chrome)
   - [Tampermonkey para Firefox](https://tampermonkey.net/?ext=dhdg&browser=firefox)
   - [Tampermonkey para Edge](https://tampermonkey.net/?ext=dhdg&browser=edge)
   - [Tampermonkey para Opera](https://tampermonkey.net/?ext=dhdg&browser=opera)

2. Crea un nuevo script en Tampermonkey:
   - Haz clic en el ícono de Tampermonkey en la barra de herramientas de tu navegador.
   - Selecciona **"Agregar nuevo script..."**.
   - Elimina cualquier código que aparezca por defecto.
   - Pega el código del [script](https://github.com/cflarios/Clean_TMO/blob/main/clean_tmo.js) en el editor.

3. Guarda el script y asegúrate de que esté habilitado.

**NOTA**: Es NECESARIO que tu navegador tenga activado el 'Modo de desarrollador' de lo contrario Tampermonkey no funcionará. 

### Uso

Una vez instalado y habilitado el script, simplemente navega por [zonatmo.com](https://zonatmo.com) y el script manejará la redirección a los capítulos de manga, evitando la publicidad.

El script se activa automáticamente cuando detecta un enlace a un capítulo o cuando se navega a través de los enlaces dinámicos de la página.

### Funcionamiento

1. **Redirección**: Cuando haces clic en un enlace de capítulo, el script intercepta el enlace, obtiene el `uniqid` de la página de destino y te redirige a la URL del capítulo.
2. **Carga dinámica**: Si el contenido del capítulo no se carga inmediatamente, el script maneja la carga dinámica del contenido sin necesidad de recargar la página completa.
3. **Recarga final**: Después de que el contenido del capítulo se haya cargado, el script realiza un **reload** de la página para asegurarse de que todo se actualice correctamente.

### Personalización

Puedes modificar el script para que se adapte a tus necesidades, como cambiar la URL de la página de destino o ajustar los selectores utilizados para los botones de navegación.

### Contribuciones

Si deseas contribuir, por favor haz un fork del repositorio, realiza tus cambios y abre un pull request.

### Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Si tienes alguna pregunta o sugerencia, no dudes en abrir un **issue** en el repositorio.
