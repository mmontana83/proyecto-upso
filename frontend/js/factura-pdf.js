const { PDFDocument, rgb, StandardFonts} = require('pdf-lib');

async function imprimirFacturaPDF(){

    //Obtengo la factura
    const factura = JSON.parse(sessionStorage.getItem('factura'));

    // Especifica la ruta al archivo PDF dentro de la carpeta "res"
    const formUrl = `./res/modelo-factura-${sessionStorage.getItem('id_usuario')}.pdf`;
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    
    // Crea un nuevo documento PDF basado en el PDF existente
    const pdfDoc = await PDFLib.PDFDocument.load(formPdfBytes);
    
    const form = pdfDoc.getForm();

    
    //cargo el encabezado
    form.getTextField('nroFactura').setText('Nro Factura - ' + String(factura.encabezado.nroFactura));
    form.getTextField('fechaFactura').setText(String(factura.encabezado.fecha));
    form.getTextField('tipoComprobante').setText(factura.encabezado.tipoFactura);
    form.getTextField('cliente').setText(factura.encabezado.razonSocial.toUpperCase());
    form.getTextField('CUIL').setText(factura.encabezado.id_cliente);
    form.getTextField('direccion').setText(factura.encabezado.direccion.toUpperCase());
    form.getTextField('condicionIVA').setText(factura.encabezado.condicionIVA.toUpperCase());
    form.getTextField('tipoPago').setText(factura.encabezado.condicionVenta.toUpperCase());
    form.getTextField('precioTotal8').setText('$ ' + String(factura.encabezado.total));
    form.getTextField('precioTotal9').setText('$ ' + String(factura.encabezado.total));
    
    //cargo el detalle - por el momento limitado a 9
    for (let i=0; i<factura.detalle.length; i++){
        form.getTextField(`producto${i}`).setText(factura.detalle[i].producto.toUpperCase());
        form.getTextField(`cantidad${i}`).setText(String(factura.detalle[i].cantidad));
        form.getTextField(`precioUnitario${i}`).setText(String(factura.detalle[i].precio));
        form.getTextField(`precioTotal${i}`).setText(String(factura.detalle[i].precioTotal));
    }

    const pdfBytes = await pdfDoc.save();
    
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
};

module.exports = {imprimirFacturaPDF};

