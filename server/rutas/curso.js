const express = require("express");
const { verificaToken, verificaRole } = require("../middlewares/autenticacion");

const app = express();
let Curso = require("../modelos/curso");

//---Método GET

app.get("/admin/curso", (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Curso.find({})
    .limit(limite) //limito registros a mostrar por página
    .skip(desde) //desde que registro comienzo a mostrar
    .sort("nombre") //ordeno la lista por nombre A-Z
    .populate("categoria", "nombre") //traigo los datos segun id de categoria
    .exec((err, cursos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      Curso.count({ estado: true }, (err, conteo) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          cursos,
          cantidad: conteo,
        });
      });
    });
});

app.get("/curso", (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Curso.find({estado:true})
    .limit(limite) //limito registros a mostrar por página
    .skip(desde) //desde que registro comienzo a mostrar
    .sort("nombre") //ordeno la lista por nombre A-Z
    .populate("categoria", "nombre") //traigo los datos segun id de categoria
    .exec((err, cursos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      Curso.count({ estado: true }, (err, conteo) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          cursos,
          cantidad: conteo,
        });
      });
    });
});

app.get("/curso/:id", (req, res) => {
  let id = req.params.id;
  Curso.findById(id)
    .populate("categoria", "nombre")
    .exec((err, cursoDB) => {
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
        curso: cursoDB,
      });
    });
});

//-------------POST curso -----------------

app.post("/curso",/* [verificaToken, verificaRole],*/ (req, res) => {
  let body = req.body;

  let curso = new Curso({
    nombre: body.nombre,
    descripcion: body.descripcion,
    cupo: body.cupo,
    duracion: body.duracion,
    nivel: body.nivel,
    contacto: body.contacto,
    categoria: body.categoria,
    img: body.img
  });

  curso.save((err, cursoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({
      ok: true,
      curso: cursoDB,
    });
  });
});

//---------------PUT Curso ----------------------
app.put("/curso/:id", /*[verificaToken, verificaRole],*/ (req, res) => {
  let id = req.params.id;

  let body = req.body;

  Curso.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, cursoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!cursoDB) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "El id no existe",
          },
        });
      }

      res.json({
        ok: true,
        message: "Curso actualizado",
        curso: cursoDB,
      });
    }
  );
});

//---------------DELETE Curso -------------------------
app.delete("/curso/:id", /*[verificaToken, verificaRole],*/ (req, res) => {
  let id = req.params.id;

  let estadoActualizado = {
    estado: false,
  };

  Curso.findByIdAndUpdate(
    id,
    estadoActualizado,
    { new: true },
    (err, cursoBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      if (!cursoBorrado) {
        return res.status(404).json({
          ok: false,
          message: "Curso no encontrado",
        });
      }

      res.json({
        ok: true,
        curso: cursoBorrado,
      });
    }
  );
});

module.exports = app;
