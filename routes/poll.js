const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Pusher = require("pusher");
const Vote = require("../models/Vote");

const pusher = new Pusher({
  appId: "1087050",
  key: "1b5daaf68a30f8fc41dd",
  secret: "84f54b612beeb0618908",
  cluster: "ap2",
  useTLS: true,
});

router.get("/", (req, res) => {
  Vote.find().then((votes) => {
    return res.status(200).send({ success: true, votes: votes });
  });
});

router.post("/", (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1,
  };
  new Vote(newVote).save().then((vote) => {
    pusher.trigger("os-poll", "os-vote", {
      points: parseInt(vote.points),
      os: vote.os,
    });
  });
  return res.send({ success: true, message: "Thank you for voting" });
});

module.exports = router;
