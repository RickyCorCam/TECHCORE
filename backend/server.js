const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});

app.get("/productos_hw", (req,res)=>{

    db.query(
        "SELECT * FROM productos_hw",
        (err,result)=>{

            if(err){
                res.status(500).json(err);
            }else{
                res.json(result);
            }
        }
    );
});

app.get("/productos_licencias", (req,res)=>{

    db.query(
        "SELECT * FROM productos_licencias",
        (err,result)=>{

            if(err){
                res.status(500).json(err);
            }else{
                res.json(result);
            }
        }
    );
});

app.get("/usuarios", (req,res) => {

    const sql = "SELECT * FROM usuarios";

    db.query(sql, (err,result) => {

        if(err){
            res.status(500).json(err);
        }else{
            res.json(result);
        }
    });
});

app.post("/ordenes",(req,res)=>{

    const {
        productos_comprados,
        total_compra
    } = req.body;

    db.query(
        `INSERT INTO ordenes
        (productos_comprados,total_compra)
        VALUES (?,?)`,
        [productos_comprados,total_compra],
        (err,result)=>{

            if(err){
                res.status(500).json(err);
            }else{
                res.json({
                    mensaje:"Orden guardada"
                });
            }
        }
    );
});

// =========================
// OBTENER ORDENES
// =========================

app.get("/ordenes", (req,res) => {

    const sql = "SELECT * FROM ordenes";

    db.query(sql, (err,result) => {

        if(err){

            res.status(500).json(err);

        }else{

            res.json(result);
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});