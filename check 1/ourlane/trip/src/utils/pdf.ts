const PDFDocument = require('pdfkit');
import * as moment from "moment";
const fs = require('fs');
const path = require('path');
const rightCheck = path.join(__dirname, '../../src/assets/images/rightCheck.png');
const ourlaneLogo = path.join(__dirname, '../../src/assets/images/Ourlane_logo.png');
import FileService from '../utils/file';

export default class pdfGeneration {
    
    static async customerInvoicePdf(details, fileName) {
        const tripDate = moment(details.tripDate).format('DD-MM-YYYY, h:mm:ss a')
        const pdfPath = path.join(__dirname, '../../pdfFile/');

        let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream(pdfPath + fileName));
        
        pdfDoc.image(ourlaneLogo,0,0,  {
            fit: [615, 150]
          })

        pdfDoc.moveDown();
        pdfDoc.moveDown();
        pdfDoc.moveDown();
        pdfDoc.moveDown();
        pdfDoc.moveDown();
        pdfDoc.moveDown();
        pdfDoc.moveDown();
       
        pdfDoc.fontSize(13);
        pdfDoc.font('Times-Roman').text("Dear  "+details.customer_details.fullName, {align: 'left'});

        pdfDoc.moveDown();

        pdfDoc.text("Thank you for choosing us! We hope you enjoyed your ride. Please find the below invoice for today's ride", {align: 'left'});

        pdfDoc.moveDown();

        pdfDoc
            .text("Trip Status ",{continued: true,align: 'left'})
            .image(rightCheck, 470, 236, {fit: [15, 15],continued: true})
            .text( "Completed",{align: 'right'} )
        

        pdfDoc.moveDown();

         pdfDoc
            .text("Trip ID ",{continued: true,align: 'left'})
            .text('#' + details.tripId,{align: 'right'});

        pdfDoc.moveDown();

        pdfDoc
            .text("Date & Time",{continued: true,align: 'left'}  )
             .text(tripDate, {align: 'right'});

        pdfDoc.moveDown();

        pdfDoc
            .text("From" ,{continued: true,align: 'left'})
            .text(details.startLocationName, { align: 'right' });

        pdfDoc.moveDown();
            
        pdfDoc
            .text("To" ,{continued: true,align: 'left'})
            .text(details.endLocationName, { align: 'right' });
        
        pdfDoc.moveDown();

        pdfDoc
        .text("Trip Fare",{continued: true,align: 'left'})
        .text('AED ' + details.paymentAmount, { align: 'right'});

        pdfDoc.moveDown();

        pdfDoc
            .text("Payment Method",{continued: true,align: 'left'})
            .text('Cash', { align: 'right'});

        pdfDoc.moveDown();

        pdfDoc
            .text("Vehicle Model",{continued: true,align: 'left'})
            .text(details.carModel, { align: 'right'});

        pdfDoc.moveDown();

        pdfDoc
            .text("Driver Name ",{continued: true,align: 'left'})
            .text(details.driver_details.fullName, { align: 'right'});
        
        pdfDoc.moveDown();

        pdfDoc.text("* All prices include statutory taxes, if applicable", {align: 'left'});

        pdfDoc.moveDown();
        pdfDoc.moveDown();

        pdfDoc.text("Best regards,", {align: 'left'});
        pdfDoc.text("Ourlane", {align: 'left',bold: true});

        pdfDoc.end();

        /* const customerFilePath = path.join(__dirname, '../../pdfFile/customerTripInvoice.pdf');
        const imageData = fs.readFileSync(customerFilePath);        
        const imageUrl = await FileService.uploadFiles(fileName, imageData); */
    }

    static async driverInvoicePdf(details, fileName) {
        const tripDate = moment(details.tripDate).format('DD-MM-YYYY, h:mm:ss a')

        const pdfPath = path.join(__dirname, '../../pdfFile/');

        let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream(pdfPath + fileName));
        
        pdfDoc.image(ourlaneLogo,0,0,  {
            fit: [615, 150]
          })

          pdfDoc.moveDown();
          pdfDoc.moveDown();
          pdfDoc.moveDown();
          pdfDoc.moveDown();
          pdfDoc.moveDown();
          pdfDoc.moveDown();
          pdfDoc.moveDown();

          pdfDoc.fontSize(13);

        pdfDoc.font('Times-Roman').text("Dear  "+details.driver_details.fullName, {align: 'left'});

        pdfDoc.moveDown();

        pdfDoc.text("We hope you enjoyed your trip with "+details.customer_details.fullName+ "Please find the below invoice", {align: 'left'});

        pdfDoc.moveDown();

        pdfDoc
            .text("Trip Status", { align: 'left',continued: true})
            .image(rightCheck, 467,222, {fit: [15, 15],align: 'center'})
            .text('Completed', { align: 'right'});

        pdfDoc.moveDown();

         pdfDoc
            .text("Trip ID", { align: 'left',continued: true})
            .text('#' + details.tripId, { align: 'right'});

        pdfDoc.moveDown();

        pdfDoc
            .text("Date & Time", { align: 'left',continued: true})
            .text(tripDate, { align: 'right'});

        pdfDoc.moveDown();

        pdfDoc
            .text('From', { align: 'left',continued: true})
            .text(details.startLocationName, { align: 'right' });

        pdfDoc.moveDown();
            if(details){
        pdfDoc
            .text('To', { align: 'left',continued: true})
            .text(details.endLocationName, { align: 'right' });
            }
        
        pdfDoc.moveDown();

        pdfDoc
        .text("Trip Fare", { align: 'left',continued: true})
        .text('AED ' + details.paymentAmount, { align: 'right'});

        pdfDoc.moveDown();

        pdfDoc
            .text("Payment Method", { align: 'left',continued: true})
            .text('Cash', { align: 'right'});

        pdfDoc.moveDown();

        pdfDoc
            .text("Vehicle Model", { align: 'left',continued: true})
            .text(details.carModel, { align: 'right'});

        pdfDoc.moveDown();

        pdfDoc
            .text("Customer Name", { align: 'left',continued: true})
            .text(details.customer_details.fullName, { align: 'right'});
        
        pdfDoc.moveDown();

        pdfDoc.text("* All prices include statutory taxes, if applicable", {align: 'left'});

        pdfDoc.moveDown();
        pdfDoc.moveDown();

        pdfDoc.text("Best regards,", {align: 'left'});
        pdfDoc.text("Ourlane", {align: 'left',bold: true});

        pdfDoc.end();
    }
}