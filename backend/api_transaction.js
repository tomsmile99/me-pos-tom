const express = require("express");
const router = express.Router();
const Trans = require("./models/trans_schema");
const jwt = require("./jwt");
const moment = require("moment");

router.post("/transaction", jwt.verify, async (req, res) => {
  req.body.staff_id = req.userId;
  const doc = await Trans.create(req.body);
  res.json({ result: "ok", message: doc });
});

router.get("/transaction", async (req, res) => {
  const doc = await Trans.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "users",
        localField: "staff_id",
        foreignField: "_id",
        as: "staff",
      },
    },
    { $unwind: "$staff" },
    {
      $addFields: {
        staff_id: "$staff.username",
      },
    },
    {
      $project: {
        staff: 0,
      },
    },
  ]);
  res.json(doc);
});

router.get("/transaction/id/:id", (req, res) => {
  Trans.aggregate([
    { $match: { transaction_id: Number(req.params.id) } },
    {
      $lookup: {
        from: "users",
        localField: "staff_id",
        foreignField: "_id",
        as: "staff_id",
      },
    },
    { $project: { "staff_id.password": 0 } },
    { $unwind: "$staff_id" },
  ]).then((transaction) => {
    const resObj = transaction.map((value) => {
      value.staff_id = value.staff_id.username;
      return value;
    });
    res.json(resObj[0]);
  });
});

router.get("/transaction/between/:startDate/:endDate", (req, res) => {
  // var date = new Date("2019-03-17")
  console.log(JSON.stringify(req.params));
  const startDate = new Date(req.params.startDate);
  const endDate = new Date(req.params.endDate);

  Trans.aggregate([
    {
      $match: {
        timestamp: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "staff_id",
        foreignField: "_id",
        as: "staff_id",
      },
    },
    {
      $project: {
        "staff_id.password": 0,
      },
    },
    { $unwind: "$staff_id" },
  ])
    .sort({ timestamp: -1 })
    .then((transaction) => {
      const resObj = transaction.map((value) => {
        value.staff_id = value.staff_id.username;
        return value;
      });
      // console.log(resObj)
      res.json(resObj);
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
});

convertToSumHours = (hourSale, res) => {
  const helper = {};

  // Group timestamp into every hours
  const result = hourSale.reduce(function(r, original) {
    const key = original.time;
    if (!helper[key]) {
      helper[key] = Object.assign({}, original); // create a copy of o
      r.push(helper[key]);
    } else {
      helper[key].sum += original.sum;
    }
    return r;
  }, []);

  const finalResponse = [
    { time: 0, sum: 0 },
    { time: 1, sum: 0 },
    { time: 2, sum: 0 },
    { time: 3, sum: 0 },
    { time: 4, sum: 0 },
    { time: 5, sum: 0 },
    { time: 6, sum: 0 },
    { time: 7, sum: 0 },
    { time: 8, sum: 0 },
    { time: 9, sum: 0 },
    { time: 10, sum: 0 },
    { time: 11, sum: 0 },
    { time: 12, sum: 0 },
    { time: 13, sum: 0 },
    { time: 14, sum: 0 },
    { time: 15, sum: 0 },
    { time: 16, sum: 0 },
    { time: 17, sum: 0 },
    { time: 18, sum: 0 },
    { time: 19, sum: 0 },
    { time: 20, sum: 0 },
    { time: 21, sum: 0 },
    { time: 22, sum: 0 },
    { time: 23, sum: 0 },
  ].map((item) => {
    let newObj = item.sum;
    result.forEach((availableItem) => {
      if (availableItem.time == item.time) {
        newObj = availableItem.sum;
        return false;
      }
    });
    return newObj;
  });

  res.json(finalResponse);
};

router.get("/transaction/report/:date", async (req, res) => {
  console.log("Input: " + req.params.date);
  const date = new Date(req.params.date);
  console.log("Format Date: " + date);
  try {
    const response = await Trans.find({
      timestamp: {
        $gte: moment(date)
          .startOf("day")
          .toDate(),
        $lt: moment(date)
          .endOf("day")
          .toDate(),
      },
    });
    const hourSale = response.map((result) => {
      return { time: result.timestamp.getHours(), sum: result.total };
    });

    convertToSumHours(hourSale, res);
  } catch (e) {
    res.json(e.message);
  }
});

module.exports = router;
