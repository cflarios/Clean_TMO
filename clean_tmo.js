// ==UserScript==
// @name         Clean TMO
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Evita redirecciones publicitarias extrayendo uniqid para acceder al capítulo y maneja contenido dinámico.
// @author       Cflarios
// @match        https://zonatmo.com/library/manga/*
// @match        https://zonatmo.com/library/manhwa/*
// @match        https://zonatmo.com/library/manhua/*
// @match        https://zonatmo.com/viewer/*
// @icon         https://www.google.com/s2/favicons?domain=zonatmo.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * Procesa y redirige al capítulo usando el UniqueId.
     * @param {string} chapterUrl URL original del capítulo.
     */
    function redirectToChapter(chapterUrl) {
        fetch(chapterUrl, {
            method: 'GET',
            credentials: 'include', // Para enviar cookies asociadas
        })
            .then((response) => response.text())
            .then((html) => {
                // Buscar el uniqid en la respuesta HTML
                const uniqidMatch = html.match(/uniqid:\s*['"]([^'"]+)['"]/);
                if (uniqidMatch) {
                    const uniqid = uniqidMatch[1]; // Captura el valor del uniqid
                    console.log('UniqueId encontrado:', uniqid);

                    // Crear la nueva URL con el uniqid
                    const newChapterUrl = `https://zonatmo.com/viewer/${uniqid}/cascade`;
                    console.log('Cargando capítulo desde:', newChapterUrl);

                    // Actualizar la URL del navegador sin recargar la página
                    history.pushState({}, '', newChapterUrl);

                    // Cargar el contenido del capítulo dinámicamente
                    fetch(newChapterUrl, {
                        method: 'GET',
                        credentials: 'include',
                    })
                        .then((response) => response.text())
                        .then((chapterHtml) => {
                            // Reemplazar el contenido de la página actual con el capítulo
                            document.open();
                            document.write(chapterHtml);
                            document.close();

                            // Recargar la página después de cargar el capítulo
                            window.location.reload();
                        })
                        .catch((err) => console.error('Error cargando el capítulo:', err));
                } else {
                    console.error('UniqueId no encontrado en la respuesta. Por favor, vuelve a intentarlo.');
                }
            })
            .catch((err) => console.error('Error al obtener el capítulo:', err));
    }

    /**
     * Observa cambios en el DOM para manejar navegaciones dinámicas.
     */
    function observeDynamicChanges() {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    const currentChapterLink = document.querySelector('a.next-chapter'); // Cambia esto según el selector real del botón "siguiente capítulo"
                    if (currentChapterLink) {
                        console.log('Navegación dinámica detectada. Procesando nuevo capítulo.');
                        redirectToChapter(currentChapterLink.href);
                    }
                }
            }
        });

        // Observa todo el cuerpo del documento
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
        });

        console.log('Observador de cambios en la página inicializado.');
    }

    /**
     * Inicializa el script interceptando enlaces y observando cambios dinámicos.
     */
    function initialize() {
        console.log('Script Tampermonkey inicializado.');

        // Interceptar clics en los enlaces de capítulos desde la lista
        document.addEventListener('click', function (e) {
            const target = e.target.closest('a');
            if (target && target.href.includes('/view_uploads/')) {
                e.preventDefault(); // Evitar redirección predeterminada
                redirectToChapter(target.href);
            }
        });

        // Activar el observador para navegaciones dinámicas
        observeDynamicChanges();
    }

    initialize();
})();
