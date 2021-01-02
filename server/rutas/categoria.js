const express = require("express");
let { verificaToken, verificaRole } = require("../middlewares/autenticacion");

let app = express();

let Categoria = require("../modelos/categoria");

//-------METODO GET-------------

app.get("/categoria", (req, res) => {
  Categoria.find({})
    .sort("nombre")
    .exec((err, categorias) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        categorias,
      });
    });
});

//----------METODO GET CON ID------------
app.get("/categoria/:id", function (req, res) {
  let id = req.params.id;
  Categoria.findById(id, (err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "La categoria no existe",
        },
      });
    }

    res.json({
      ok: true,
      categoria: categoriaDB,
    });
  });
});

//-----------------Método POST---------------------------------
app.post("/categoria",[verificaToken, verificaRole], (req, res) => {
  let body = req.body;

  let categoria = new Categoria({
    nombre: body.nombre,
  });

  categoria.save((err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      categoria: categoriaDB,
    });
  });
});
//===============================

//----------------Método PUT-----------------------
app.put("/categoria/:id", [verificaToken, verificaRole],(req, res) => {
  let id = req.params.id;
  let body = req.body;

  Categoria.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, categoriaDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!categoriaDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "El ID no existe",
          },
        });
      }
      res.json({
        ok: true,
        categoria: categoriaDB,
      });
    }
  );
});
//----------------------------

//-----------------------------Método Delete-------------------
app.delete("/categoria/:id",[verificaToken, verificaRole], (req, res) => {
  let id = req.params.id;

  let estadoActualizado = {
    estado: false,
  };

  Categoria.findByIdAndUpdate(
    id,
    estadoActualizado,
    { new: true },
    (err, categoriaBorrada) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      if (!categoriaBorrada) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "Categoria no encontrada",
          },
        });
      }
      res.json({
        ok: true,
        message: "Categoría Borrada",
      });
    }
  );
});

module.exports = app;
