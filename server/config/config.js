//=========PUERTO============
process.env.PORT= 3005;

//========DEFINIR ENTORNO=========
process.env.NODE_ENV = 'dev';

//========DEFINIR BASE DE DATOS=========
let urlDB = 'mongodb://localhost:27017/curson'; 

process.env.URLDB = urlDB;

//========CADUCIDAD TOKEN=========
process.env.CADUCIDAD_TOKEN='48h';

//========SEED=========
process.env.SEED = 'este_es_el_seed';
