    import { createServer } from 'node:http';

     const server = createServer((req, res) => {
         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

            const suma = 5 + 3;
            const resta = 8 - 6;
            const multiplicacion = 3 * 11;
            const division = 30 / 5;

            const tabla = `
            <table border="1" cellspacing="0" cellpading="15" align= "center"
            style="margin-top: 100px; border-collapse: collapse; color: white; background-color: darkslategray; font-family: 'Courier New'; font-size= 40px; text-align: center; width: 60%;" >
                <tr>
                <th>Operación</th>
                <th>Resultado</th>
            </tr>
            <tr>
                <td>Suma (5 + 3)</td>
                <td>${suma}</td>
            </tr>
            <tr>
                <td>Resta (8 - 6)</td>
                <td>${resta}</td>
            </tr>
            <tr>
                <td>Multiplicación (3 * 11)</td>
                <td>${multiplicacion}</td>
            </tr>
            <tr>
                <td>División (30 / 5)</td>
                <td>${division}</td>
            </tr>
            </table>
        `;
         res.end(tabla);
    });

    server.listen(8086, '127.0.0.1', () => {
        console.log('Servidor iniciado en http://127.0.0.1:8086');
    });