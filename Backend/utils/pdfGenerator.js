const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

const generatePDF = async (studentData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(12);
  page.setFillColor(rgb(0, 0, 0));

  let yPosition = 350;
  for (const [key, value] of Object.entries(studentData)) {
    const text = `${key}: ${value}`;
    page.drawText(text, { x: 50, y: yPosition });
    yPosition -= 20;
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};

module.exports = { generatePDF };
