import { connectDB } from './connectbbdd.js';

const main = async () => {
    let db;
    try {
        console.log('index.js: Iniciando conexión...');
        db = await connectDB();           // pide la conexión
        
        if (!db) {
            console.log('index.js: No se pudo conectar a la BD');
            return [];                    // si no hay conexión, devolvemos un array vacío
        }
        
        console.log('index.js: Ejecutando consulta SELECT * FROM usr');
        const [rows] = await db.execute("SELECT * FROM usr"); // ejecuta la query
        
        console.log('index.js: Consulta exitosa, registros encontrados:', rows.length);
        console.log('index.js: Primeros datos:', rows[0] || 'Sin datos');
        
        return rows;                      // rows = array de registros
        
    } catch (error) {
        console.error('index.js: Error en main():', error.message);
        console.error('index.js: Stack completo:', error.stack);
        return [];                        // En caso de error, devolver array vacío
    } finally {
        // Cerrar la conexión siempre, incluso si hay error
        if (db) {
            try {
                await db.end();
                console.log('index.js: Conexión cerrada correctamente');
            } catch (closeError) {
                console.error('index.js: Error al cerrar conexión:', closeError.message);
            }
        }
    }
}

export { main };                          // export para usarlo en server.js