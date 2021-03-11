const express = require('express');
const bcrypt = require('bcrypt');
const _= require('underscore');
const Usuario = require('../modelos/usuarios')
const {verificaToken, verificaRole} = require('../middlewares/autenticacion')

const app = express();


/*-----------------------
          GET
------------------------*/

app.get('/usuarios', (req, res) => {

    Usuario.find()
    .exec((err,usuarios) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        };

        Usuario.count({estado:true}, (err, conteo) => {

            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            
            res.json({
                ok: true,
                usuarios,
                cantidad: conteo
            })
        })
    });

});

//---------- Consulta por ID-----------//

app.get("/usuarios/:id", function (req, res) {
    let id = req.params.id;
    Usuario.findById(id, (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    });
  });

//---------- Consulta por Email-----------//

app.get("/usuario/:email", async function (req, res) {
    let email = req.params.email;
    Usuario.findOne({email: email}, (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    });
  });


/*-----------------------
          POST
------------------------*/

app.post('/usuarios', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        misFavoritos: body.misFavoritos
    })

    usuario.save((err, usuarioDB) => {
        if(err){
            res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            usuario: usuarioDB
        })
    });
});


/*-----------------------
          PUT
------------------------*/

app.put('/usuarios/:id', [verificaToken, verificaRole], (req,res) =>{

    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'apellido', 'img', 'role', 'estado', 'misFavoritos'])

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        
        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok:true,
            usuario: usuarioDB
        })
    })
})


/*-----------------------
          DELETE
------------------------*/

app.delete('/usuarios/:id', [verificaToken, verificaRole], (req, res) => {
    
    let id = req.params.id;

    let estadoActualizado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, estadoActualizado, {new: true}, (err, usuarioBorrado) => {
        
        if(err){
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!usuarioBorrado){
            res.status(400).json({
                ok: false,
                err: {
                  message: "Usuario no encontrado",
                },
             });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    });
});


module.exports = app;