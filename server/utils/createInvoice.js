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

    const imageX=50;
    const imageY=50;
    const imageWidth=150;
    const imageRightMargin=20;

    const textStartX=imageX+imageWidth+imageRightMargin;
    const textStartY=imageY;

    doc.image(logoPath, imageX, imageY, { width: imageWidth })
        .fillColor("black")
        .fontSize(20)
        .text(business.businessName, textStartX,textStartY, { align: "left" })
        .fontSize(10)
        .text(business.address, textStartX,textStartY+25, { align: "left" })
        .text(business.email, textStartX,textStartY+40, { align: "left" })
        .text(`GST: ${business.gstNumber}`, textStartX,textStartY+55, { align: "left" })
    
    doc.moveDown(6);
}

function generateCustomerInfo(doc, invoice) {
    const customerTop = doc.y+40;

    doc.fillColor("#000000").fontSize(20).text("Invoice", 50, customerTop );
    doc.fontSize(10)
        .fillColor("#000000") 
        .text("Customer Name", 50, customerTop+30)
        .font("Helvetica-Bold")
        .text(invoice.customer.name, 150, customerTop+30)
        .font("Helvetica")
        .text("Email:", 50, customerTop + 45)
        .text(invoice.customer.email, 150, customerTop + 45)
        .text("Phone Number:", 50, customerTop + 60)
        .text(invoice.customer.phonenumber, 150, customerTop + 60)
        .moveDown();
    
    doc.moveDown();
}

function generateInvoiceTable(doc, invoice) {
    const tableTop = doc.y+30;
    const rowHeight = 30;

    const itemX=50;
    const qtyX=150;
    const priceX=280;
    const totalX=400;
    const tableWidth=500;

    
    doc.fontSize(12)
        .text("Item", 50, tableTop)
        .text("Quantity", 150, tableTop)
        .text("Price", 280, tableTop)
        .text("Total", 370, tableTop);

    doc.strokeColor('#000000').lineWidth(1).moveTo(itemX, tableTop + 20).lineTo(itemX+tableWidth, tableTop + 20).stroke(); 

    let position=tableTop+30;
    
    for (let i = 0; i < invoice.products.length; i++) {
        const item = invoice.products[i];

        if (position + rowHeight > 700) {
            doc.addPage();
            position = 50; 
            doc.fontSize(12).text("Item", itemX, position)
                .text("Quantity", qtyX, position)
                .text("Price", priceX, position)
                .text("Total", totalX, position);
            doc.moveTo(itemX, position + 20).lineTo(itemX+tableWidth, position + 20).stroke();
            position += 30;
        }
        const rowColor = i % 2 === 0 ? '#f9f9f9' : '#ffffff'; 

        doc.fillColor(rowColor)
            .rect(itemX, position, tableWidth, 25)
            .fill();

        doc.fillColor('#000000')
            .text(item.name, itemX, position + 5)
            .text(item.quantity, qtyX, position + 5)
            .text(`₹${item.price.toFixed(2)}`, priceX, position + 5)
            .text(`₹${item.total.toFixed(2)}`, totalX, position + 5);
        
        position +=rowHeight;
        doc.strokeColor('#ddd').lineWidth(0.5).moveTo(itemX, position -5).lineTo(itemX+tableWidth, position -5).stroke(); 
    }

     const summaryStartY = position + 30;

    doc.fontSize(12).fillColor("#000000");
    
    const labelX = 370;
    const amountX = 470;

    doc.font('Helvetica').text("Original Total:", labelX, summaryStartY, { width: 90, align: "right" }).text(`Rs.${invoice.totalAmount.toFixed(2)}`, amountX, summaryStartY, { width: 80, align: "right" });

    const discountY = summaryStartY + 20;
    doc.text("Discount:", labelX, discountY, { width: 90, align: "right" }).text(`-Rs.${invoice.discount.toFixed(2)}`, amountX, discountY, { width: 80, align: "right" });

    const finalTotalY = discountY + 20;
    doc.font('Helvetica-Bold').text("Final Total:", labelX, finalTotalY, { width: 90, align: "right" }).text(`Rs.${invoice.finalTotal.toFixed(2)}`, amountX, finalTotalY, { width: 80, align: "right" });
    
}

function generateFooter(doc) {
    doc.fontSize(10).fillColor("#000000").text("Thanks for purchasing!", 50, 750, { align: "center", width: 500 });
}

module.exports = { createInvoice };
