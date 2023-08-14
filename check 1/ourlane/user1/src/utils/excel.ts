import * as Excel from 'exceljs';

export default class ExcelService {
  static createHeader(headerObj) {
    return {
      id: headerObj.field, width: headerObj.width || 30, header: headerObj.name, style: { alignment: { wrapText: true } }
    };
  }

  static createExcel(headers, result, metaData: {
    sheetName?: string
  }): Excel.Workbook {
    const finalHeader = headers.map((obj) => this.createHeader(obj));
    const workbook: Excel.Workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(metaData.sheetName || 'sheet');
    worksheet.columns = finalHeader;
    const headerCol = 65;
    headers.forEach((_header, i) => {
      const cell = worksheet.getCell(`${String.fromCharCode(headerCol + i)}1`);
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'cccccc' }
      };
      cell.font = {
        bold: true
      };
    });
    result.forEach((record) => {
      worksheet.addRow(Object.keys(record).map((k) => record[k]));
    });
    return workbook;
  }
}
