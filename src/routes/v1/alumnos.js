var express = require("express");
var router = express.Router();
var ordenSeleccion = require("../../pdfs/ordenSeleccion");

router.get("/", (req, res) => {
  const path = req.hostname + ":4000/tmp/" + ordenSeleccion();

  res.json({
    url: path,
    error: 0,
  });
});

module.exports = router;
