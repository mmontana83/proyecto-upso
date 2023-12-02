// async function guardarFacturaPDF(){
// //     console.log("Hola")

// //     // Crear un nuevo documento PDF con jsPDF
// //   const pdfDoc = new window.jspdf.jsPDF();

// //   // Agregar una página al PDF
// //   pdfDoc.addPage();

// //   // Definir campos rellenables
// //   const camposRellenables = {
// //     nombre: 'John Doe',
// //     email: 'john.doe@example.com',
// //     fecha: '01/01/2023'
// //     // Puedes agregar más campos según tus necesidades
// //   };

// //   // Rellenar campos en el PDF
// //   Object.entries(camposRellenables).forEach(([campo, valor]) => {
// //     pdfDoc.text(20, getNextYPosition(), `${campo}: ${valor}`);
// //   });

// //   // Descargar el PDF
// //   pdfDoc.save('formulario.pdf');
// const pdfDoc = await PDFDocument.create()
// const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

// const page = pdfDoc.addPage()
// const { width, height } = page.getSize()
// const fontSize = 30
// page.drawText('Creating PDFs in JavaScript is awesome!', {
//   x: 50,
//   y: height - 4 * fontSize,
//   size: fontSize,
//   font: timesRomanFont,
//   color: rgb(0, 0.53, 0.71),
// })

// const pdfBytes = await pdfDoc.save()
//   Swal.fire({
//     icon: "success",
//     text: "Factura Impresa"
//   })
// }

// let yPosition = 20;
// function getNextYPosition() {
//   yPosition += 10;
//   return yPosition;
// }

