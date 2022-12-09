import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  pdfClick(date, header, columns, body) {
    var doc = new jsPDF();
    var totalPagesExp = '{total_pages_count_string}';
    autoTable(doc, {
      columns: columns,
      body: body,
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        let base64Img = 'assets/logoD.png';
        if (base64Img) {
          doc.addImage(base64Img, 'JPEG', 15, 15, 15, 12);
        }
        doc.text(header, data.settings.margin.left + 22, 22);
        doc.setFontSize(11);
        doc.setTextColor('gray');
        doc.text(date[0], data.settings.margin.left + 22, 28);
        doc.text(date[1], 190, 28, { align: 'right' });
        // Footer
        var str = 'Page ' + doc.getNumberOfPages();
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp;
        }
        doc.setFontSize(10);
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
      margin: { top: 32 },
    });
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save('FirstPdf.pdf');
  }
}
