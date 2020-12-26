
//=================Puerto====================
process.env.PORT= process.env.PORT || 3005

//--------Definir entornos------------
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//---------Base de Datos---------------

let urlDB;

if(process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/curson'
}else{
    urlDB='Pegar la direccion de MongoAtlas'
}

process.env.URLDB= urlDB

