const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db  = require("../database");

const signupPage = async (req, res) => {
  //console.log("SignupPage")
  res.sendFile("signup.html", { root: "public/views" });
};

const loginPage = async (req, res) => {
  //console.log("loginPage")
  res.sendFile("login.html", { root: "public/views" });
};

const homePage = async (req, res) => {
    res.sendFile("home.html", { root: "public/views" });
};
  

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      //console.log(err)
      await User.add({ name, email, password: hash });
      res.status(200).json({ message: "Signup successful" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      
      const querySnapshot = await db.collection('Users').where('email', '==', email).get();
      if (querySnapshot.empty) {
        res.status(401).json({ message: 'No user found with email: ', email });
        return;
      }
      const userDoc = querySnapshot.docs[0].data();
      const hashedPassword = userDoc.password; 
      
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }  
        if (result) {
          const userData = { id: userDoc.id, ...userDoc };
          const token = generateAccessToken(userData.id, userData.name, userData.email , role);
          res.status(200).json({ message: 'Successful login', token });
        } else {
          res.status(401).json({ message: 'Invalid password' });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  function generateAccessToken(id,name,email , role){ 
    return jwt.sign({userId: id , name:name, email:email , role:role },"Keyformysecrettoken")
  }

module.exports = {
  signupPage,
  loginPage,
  signup,
  login,
  homePage
};
