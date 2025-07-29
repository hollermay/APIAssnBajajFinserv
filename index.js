const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Helper methods
function isNumber(val) {
  return !isNaN(val);
}

function isLetter(val) {
  return /^[a-zA-Z]+$/.test(val);
}

function isSymbol(val) {
  return !isLetter(val) && !isNumber(val);
}

function isEvenDigit(n) {
  return parseInt(n) % 2 === 0;
}

function reverseWithAltCaps(letters) {
  const combined = letters.join("").split("").reverse();
  return combined.map((ch, i) =>
    i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
  ).join("");
}

// Identity Info
// Load environment variables from .env file
require('dotenv').config();

// Identity Info from environment variables
const NAME = process.env.NAME || "Udayan Sharma";
const BIRTH_DATE = process.env.BIRTH_DATE || "19052004";
const EMAIL_ID = process.env.EMAIL_ID || "udayan922.be22@chitkara.edu.in";
const ROLL_NO = process.env.ROLL_NO || "2210990922";

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Expected 'data' to be an array.",
      });
    }

    let evens = [];
    let odds = [];
    let letters = [];
    let symbols = [];
    let total = 0;

    data.forEach(item => {
      const entry = String(item).trim();

      if (isNumber(entry)) {
        isEvenDigit(entry) ? evens.push(entry) : odds.push(entry);
        total += parseInt(entry);
      } else if (isLetter(entry)) {
        letters.push(entry.toUpperCase());
      } else {
        symbols.push(entry);
      }
    });

    const reversedAltCaps = reverseWithAltCaps(letters.map(l => l.toLowerCase()));

    return res.status(200).json({
      is_success: true,
      user_id: `${NAME}_${BIRTH_DATE}`,
      email: EMAIL_ID,
      roll_number: ROLL_NO,
      odd_numbers: odds,
      even_numbers: evens,
      alphabets: letters,
      special_characters: symbols,
      sum: total.toString(),
      concat_string: reversedAltCaps,
    });
  } catch (error) {
    return res.status(500).json({ is_success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API live on port ${PORT}`);
});
