
//=================Puerto====================
process.env.PORT= process.env.PORT || 3005

//--------Definir entornos------------
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//---------Base de Datos---------------

let urlDB;

if(process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/curson'
}else{
    //"mongodb+srv://user:Curson_246@cluster0.4thox.mongodb.net/curson"
    urlDB= process.env.MONGO_URI
}

process.env.URLDB= urlDB

process.env.CADUCIDAD_TOKEN= "48h"

process.env.SEED= process.env.SEED || "este_es_el_semilla"

