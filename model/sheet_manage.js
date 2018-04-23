let GoogleSpreadsheet = require('google-spreadsheet');
let async = require('async');

// spreadsheet key is the long id in the sheets URL
let doc = new GoogleSpreadsheet('1UA5H3zmHr8QF_LBLd2qlZg5lRs41Ha1Xl9eXgFAWjHA');
let order_status = { received_order: "รับออเดอร์", cooking: "กำลังปรุง", in_transit: "กำลังส่ง", delivered: "ส่งเสร็จแล้ว", cancel: "ยกเลิก" }
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
        for (let i = 0; i < cells.length; i += 2) {
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

  addBackOrder(menu, { customer_name, location, phone }) {
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
        for (let i = 0; i < cells.length; i += 7) {
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

  getOrderDetail(id) {
    return new Promise((resolve, reject) => {
      this.back_shop.getCells({
        'min-row': 3,
        'max-row': 52,
        'min-col': 1,
        'max-col': 8,
        'return-empty': true
      }, (err, cells) => {
        if (err) return reject(err);
        for (let i = 0; i < cells.length; i += 8) {
          if (cells[i].value == id) {
            i = parseInt(i);
            return resolve({
              id: id,
              order_detail: cells[i + 1].value,
              customer_name: cells[i + 3].value,
              pickup_location: cells[i + 4].value,
              phone: cells[i + 5].value,
              oreder_status: cells[i + 6].value,
              oredered_date: cells[i + 7].value,
            });
          }
        }
      })
    })
  }

  _updateOrderStatus(id, status) {
    this.back_shop.getCells({
      'min-row': 3,
      'max-row': 52,
      'min-col': 1,
      'max-col': 8,
      'return-empty': true
    }, (err, cells) => {
      if (err) return err;
      for (let i = 0; i < cells.length; i += 8) {
        if (cells[i].value == id) {
          cells[i + 6].value = status;
          this.back_shop.bulkUpdateCells(cells);
          return console.log(`Row ID [${id}] update status to ${status}.`);
        }
      }
    })
  }

  cookingOrder(id) {
    this._updateOrderStatus(id, order_status.cooking);
  }

  transitOrder(id) {
    this._updateOrderStatus(id, order_status.in_transit);
  }

  deliveredOrder(id) {
    this._updateOrderStatus(id, order_status.delivered);
  }

  cancelOrder(id) {
    this._updateOrderStatus(id, order_status.cancel);
  }
}

let sheet = new sheet_manage();
sheet.connect().then(() => {
  // sheet.addFrontTranscript("ทดสอบจาก API", 2).then(id=>console.log("Add at id : " + id))
  // sheet.addBackOrder("ทดสอบ order จาก api", { customer_name: "ยอสเอง", location: "หน้าตึก SIT", phone: "08ไม่บอกหรอก" }).then(id => console.log("Add at id : " + id));
  // sheet._updateOrderStatus(5, order_status.cooking);
  // sheet.getOrderDetail(2).then(result => console.log(result));

})
module.exports = sheet_manage;