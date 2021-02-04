const express = require("express");
const { verificaToken, verificaRole } = require("../middlewares/autenticacion");

const app = express();
let Solicitud = require("../modelos/solicitud");

//---Método GET

app.get("/solicitud",[verificaToken, verificaRole],(req, res) => {

  Solicitud.find({})
    .sort("nombre")
    .populate("categoria", "nombre") //traigo los datos segun id de categoria
    .exec((err, solicitudes) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      Solicitud.count((err, conteo) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          solicitudes,
          cantidad: conteo,
        });
      });
    });
});

app.get("/solicitud/:id", (req, res) => {
  let id = req.params.id;
  Solicitud.findById(id)
    .populate("curso", "nombre")
    .exec((err, solicitudDB) => {
      if (err) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "El Id no existe o es incorrecto",
          },
        });
      }
      res.json({
        ok: true,
        solicitud: solicitudDB,
      });
    });
});

//-------------POST Solicitud -----------------

app.post("/solicitud",[verificaToken],(req, res) => {
  let body = req.body;
  let solicitud = new Solicitud({
    nombre: body.nombre,
    descripcion: body.descripcion,
    cupo: body.cupo,
    duracion: body.duracion,
    nivel: body.nivel,
    contacto: body.contacto,
    categoria: body.categoria,
    img: body.img,
    autor: body.autor
  });

  solicitud.save((err, solicitudDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({
      ok: true,
      solicitud: solicitudDB,
    });
  });
});

//---------------PUT Solicitud ----------------------
app.put("/solicitud/:id",[verificaToken, verificaRole],(req, res) => {
  let id = req.params.id;
  let body = req.body;

  Solicitud.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, solicitudDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!solicitudDB) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "El id no existe",
          },
        });
      }

      res.json({
        ok: true,
        message: "Solicitud actualizada",
        solicitud: solicitudDB,
      });
    }
  );
});

//---------------DELETE Solicitud -------------------------
app.delete("/admin/solicitud/:id", [verificaToken, verificaRole], (req, res) => {
  let id = req.params.id;
  let estadoActualizado = {
    isActive: false 
  };

  Solicitud.findByIdAndUpdate(
    id,
    estadoActualizado,
    { new: true },
    (err, solicitudBorrada) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      if (!solicitudBorrada) {
        return res.status(404).json({
          ok: false,
          message: "Solicitud no encontrada",
        });
      }

      res.json({
        ok: true,
        solicitud: solicitudBorrada,
      });
    }
  );
});

module.exports = app;