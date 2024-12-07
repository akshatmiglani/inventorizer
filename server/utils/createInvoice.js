const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function createInvoice(invoiceData, businessData, outputPath) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });

        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        generateHeader(doc, businessData);
        generateCustomerInfo(doc, invoiceData);
        generateInvoiceTable(doc, invoiceData);
        generateFooter(doc);

        doc.end();

        stream.on('finish', () => resolve(outputPath));
        stream.on('error', reject);
    });
}

function generateHeader(doc, business) {
    const normalizedPath = path.normalize(business.logo);
    const logoPath = path.resolve(__dirname, "../", normalizedPath);
    console.log("Resolved Logo Path:", logoPath);

    doc.image(logoPath, 50, 50, { width: 150 })
        .fillColor("black")
        .fontSize(20)
        .text(business.businessName, 200, 50, { align: "left" })
        .fontSize(10)
        .text(business.address, 200, 75, { align: "left" })
        .text(business.email, 200, 90, { align: "left" })
        .text(`GST: ${business.gstNumber}`, 200, 105, { align: "left" })
        .moveDown();
}

function generateCustomerInfo(doc, invoice) {
    const customerTop = 170;

    doc.fillColor("#000000").fontSize(20).text("Invoice", 50, customerTop - 30);
    doc.fontSize(10)
        .fillColor("#000000") 
        .text("Customer Name", 50, customerTop)
        .font("Helvetica-Bold")
        .text(invoice.customer.name, 150, customerTop)
        .font("Helvetica")
        .text("Email:", 50, customerTop + 15)
        .text(invoice.customer.email, 150, customerTop + 15)
        .text("Phone Number:", 50, customerTop + 30)
        .text(invoice.customer.phonenumber, 150, customerTop + 30)
        .moveDown();
}

function generateInvoiceTable(doc, invoice) {
    const tableTop = 250;

    
    doc.fontSize(12)
        .text("Item", 50, tableTop)
        .text("Quantity", 150, tableTop)
        .text("Price", 280, tableTop)
        .text("Total", 370, tableTop);

    doc.strokeColor('#000000').lineWidth(1).moveTo(50, tableTop + 20).lineTo(550, tableTop + 20).stroke(); // Line under header

    let position;
    
    for (let i = 0; i < invoice.products.length; i++) {
        position = tableTop + (i + 1) * 30;
        const item = invoice.products[i];

        
        const rowColor = i % 2 === 0 ? '#f9f9f9' : '#ffffff'; 

        doc.fillColor(rowColor)
            .rect(50, position, 500, 25)
            .fill();

        doc.fillColor('#000000')
            .text(item.name, 50, position + 5)
            .text(item.quantity, 150, position + 5)
            .text(item.price, 280, position + 5)
            .text(item.total, 370, position + 5);

        doc.strokeColor('#ddd').lineWidth(0.5).moveTo(50, position + 25).lineTo(550, position + 25).stroke(); // Row border
    }

    const subtotalY = position + 30;
    doc.fillColor('#000000').fontSize(12).text(`Total Amount: ₹${invoice.totalAmount}`, 370, subtotalY);
}

function generateFooter(doc) {
	doc.fontSize(
		10,
	).text(
		'Thanks for purchasing!',
		50,
		780,
		{ align: 'center', width: 500 },
	);
}

module.exports = { createInvoice };
