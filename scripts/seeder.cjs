require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User.cjs");
const bcrypt = require("bcryptjs");

async function seed() {
  await mongoose.connect(
    "mongodb+srv://sirazfe:kYyqi0P1AJNtv1lF@cluster0.nwdoaia.mongodb.net/help-desk-xpert?retryWrites=true&w=majority&appName=Cluster0"
  );
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await User.create({
    email: "contact@helpdeskxpert.com",
    password: hashedPassword,
    firstName: "Shezan",
    lastName: "Mahmud",
    phone: "+880640332419",
    isAdmin: true,
  });

  console.log("User created:", user);
  await mongoose.disconnect();
}

seed().catch(console.error);
