const PDFDocument = require("pdfkit");
const fs = require("fs");
const data = require("../mocks/alumnosdata");
const { v4: uuidv4 } = require("uuid");

const generar = () => {
  console.log("*****GENERANDO*****");

  var columns = [
    {
      header: "ORDEN",
      key: "orden",
      alignHeader: "center",
      align: "center",
      width: 0.2,
    },
    {
      key: "nombre",
      header: "NOMBRE ALUMNO",
      alignHeader: "center",
      align: "left",
      width: 0.6,
    },
    {
      key: "promedio",
      header: "PROMEDIO",
      alignHeader: "center",
      align: "center",
      width: 0.2,
    },
  ];

  const doc = new PDFDocument();
  const uid = uuidv4() + ".pdf";
  const path = "./src/public/tmp/" + uid;
  doc.pipe(fs.createWriteStream(path));

  var startX = doc.page.margins.left;
  var startY = doc.y;
  var usableWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;

  //draw header
  doc
    .moveTo(startX, startY)
    .lineTo(startX + usableWidth, startY)
    .lineWidth(30)
    .fillAndStroke("#7fd344");
  let deltaWith = startX;
  columns.forEach((column) => {
    doc
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(column.header, deltaWith, startY, {
        width: usableWidth * column.width - 15,
        align: column.alignHeader,
      });

    deltaWith += usableWidth * column.width;
  });


  //draw data
  var rowBottomY = startY + 30;
  data.forEach((alumno) => {
    let deltaWith = startX;
    columns.forEach((column) => {
      doc
        .font("Helvetica")
        .fillColor("black")
        .text(alumno[column.key], deltaWith, rowBottomY, {
          width: usableWidth * column.width - 15,
          align: column.align,
        });
      deltaWith += usableWidth * column.width;
    });
    rowBottomY += 30;
    //draw bottom line
    doc
      .moveTo(startX, rowBottomY - 10)
      .lineTo(startX + usableWidth, rowBottomY - 10)
      .lineWidth(0.5)
      .fillAndStroke("#7fd344");
  });

  //draw vertical lines
  deltaWith = startX;
  columns.forEach((column, index) => {
    doc
      .moveTo(deltaWith, startY - 15)
      .lineTo(deltaWith, rowBottomY - 10)
      .lineWidth(0.5)
      .fillAndStroke("#7fd344");
    deltaWith += usableWidth * column.width - (index == 0 ? 15 : 0);
  });

  //draw the last vertical line
  doc
    .moveTo(startX + usableWidth, startY - 15)
    .lineTo(startX + usableWidth, rowBottomY - 10)
    .lineWidth(0.5)
    .fillAndStroke("#7fd344");

  doc.end();

  return uid;
};

module.exports = generar;
