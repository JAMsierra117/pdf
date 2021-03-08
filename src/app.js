const express = require("express");
const app = express();
const port = 4000;

//Routes
var alumnos = require("./routes/v1/alumnos");
app.use("/api/v1/alumnos", alumnos);

//Static
app.use(express.static('./src/public'))

app.listen(port, () => {
  console.log("Listen at port: " + port);
});
