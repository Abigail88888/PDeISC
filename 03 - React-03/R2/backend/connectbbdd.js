        import mysql from 'mysql2/promise'; // importa la funcion de mysql libreria, va
        export async function connectDB (){ // exporta la función para usarla desde otros archivos
            try{
                const connection = await mysql.createConnection({ // createConnection abre una conexión
                    host: 'localhost',
                    user: 'root', 
                    password: '',
                    database: 'tareas'
                })
                console.log('conexión establecida');
                return connection;
            }
            
            catch(err){
                console.log('Error de conexión', err);
            }
        }