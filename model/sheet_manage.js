let GoogleSpreadsheet = require('google-spreadsheet');
let async = require('async');

// spreadsheet key is the long id in the sheets URL
let doc = new GoogleSpreadsheet('1UA5H3zmHr8QF_LBLd2qlZg5lRs41Ha1Xl9eXgFAWjHA');
let order_status = { received_order: "รับออเดอร์", cooking: "กำลังปรุง", in_transit: "กำลังส่ง", delivered: "ส่งเสร็จแล้ว", cancel: "ยกเลิก" }
let order_column = { order_detail: 1, amount: 2, price: 3, customer_name: 4, pickup_location: 5, phone: 6, status: 7, date: 8 };
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

  addBackOrder(menu, amount, { customer_name, pickup_location, phone }) {
    return new Promise((resolve, reject) => {
      switch (undefined) {
        case customer_name:
          reject("Must provide customer_name");
          break;
        case pickup_location:
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
        'max-col': 9,
        'return-empty': true
      }, (err, cells) => {
        let column_length = 8
        if (err) return reject(err);
        for (let i = 0; i < cells.length; i += column_length) {
          if (cells[i].value == '') {
            i = parseInt(i);
            cells[i].value = menu;
            cells[i + (order_column.amount - 1)].numericValue = amount;
            cells[i + (order_column.customer_name - 1)].value = customer_name;
            cells[i + (order_column.pickup_location - 1)].value = pickup_location;
            cells[i + (order_column.phone - 1)].value = phone;
            cells[i + (order_column.status - 1)].value = "รับออเดอร์";
            cells[i + (order_column.date - 1)].value = new Date();
            this.back_shop.bulkUpdateCells(cells);
            console.log(`[${i},${i + 1}] Add back transcript ${menu} with 1 ea.`);
            return resolve((i / column_length) + 1);
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
        'max-col': 9,
        'return-empty': true
      }, (err, cells) => {
        if (err) return reject(err);
        let column_length = 9;
        for (let i = 0; i < cells.length; i += column_length) {
          if (cells[i].value == id) {
            i = parseInt(i);
            return resolve({
              id: id,
              order_detail: cells[i + order_column.order_detail].value,
              customer_name: cells[i + order_column.customer_name].value,
              pickup_location: cells[i + order_column.pickup_location].value,
              phone: cells[i + order_column.phone].value,
              oreder_status: cells[i + order_column.status].value,
              oredered_date: cells[i + order_column.date].value,
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
      'max-col': 9,
      'return-empty': true
    }, (err, cells) => {
      if (err) return err;
      let column_length = 9
      for (let i = 0; i < cells.length; i += column_length) {
        if (cells[i].value == id) {
          cells[i + 7].value = status;
          this.back_shop.bulkUpdateCells(cells);
          return console.log(`Row ID [${id}] update status to ${status}.`);
        }
      }
    })
  }

  _getOrderDetailByStatus(status) {
    return new Promise((resolve, reject) => {
      this.back_shop.getCells({
        'min-row': 3,
        'max-row': 52,
        'min-col': 1,
        'max-col': 9,
        'return-empty': true
      }, (err, cells) => {
        if (err) return reject(err);
        let column_length = 9
        let result = [];
        for (let i = 0; i < cells.length; i += column_length) {
          if (cells[i + order_column.status].value == status) {
            result.push({
              id: cells[i].value,
              order_detail: cells[i + order_column.order_detail].value,
              customer_name: cells[i + order_column.customer_name].value,
              pickup_location: cells[i + order_column.pickup_location].value,
              phone: cells[i + order_column.phone].value,
              oreder_status: cells[i + order_column.status].value,
              oredered_date: cells[i + order_column.date].value,
            })
          }
        }
        resolve(result);
      })
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

  getReceivedOrders() {
    return new Promise((resolve, reject) => {
      this._getOrderDetailByStatus(order_status.received_order).then(result => resolve(result), err => reject(err));
    })
  }

  getCookingOrders() {
    return new Promise((resolve, reject) => {
      this._getOrderDetailByStatus(order_status.cooking).then(result => resolve(result), err => reject(err));
    })
  }

  getIransitOrders() {
    return new Promise((resolve, reject) => {
      this._getOrderDetailByStatus(order_status.in_transit).then(result => resolve(result), err => reject(err));
    })
  }

  getDeliveredOrders() {
    return new Promise((resolve, reject) => {
      this._getOrderDetailByStatus(order_status.delivered).then(result => resolve(result), err => reject(err));
    })
  }

  getCancelOrders() {
    return new Promise((resolve, reject) => {
      this._getOrderDetailByStatus(order_status.cancel).then(result => resolve(result), err => reject(err));
    })
  }
}

// let sheet = new sheet_manage();
// sheet.connect().then(() => {
// 1  // sheet.addFrontTranscript("ทดสอบจาก API", 2).then(id=>console.log("Add at id : " + id))
// 1  // sheet.addBackOrder("ทดสอบ order จาก api", 3,{ customer_name: "ยอสเอง", location: "หน้าตึก SIT", phone: "08ไม่บอกหรอก" }).then(id => console.log("Add at id : " + id));
//   // sheet.cookingOrder(5);
//   // sheet.getOrderDetail(2).then(result => console.log(result));
//   // sheet.getCookingOrders().then(result => console.log(result))
//   // sheet.getReceivedOrders().then(result => console.log(result))
// })
module.exports = sheet_manage;