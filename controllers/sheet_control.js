const express = require('express');
const router = express.Router();
let sheet_manage = require("../model/sheet_manage");

router.get('/', (req, res) => {
  // if (req.body.player_name) {
  //     stats.getPlayerStats(req.body.player_name).then(stats => {
  //         if (stats) {
  //             res.status(200);
  //             res.json({ status: true, stats });
  //         } else {
  //             res.status(404);
  //             res.json({ status: false, message : "Player not found." });
  //         }
  //     }, err => {
  //         res.status(500);
  //         res.json({ error: err });
  //     });
  // } else {
  //     res.status(400)
  //     return res.json({error:"You must provide player name."})
  // }
  res.json({msg:"Welcome to ครัวคุณย่า"})
})

module.exports = router