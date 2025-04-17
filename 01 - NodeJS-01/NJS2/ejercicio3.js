    //Importamos el módulo 'url'
    var url = require('url');

    //URL de ejemplo usando localhost
    var adr = 'http://localhost:8080/app/inicio.html?user=abi&modo=dev';
    var q = url.parse(adr, true);

    // Muestro partes específicas de la URL
    console.log('host:', q.host);           // Sale el host (8080)
    console.log('pathname:', q.pathname);   // Sale /app/inicio.html
    console.log('search:', q.search);       // ?user=abi&modo=dev__

    // Acceder a parámetros individuales
    var qdata = q.query;
    console.log('user:', qdata.user);       // abi
    console.log('modo:', qdata.modo);       // dev