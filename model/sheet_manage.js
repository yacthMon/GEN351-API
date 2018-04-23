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
          if (err) return reject(err);
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
        for (let i = 0 ; i < cells.length ; i+=2) {
          if (cells[i].value == '') {
            i = parseInt(i);
            cells[i].value = menu;
            cells[i + 1].numericValue = amount;
            this.front_shop.bulkUpdateCells(cells);
            console.log(`[${i},${i + 1}] Add front transcript ${menu} with ${amount} ea.`);
            return resolve((i / 2) + 1);
          }
        }
        return resolve(false);
      })
    })
  }

  addBackTranscript(menu, { customer_name, location, phone }) {
    return new Promise((resolve, reject) => {
      switch (undefined) {
        case customer_name:
          reject("Must provide customer_name");
          break;
        case location:
          reject("Must provide location");
          break;
        case phone:
          reject("Must provide phone");
          break;
      }
      this.back_shop.getCells({
        'min-row': 3,
        'max-row': 52,
        'min-col': 2,
        'max-col': 8,
        'return-empty': true
      }, (err, cells) => {
        if (err) return reject(err);
        for(let i = 0 ; i < cells.length ; i+=7){
          if (cells[i].value == '') {
            i = parseInt(i);
            cells[i].value = menu;
            cells[i + 1].numericValue = 30;
            cells[i + 2].value = customer_name;
            cells[i + 3].value = location;
            cells[i + 4].value = phone;
            cells[i + 5].value = "รับออเดอร์";
            cells[i + 6].value = new Date();
            this.back_shop.bulkUpdateCells(cells);
            console.log(`[${i},${i + 1}] Add back transcript ${menu} with 1 ea.`);
            return resolve((i / 7) + 1);
          }
        }
      })
    })
  }
  
  _updateOrderStatus(){

  }
}

let sheet = new sheet_manage();
sheet.connect().then(() => {
  // sheet.addFrontTranscript("ทดสอบจาก API", 2).then(id=>console.log("Add at id : " + id))
  sheet.addBackTranscript("ทดสอบ order จาก api", { customer_name: "ยอสเอง", location: "หน้าตึก SIT", phone: "08ไม่บอกหรอก" }).then(id => console.log("Add at id : " + id));
})
module.exports = sheet_manage;