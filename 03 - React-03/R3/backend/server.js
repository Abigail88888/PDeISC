import { main } from "./index.js";
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
    res.send("API funcionando, consulta /api/usuarios");
});

// API para traer todos los usuarios
app.get("/api/usuarios", async (req, res) => {
    try {
        const usuarios = await main();
        res.json(usuarios);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).json({ 
            error: "Error al obtener usuarios",
            success: false,
            message: "No se pudieron cargar los usuarios"
        });
    }
});

// Agregar usuario
app.post("/api/agregarusuarios", async (req, res) => {
    try {
        console.log('Datos recibidos para agregar:', req.body);
        const { Nombre, Apellido, Direccion, Telefono, Celular, FechaNacimiento, Email, Ocupacion } = req.body;
        
        // Validaciones básicas del servidor
        if (!Nombre || !Apellido || !Email) {
            console.log('Validación fallida: campos obligatorios faltantes');
            return res.status(400).json({
                success: false,
                message: "Los campos Nombre, Apellido y Email son obligatorios"
            });
        }

        // Validar email
        if (!Email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: "Email inválido"
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

        // Convertir fecha vacía a NULL para MySQL
        const fechaFinal = FechaNacimiento && FechaNacimiento.trim() !== '' ? FechaNacimiento : null;
        
        const query = `INSERT INTO usr (Nombre, Apellido, Direccion, Telefono, Celular, FechaNacimiento, Email, Ocupacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        console.log('Ejecutando query con datos:', [Nombre, Apellido, Direccion, Telefono, Celular, fechaFinal, Email, Ocupacion]);
        
        const [result] = await db.execute(query, [
            Nombre, 
            Apellido, 
            Direccion || null, 
            Telefono || null, 
            Celular || null, 
            fechaFinal, 
            Email, 
            Ocupacion || null
        ]);
        
        await db.end(); // Cerrar conexión
        
        console.log('Usuario agregado exitosamente, ID:', result.insertId);
        
        res.json({
            success: true,
            message: "Usuario agregado correctamente",
            id: result.insertId
        });
        
    } catch (err) {
        console.error('Error al agregar usuario:', err);
        res.status(500).json({
            success: false,
            message: "Error al agregar usuario",
            error: err.message
        });
    }
});

// Borrar usuario
app.delete("/api/borrarusuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Intentando eliminar usuario ID:', id);
        
        const db = await connectDB();
        if (!db) {
            return res.status(500).json({
                success: false,
                message: "Error de conexión a la base de datos"
            });
        }

        const [result] = await db.execute("DELETE FROM usr WHERE ID = ?", [id]);
        await db.end();
        
        console.log('Filas afectadas:', result.affectedRows);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }
        
        res.json({
            success: true,
            message: "Usuario eliminado correctamente"
        });
        
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).json({
            success: false,
            message: "Error al eliminar usuario",
            error: err.message
        });
    }
});

// Modificar usuario
app.put("/api/modificarusuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log('=== DATOS RECIBIDOS PARA MODIFICAR ===');
        console.log('ID:', id);
        console.log('Body completo:', req.body);
        console.log('=====================================');
        
        const { Nombre, Apellido, Direccion, Telefono, Celular, FechaNacimiento, Email, Ocupacion } = req.body;
        
        // Validaciones básicas del servidor
        if (!Nombre || !Apellido || !Email) {
            console.log('Validación fallida: campos obligatorios faltantes');
            return res.status(400).json({
                success: false,
                message: "Los campos Nombre, Apellido y Email son obligatorios"
            });
        }

        // Validar email
        if (!Email.includes('@')) {
            console.log('Validación fallida: email inválido');
            return res.status(400).json({
                success: false,
                message: "Email inválido"
            });
        }
        
        const db = await connectDB();
        if (!db) {
            console.log('Error: no se pudo conectar a la BD para modificar');
            return res.status(500).json({
                success: false,
                message: "Error de conexión a la base de datos"
            });
        }

        // Convertir fecha vacía a NULL para MySQL
        const fechaFinal = FechaNacimiento && FechaNacimiento.trim() !== '' ? FechaNacimiento : null;

        const query = `UPDATE usr SET Nombre = ?, Apellido = ?, Direccion = ?, Telefono = ?, Celular = ?, FechaNacimiento = ?, Email = ?, Ocupacion = ? WHERE ID = ?`;
        
        console.log('Ejecutando UPDATE con datos:', [Nombre, Apellido, Direccion || null, Telefono || null, Celular || null, fechaFinal, Email, Ocupacion || null, id]);
        
        const [result] = await db.execute(query, [
            Nombre, 
            Apellido, 
            Direccion || null, 
            Telefono || null, 
            Celular || null, 
            fechaFinal, 
            Email, 
            Ocupacion || null, 
            id
        ]);
        await db.end();
        
        console.log('Filas afectadas en actualización:', result.affectedRows);
        
        if (result.affectedRows === 0) {
            console.log('Error: Usuario no encontrado para ID:', id);
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }
        
        console.log('Usuario modificado exitosamente, ID:', id);
        res.json({
            success: true,
            message: "Usuario actualizado correctamente"
        });
        
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).json({
            success: false,
            message: "Error al actualizar usuario",
            error: err.message
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});