const mssql = require("mssql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    user:'Admin',
    password:'12345',
    server : 'localhost',
    database : 'LibreriaDB',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}
let spawningPool = new mssql.ConnectionPool(config);
const conectDB= async () => {
    try {
        await spawningPool.connect();
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.warn('El gpt no me dijo eso')
    }
}
app.get('/api/libros', async (req, res) => {
    try {
        const result = await spawningPool.request().query('SELECT * FROM Libros');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los libros');
    }
});
app.post('/api/libros', async (req, res) => {
    const {titulo,autor,anio}=req.body;
    if(!titulo || !autor || !anio) {
        return res.status(400).send('Faltan datos');

    }
    try{
        await spawningPool.request()
        .input('titulo', mssql.VarChar, titulo)
        .input('autor', mssql.VarChar, autor)
        .input('anio', mssql.Int, anio)
        .query('INSERT INTO Libros (titulo, autor, anio) VALUES (@titulo, @autor, @anio)');
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Error al insertar el libro');
    }
});
app.put('/api/librios/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, anio } = req.body;
    if (!titulo || !autor || !anio) {
        return res.status(400).send('Faltan datos');
    }
    try {
        await spawningPool.request()
            .input('id', mssql.Int, id)
            .input('titulo', mssql.VarChar, titulo)
            .input('autor', mssql.VarChar, autor)
            .input('anio', mssql.Int, anio)
            .query('UPDATE Libros SET titulo=@titulo, autor=@autor, anio=@anio WHERE id=@id');
        res.send('Libro actualizado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el libro');
    }
});
app.delete('/api/libros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await spawningPool.request()
            .input('id', mssql.Int, id)
            .query('DELETE FROM Libros WHERE id=@id');
        res.send('Libro eliminado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el libro');
    }
});
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    conectDB();
});