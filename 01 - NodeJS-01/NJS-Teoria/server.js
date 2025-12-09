    const  express = require ("express");
    const app = express();
    const path = require ("path");

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (req, res)=>{
        res.sendFile(path.join(__dirname, 'public', '/index.html'));
    });

    app.get('pagina1', (req, res)=>{
        res.sendFile(path.join(__dirname, 'public', '/pagina1.html'));
    });

    app.get('pagina2', (req, res)=>{
        res.sendFile(path.join(__dirname, 'public', '/pagina2.html'));
    });

    app.get('pagina3', (req, res)=>{
        res.sendFile(path.join(__dirname, 'public', '/pagina3.html'));
    });

    app.listen(3000, ()=>{
        console.log('http:// 117.0.0.1:3000');
    });