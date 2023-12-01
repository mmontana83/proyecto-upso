import fitz  # PyMuPDF

def completar_campos_pdf(input_pdf, output_pdf, campos):
    pdf_document = fitz.open(input_pdf)

    print(pdf_document.form_fields)
    page = pdf_document[0]
    if '/AcroForm' in page.get_text():
        for campo, valor in campos.items():
            page.update(form_fields={campo: valor})
        

    pdf_document.save(output_pdf)
    pdf_document.close()


if __name__ == "__main__":
    input_pdf = 'modelo-factura.pdf'
    output_pdf = 'output.pdf'
    
    campos_para_completar = {'cliente': 'Juan', 'CUIL': '23121231233', 'direccion': 'La Paz 234'}

    completar_campos_pdf(input_pdf, output_pdf, campos_para_completar)
