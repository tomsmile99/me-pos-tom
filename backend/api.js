const express = require("express");
const { ModuleResolutionKind } = require("typescript");
const router = express.Router();
require("./db");

router.use(require("./api_auth"));
router.use(require("./api_product"));
router.use(require("./api_transaction"));

module.exports = router;
