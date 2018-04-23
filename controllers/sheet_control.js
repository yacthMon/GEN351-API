const express = require('express');
const router = express.Router();
let sheet_manage = new require("../model/sheet_manage")();

!function(){
  sheet_manage.connect().then(()=>{
    console.log("Connect sheet success.");
    console.log("API Ready on /api/");
  })
}

router.get('/', (req, res) => {
  res.json({ msg: "Welcome to ครัวคุณย่า API" })
})

router.post('/front/add', (req, res) => {
  let data = { menu: req.body.menu, amount: req.body.amount };
  switch (undefined) {
    case data.menu:
      res.status(400)
      return res.json({ error: "menu is required." })
      break;
    case data.amount:
      res.status(400)
      return res.json({ error: "amount is required." })
      break;
  }
  sheet_manage.addFrontTranscript(data.menu, data.amount).then(id => {
    res.status(201)
    return res.json({ msg:"Transcript created.", transcript_id : id });
  })
})

module.exports = router