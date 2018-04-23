let GoogleSpreadsheet = require('google-spreadsheet');
let async = require('async');

// spreadsheet key is the long id in the sheets URL
let doc = new GoogleSpreadsheet('1UA5H3zmHr8QF_LBLd2qlZg5lRs41Ha1Xl9eXgFAWjHA');
let front_shop;
let back_shop;

class sheet_manage {
  constructor() {
    this.creds = require('../google-generated-creds.json');
    this.front_shop;
    this.back_shop;
  }

  connect() {
    return new Promise((resolve, reject) => {
      doc.useServiceAccountAuth(this.creds, () => {
        doc.getInfo((err, info) => {
          if(err) return reject(err);
          console.log(`Loaded doc: ${info.title} by ${info.author.email}`);
          for (let sheet of info.worksheets) {
            console.log(`sheet : ${sheet.title} ${sheet.rowCount} x ${sheet.colCount}`);
          }
          this.front_shop = info.worksheets[0];
          this.back_shop = info.worksheets[1];
          resolve();
        });
      });
    })
  }

  addFrontTranscript(menu, amount) {
    return new Promise((resolve, reject) => {
      this.front_shop.getCells({
        'min-row': 3,
        'max-row': 52,
        'min-col': 2,
        'max-col': 3,
        'return-empty': true
      }, (err, cells) => {
        if (err) return reject(err);
        for (let i in cells) {
          if (cells[i].value == '') {
            cells[i].value = menu;
            cells[parseInt(i)+1].numericValue = amount;
            this.front_shop.bulkUpdateCells(cells);
            console.log(`[${i},${parseInt(i)+1}] Add transcript ${menu} with ${amount} ea.`);
            return resolve();
          }
        }
        return resolve(false);
      })
    })
  }
}

let sheet = new sheet_manage();
sheet.connect().then(()=>{
  sheet.addFrontTranscript("ทดสอบจาก API", 2)
})
module.exports = sheet_manage;