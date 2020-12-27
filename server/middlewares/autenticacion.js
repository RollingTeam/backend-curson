const jwt = require("jsonwebtoken");

let verificaToken = (req, res, next) => {
  // req.get indico que viene por el header
  let token = req.get("token");

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err:{
            message: "Token no valido"
        },
      });
    }
    req.usuario = decoded.usuario;
    //Pongo next para que siga la ejecucion luego de validar el token
    next();
  });
};

module.exports = {
  verificaToken,
};
