        import path from "path";
        import express from 'express';
        import { fileURLToPath } from "url";
        import cors from "cors";
        import { connectDB } from './connectbbdd.js';

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const app = express();

        // Middlewares
        app.use(cors());
        app.use(express.json()); // Para parsear JSON en requests POST/PUT
        app.use(express.static(path.join(__dirname, "public")));

        // Ruta raíz
        app.get("/", (req, res) => {
            res.send("API de Tareas funcionando! Endpoints disponibles: /api/tareas, /api/tareas/:id, POST /api/tareas, PUT /api/tareas/:id, DELETE /api/tareas/:id");
        });

        // API para obtener todas las tareas
        app.get("/api/tareas", async (req, res) => {
            try {
                console.log('Obteniendo todas las tareas...');
                const db = await connectDB();
                if (!db) {
                    console.log('Error: no se pudo conectar a la BD');
                    return res.status(500).json({ 
                        error: "Error de conexión a la base de datos",
                        success: false
                    });
                }

                const [rows] = await db.execute("SELECT * FROM tareas ORDER BY created_at DESC");
                await db.end();
                
                console.log('Tareas obtenidas:', rows.length);
                res.json(rows);
            } catch (err) {
                console.error('Error al obtener tareas:', err);
                res.status(500).json({ 
                    error: "Error al obtener tareas",
                    success: false,
                    message: err.message
                });
            }
        });

        // API para obtener una tarea específica
        app.get("/api/tareas/:id", async (req, res) => {
            try {
                const { id } = req.params;
                console.log('Obteniendo tarea ID:', id);
                
                const db = await connectDB();
                if (!db) {
                    return res.status(500).json({
                        success: false,
                        message: "Error de conexión a la base de datos"
                    });
                }

                const [rows] = await db.execute("SELECT * FROM tareas WHERE id = ?", [id]);
                await db.end();
                
                if (rows.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "Tarea no encontrada"
                    });
                }
                
                console.log('Tarea encontrada:', rows[0].titulo);
                res.json(rows[0]);
            } catch (err) {
                console.error('Error al obtener tarea:', err);
                res.status(500).json({
                    success: false,
                    message: "Error al obtener tarea",
                    error: err.message
                });
            }
        });

        // API para crear una nueva tarea
        app.post("/api/tareas", async (req, res) => {
            try {
                console.log('Datos recibidos para crear tarea:', req.body);
                const { titulo, descripcion, prioridad = false } = req.body;
                
                // Validaciones básicas
                if (!titulo || titulo.trim().length < 3) {
                    console.log('Validación fallida: título inválido');
                    return res.status(400).json({
                        success: false,
                        message: "El título debe tener al menos 3 caracteres"
                    });
                }

                if (!descripcion || descripcion.trim().length < 5) {
                    console.log('Validación fallida: descripción inválida');
                    return res.status(400).json({
                        success: false,
                        message: "La descripción debe tener al menos 5 caracteres"
                    });
                }

                // Validar que el título no sea solo números
                if (/^\d+$/.test(titulo.trim())) {
                    return res.status(400).json({
                        success: false,
                        message: "El título no puede ser solo números"
                    });
                }

                const db = await connectDB();
                if (!db) {
                    console.log('Error: no se pudo conectar a la BD');
                    return res.status(500).json({
                        success: false,
                        message: "Error de conexión a la base de datos"
                    });
                }

                const fechaCreacion = new Date().toLocaleString();
                const query = `INSERT INTO tareas (titulo, descripcion, fecha, completa, prioridad, fechaTerminada) VALUES (?, ?, ?, ?, ?, ?)`;
                
                console.log('Ejecutando query para crear tarea...');
                const [result] = await db.execute(query, [
                    titulo.trim(), 
                    descripcion.trim(), 
                    fechaCreacion,
                    false,
                    prioridad,
                    null
                ]);
                
                await db.end();
                
                console.log('Tarea creada exitosamente, ID:', result.insertId);
                
                res.status(201).json({
                    success: true,
                    message: "Tarea creada correctamente",
                    id: result.insertId,
                    tarea: {
                        id: result.insertId,
                        titulo: titulo.trim(),
                        descripcion: descripcion.trim(),
                        fecha: fechaCreacion,
                        completa: false,
                        prioridad: prioridad,
                        fechaTerminada: null
                    }
                });
                
            } catch (err) {
                console.error('Error al crear tarea:', err);
                res.status(500).json({
                    success: false,
                    message: "Error al crear tarea",
                    error: err.message
                });
            }
        });

        // API para actualizar una tarea (marcar como completa/incompleta)
        app.put("/api/tareas/:id", async (req, res) => {
            try {
                const { id } = req.params;
                const { completa, titulo, descripcion, prioridad } = req.body;
                
                console.log('Actualizando tarea ID:', id, 'Datos:', req.body);
                
                const db = await connectDB();
                if (!db) {
                    return res.status(500).json({
                        success: false,
                        message: "Error de conexión a la base de datos"
                    });
                }

                let query;
                let params;

                // Si se está actualizando el estado completa/incompleta
                if (typeof completa !== 'undefined') {
                    const fechaTerminada = completa ? new Date().toLocaleString() : null;
                    query = `UPDATE tareas SET completa = ?, fechaTerminada = ? WHERE id = ?`;
                    params = [completa, fechaTerminada, id];
                }
                // Si se está actualizando la prioridad
                else if (typeof prioridad !== 'undefined') {
                    query = `UPDATE tareas SET prioridad = ? WHERE id = ?`;
                    params = [prioridad, id];
                }
                // Si se está actualizando título y descripción (edición completa)
                else if (titulo && descripcion) {
                    // Validaciones
                    if (titulo.trim().length < 3) {
                        await db.end();
                        return res.status(400).json({
                            success: false,
                            message: "El título debe tener al menos 3 caracteres"
                        });
                    }
                    if (descripcion.trim().length < 5) {
                        await db.end();
                        return res.status(400).json({
                            success: false,
                            message: "La descripción debe tener al menos 5 caracteres"
                        });
                    }
                    if (/^\d+$/.test(titulo.trim())) {
                        await db.end();
                        return res.status(400).json({
                            success: false,
                            message: "El título no puede ser solo números"
                        });
                    }

                    query = `UPDATE tareas SET titulo = ?, descripcion = ? WHERE id = ?`;
                    params = [titulo.trim(), descripcion.trim(), id];
                } 
                else {
                    await db.end();
                    return res.status(400).json({
                        success: false,
                        message: "Datos insuficientes para actualizar"
                    });
                }
                
                console.log('Ejecutando query de actualización...');
                const [result] = await db.execute(query, params);
                await db.end();
                
                console.log('Filas afectadas:', result.affectedRows);
                
                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "Tarea no encontrada"
                    });
                }
                
                console.log('Tarea actualizada exitosamente');
                res.json({
                    success: true,
                    message: "Tarea actualizada correctamente"
                });
                
            } catch (err) {
                console.error('Error al actualizar tarea:', err);
                res.status(500).json({
                    success: false,
                    message: "Error al actualizar tarea",
                    error: err.message
                });
            }
        });

        // API para eliminar una tarea
        app.delete("/api/tareas/:id", async (req, res) => {
            try {
                const { id } = req.params;
                console.log('Intentando eliminar tarea ID:', id);
                
                const db = await connectDB();
                if (!db) {
                    return res.status(500).json({
                        success: false,
                        message: "Error de conexión a la base de datos"
                    });
                }

                // Primero verificar si la tarea existe y está completa
                const [rows] = await db.execute("SELECT completa FROM tareas WHERE id = ?", [id]);
                
                if (rows.length === 0) {
                    await db.end();
                    return res.status(404).json({
                        success: false,
                        message: "Tarea no encontrada"
                    });
                }

                // Verificar si la tarea está completa (regla de negocio del frontend)
                if (!rows[0].completa) {
                    await db.end();
                    return res.status(400).json({
                        success: false,
                        message: "Solo puedes borrar tareas que estén completadas"
                    });
                }

                const [result] = await db.execute("DELETE FROM tareas WHERE id = ?", [id]);
                await db.end();
                
                console.log('Tarea eliminada, filas afectadas:', result.affectedRows);
                
                res.json({
                    success: true,
                    message: "Tarea eliminada correctamente"
                });
                
            } catch (err) {
                console.error('Error al eliminar tarea:', err);
                res.status(500).json({
                    success: false,
                    message: "Error al eliminar tarea",
                    error: err.message
                });
            }
        });

        app.listen(3000, () => {
            console.log("Servidor de tareas corriendo en http://localhost:3000");
            console.log("Endpoints disponibles:");
            console.log("GET /api/tareas - Obtener todas las tareas");
            console.log("GET /api/tareas/:id - Obtener una tarea específica");
            console.log("POST /api/tareas - Crear nueva tarea");
            console.log("PUT /api/tareas/:id - Actualizar tarea");
            console.log("DELETE /api/tareas/:id - Eliminar tarea");
        });