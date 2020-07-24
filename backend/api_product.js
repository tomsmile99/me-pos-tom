const express = require("express");
const { ModuleResolutionKind } = require("typescript");
const router = express.Router();
const Products = require("./models/product_schema");
const jwt = require("./jwt"); // การตรวจสอบการเข้าถึงข้อมูล เป็นขั้นตอนๆ
const formidable = require("formidable");
const fs = require("fs-extra"); // fs-extra คือการทำให้สามารถ move ไฟล์ข้าม folder ได้
// const intercepter1 = (req, res, next) => {
//   next();
// };

// const intercepter2 = (req, res, next) => {
//   if (req.query.token == "1234") {
//     next();
//   } else {
//     res.end("no authorized");
//   }
// };

const uploadImage = async (files, doc) => {
  if (files.image != null) {
    const fileExtention = files.image.name.split(".")[1]; // ตัดจุดออก
    doc.image = `${doc.product_id}.${fileExtention}`; // เปลี่ยนชื่อไฟล์
    const oldpath = files.image.path; // path เดิม
    const newpath = __dirname + "/uploaded/images/" + doc.image; // path ใหม่
    if (fs.exists(newpath)) {
      // ตรวจสอบว่าภาพนี้มีอยู่ใน path ใหม่หรือป่าว
      // ถ้ามีรูปเดิมอยู่แล้ว ให้ลบรูปเก่่่าและลงรูปใหม่แทน
      await fs.remove(newpath);
    }
    await fs.move(oldpath, newpath);
    await Products.findOneAndUpdate({ product_id: doc.product_id }, doc);
  }
};

router.get("/product", jwt.verify, async (req, res) => {
  const result = await Products.find({}).sort({ created: -1 });
  res.json(result);
});

router.post("/product", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    //res.json({ err, fields, files });
    const doc = await Products.create(fields);
    await uploadImage(files, doc);
    res.json({ result: "ok", message: doc });
  });
});

//แก้ไข
router.delete("/product/id/:id", jwt.verify, async (req, res) => {
  const doc = await Products.findOneAndDelete({ product_id: req.params.id });
  res.json({ result: "ok", message: doc });
});

router.get("/product/id/:id", jwt.verify, async (req, res) => {
  const doc = await Products.findOne({ product_id: req.params.id });
  res.json(doc);
});
router.put("/product", jwt.verify, async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    console.log(JSON.stringify({ err, fields, files }));

    await Products.findOneAndUpdate({ product_id: fields.product_id }, fields);
    await uploadImage(files, fields);
    res.json({ result: "ok", message: fields });
  });
});

// Get product by keyword
router.get("/product/name/:keyword", async (req, res) => {
  console.log("get products by keyword");
  try {
    const query = { name: new RegExp("^.*" + req.params.keyword + ".*$", "i") };
    const result = await Products.find(query);
    if (result) {
      res.json(result);
    } else {
      res.json([]);
    }
  } catch (error) {
    alert(JSON.stringify(error));
  }
});

module.exports = router;
