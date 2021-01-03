const express = require("express");
let { verificaToken , verificaRole } = require("../middlewares/autenticacion");

let app = express();

let Review = require("../modelos/review");

//-------METODO GET-------------

app.get("/review", (req, res) => {
  Review.find({})
    .sort("created_at")
    .exec((err, reviews) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        reviews,
      });
    });
});

//-----------------Método POST---------------------------------
app.post("/review",[verificaToken], (req, res) => {
  let body = req.body;

  let review = new Review({
    user: body.user,
    curso: body.curso,
    comentario: body.comentario,
    calificacion: body.calificacion,
    img: body.img,
  });

  review.save((err, reviewDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!reviewDB) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      review: reviewDB,
    });
  });
});
//===============================

//-----------------------------Método Delete-------------------
app.delete("/review/:id",[verificaToken, verificaRole], (req, res) => {
  let id = req.params.id;

  let estadoActualizado = {
    estado: false,
  };

  Review.findByIdAndUpdate(
    id,
    estadoActualizado,
    { new: true },
    (err, reviewBorrada) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      if (!reviewBorrada) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "Review no encontrada",
          },
        });
      }
      res.json({
        ok: true,
        message: "Review Borrada",
      });
    }
  );
});

module.exports = app;