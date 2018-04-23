const express = require('express');
const router = express.Router();
let sheet_manage = new require("../model/sheet_manage")();

!function () {
  sheet_manage.connect().then(() => {
    console.log("Connect sheet success.");
    console.log("API Ready on /api/");
  }, err => console.error(err));
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
    return res.json({ msg: "Transcript created.", transcript_id: id });
  }, err => {
    res.status(500);
    res.json({ err });
  })
})

router.post('/back/order', (req, res) => {
  let data = {
    menu: req.body.menu,
    customer_name: req.body.customer_name,
    pickup_location: req.body.pickup_location,
    phone: req.body.phone
  };
  switch (undefined) {
    case data.menu:
      res.status(400)
      return res.json({ error: "menu is required." })
      break;
    case data.customer_name:
      res.status(400)
      return res.json({ error: "customer_name is required." })
      break;
    case data.pickup_location:
      res.status(400)
      return res.json({ error: "pickup_location is required." })
      break;
    case data.phone:
      res.status(400)
      return res.json({ error: "phone is required." })
      break;
  }
  sheet_manage.addBackOrder(data.menu, data).then(id => {
    res.status(201)
    return res.json({ msg: "Order created.", order_id: id });
  })
})

module.exports = router