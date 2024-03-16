const express = require("express");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }
  jwt.verify(token, "Keyformysecrettoken", (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }
    if (decodedToken.role !== "teacher") {
      return res
        .status(403)
        .json({ error: "Forbidden - Access denied for non-teacher role" });
    }
    next();
  });
};

module.exports = {
  authentication,
};
