const express = require("express"); // récup express
const app = express(); // var utilisant express
const mariaDB = require('mariadb');
require('dotenv').config();

const pool = mariaDB.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DTB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
});

app.get('/', async(req,res)=>{
    let conn;
    try{
        console.log("lancement de la connexion");
        conn = await pool.getConnection();
        console.log("lancement de la requete");
        const requete = await conn.query("SELECT * FROM user");
        console.log(requete);
        res.status(200).json(requete);
    }
    catch(err){
        console.log(err);
    }
})

app.post('/', async(req, res)=>{
    let conn;
    try{
        console.log("lancement de la connexion");
        conn = await pool.getConnection();
        console.log("lancement de la requete ajout");
        const requete = await conn.query("INSERT INTO user(nom, prenom, age, email) VALUES ('test', 'test', 27, 'test')");
        console.log(requete);
        res.status(200).json(requete);
    }
    catch(err){
        console.log(err);
    }
   
    
});

// lancement du serveur
app.listen(5000, ()=>{
    console.log("serveur fonctionnel");
})