const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const publicKEY = fs.readFileSync(path.join(__dirname + "/public.key"), "utf8");
const privateKEY = fs.readFileSync(
  path.join(__dirname + "/private.key"),
  "utf8"
);

// http://travistidwell.com/jsencrypt/demo/
const i = "CodeMobiles Ltd"; // Issuer (Software organization who issues the token)
const s = "chaiyasit.t@gmail.com"; // Subject (intended user of the token)
const a = "http://codemobiles.com"; // Audience (Domain within which this token will live and function)

module.exports = {
  sign: (payload) => {
    // Token signing options
    const signOptions = {
      issuer: i,
      subject: s,
      audience: a,
      expiresIn: "30d", // 30 days validity อายุการใช้งาน token
      algorithm: "RS256",
    };

    // return jwt.sign(payload, 'god', signOptions);
    return jwt.sign(payload, privateKEY, signOptions);
  },
  verify: (req, res, next) => {
    // next()
    // return;

    const token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(403)
        .json({ result: "nok", message: "No token provided." });

    const verifyOptions = {
      issuer: i,
      subject: s,
      audience: a,
      expiresIn: "12h",
      algorithm: ["RS256"],
    };

    jwt.verify(token, publicKEY, verifyOptions, function(err, decoded) {
      console.log(JSON.stringify(decoded));
      if (err)
        return res
          .status(500)
          .json({ result: "nok", message: "Failed to authenticate token." });
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      req.userLevel = decoded.level;
      next();
    });
  },
};
