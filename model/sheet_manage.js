let GoogleSpreadsheet = require('google-spreadsheet');
let async = require('async');

// spreadsheet key is the long id in the sheets URL
let doc = new GoogleSpreadsheet('1UA5H3zmHr8QF_LBLd2qlZg5lRs41Ha1Xl9eXgFAWjHA');
let front_shop;
let back_shop;

async.series([
  function setAuth(step) {
    // see notes below for authentication instructions!
    let creds = require('../google-generated-creds.json');
    doc.useServiceAccountAuth(creds, step);
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function (err, info) {
      console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
      for (let sheet of info.worksheets) {
        console.log(`sheet : ${sheet.title} ${sheet.rowCount} x ${sheet.colCount}`);
      }
      front_shop = info.worksheets[0];
      back_shop = info.worksheets[1];
      step();
    });
  },
  // function workingWithRows(step) {
  //   // google provides some query options
  //   sheet.getRows({
  //     offset: 1,
  //     limit: 20,
  //     orderby: 'col2'
  //   }, function( err, rows ){
  //     console.log('Read '+rows.length+' rows');
  //     console.log(rows);

  //     // the row is an object with keys set by the column headers
  //     rows[0].colname = 'new val';
  //     rows[0].save(); // this is async

  //     // deleting a row
  //     rows[0].del();  // this is async

  //     step();
  //   });
  // },
  function workingWithCells(step) {
    front_shop.getCells({
      'min-row': 3,
      'max-row': 52,
      'min-col': 2,
      'max-col': 3,
      'return-empty': true
    }, function (err, cells) {
      // let cell = cells[0];
      // console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);

      // // cells have a value, numericValue, and formula
      // cell.value == '1'
      // cell.numericValue == 1;
      // cell.formula == '=ROW()';

      // // updating `value` is "smart" and generally handles things for you
      // cell.value = 123;
      // cell.value = '=A1+B2'
      // cell.save(); //async

      // bulk updates make it easy to update many cells at once
      // cells[0].value = 1;
      // cells[1].value = 2;
      // cells[2].formula = '=A1+B1';
      // sheet.bulkUpdateCells(cells); //async

      console.log(cells.length);
      cells[0].value = "ไก่สูตรดับเบิ้ลสมุนไพร";
      cells[1].numericValue = 2;
      
      // let i = 1
      // for (let cell of cells) {
      //   cell.value = i++;
      // }
      front_shop.bulkUpdateCells(cells); //async
      step();
    });
  }
], function (err) {
  if (err) {
    console.log('Error: ' + err);
  }
});