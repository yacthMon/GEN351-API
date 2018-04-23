const express = require('express');
const router = express.Router();
const sheet = require("../model/sheet_manage")
let sheet_manage = new sheet();

sheet_manage.connect().then(() => {
  console.log("Connect sheet success.");
  console.log("API Ready on /api/");
}, err => console.error(err));

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
    res.json({ err:err });
  })
})

router.post('/order', (req, res) => {
  let data = {
    menu: req.body.menu,
    amount: req.body.amount,
    customer_name: req.body.customer_name,
    pickup_location: req.body.pickup_location,
    phone: req.body.phone
  };
  switch (undefined) {
    case data.menu:
      res.status(400)
      return res.json({ error: "menu is required." })
      break;
    case data.amount:
      res.status(400)
      return res.json({ error: "amount is required." })
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
  sheet_manage.addBackOrder(data.menu, data.amount, data).then(id => {
    res.status(201);
    return res.json({ msg: "Order created.", order_id: id });
  }, err =>{
    res.status(500);
    return res.json(err);
  })
})

router.post('/order/cooking', (req, res) => {
  let data = {
    id: req.body.id
  };
  switch (undefined) {
    case data.id:
      res.status(400)
      return res.json({ error: "id is required." })
      break;
  }
  sheet_manage.cookingOrder(data.id)
  res.status(200)
  return res.json({ msg: "Order status Cooking.", order_id: data.id });
})

router.post('/order/transit', (req, res) => {
  let data = {
    id: req.body.id
  };
  switch (undefined) {
    case data.id:
      res.status(400)
      return res.json({ error: "id is required." })
      break;
  }
  sheet_manage.transitOrder(data.id)
  res.status(200)
  return res.json({ msg: "Order status In-transit.", order_id: data.id });
})

router.post('/order/delivered', (req, res) => {
  let data = {
    id: req.body.id
  };
  switch (undefined) {
    case data.id:
      res.status(400)
      return res.json({ error: "id is required." })
      break;
  }
  sheet_manage.deliveredOrder(data.id)
  res.status(200)
  return res.json({ msg: "Order status Delivered.", order_id: data.id });
})

router.post('/order/cancel', (req, res) => {
  let data = {
    id: req.body.id
  };
  switch (undefined) {
    case data.id:
      res.status(400)
      return res.json({ error: "id is required." })
      break;
  }
  sheet_manage.cancelOrder(data.id)
  res.status(200)
  return res.json({ msg: "Order status Cancel.", order_id: data.id });
})

router.get('/order/received', (req, res) => {
  sheet_manage.getReceivedOrders().then(result => {
    res.status(200);
    return res.json({ status: 'OK', order: result });
  }, err => {
    res.status(500);
    res.json({ err });
  })
})

router.get('/order/cooking', (req, res) => {
  sheet_manage.getCookingOrders().then(result => {
    res.status(200);
    return res.json({ status: 'OK', order: result });
  }, err => {
    res.status(500);
    res.json({ err });
  })
})

router.get('/order/transit', (req, res) => {
  sheet_manage.getIransitOrders().then(result => {
    res.status(200);
    return res.json({ status: 'OK', order: result });
  }, err => {
    res.status(500);
    res.json({ err });
  })
})

router.get('/order/delivered', (req, res) => {
  sheet_manage.getDeliveredOrders().then(result => {
    res.status(200);
    return res.json({ status: 'OK', order: result });
  }, err => {
    res.status(500);
    res.json({ err });
  })
})

router.get('/order/cancel', (req, res) => {
  sheet_manage.getCancelOrders().then(result => {
    res.status(200);
    return res.json({ status: 'OK', order: result });
  }, err => {
    res.status(500);
    res.json({ err });
  })
})

router.get('/order/:orderId', (req, res) => {
  let data = {
    id: req.params.orderId
  };
  switch (undefined) {
    case data.id:
      res.status(400)
      return res.json({ error: "id is required." })
      break;
  }
  sheet_manage.getOrderDetail(data.id).then(result=>{
    res.status(200)
    return res.json({ status:"OK", order : result });
  })
})

module.exports = router