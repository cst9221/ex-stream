const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidV4 } = require("uuid");

router.get("/", (req, res) => {
  res.redirect(`/room/${uuidV4()}`);
});

router.get("/:room", (req, res) => {
  console.log(req.params);
  res.render("room", { roomId: req.params.room });
});


module.exports = router;

// https://imkh.dev/5-nodejs-video-streaming-server/
// https://sukth09.tistory.com/42
