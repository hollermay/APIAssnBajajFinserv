const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

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


require('dotenv').config();

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

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>BFHL API</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          h1 { color: #333; }
          pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>BFHL API Documentation</h1>
        <p>This API processes arrays of data and categorizes them.</p>
        
        <h2>Endpoint: POST /bfhl</h2>
        <p><strong>Request Format:</strong></p>
        <pre>
{
  "data": ["1", "2", "a", "b", "@"]
}
        </pre>
        
        <p><strong>Response Format:</strong></p>
        <pre>
{
  "is_success": true,
  "user_id": "${NAME}_${BIRTH_DATE}",
  "email": "${EMAIL_ID}",
  "roll_number": "${ROLL_NO}",
  "odd_numbers": ["1"],
  "even_numbers": ["2"],
  "alphabets": ["A", "B"],
  "special_characters": ["@"],
  "sum": "3",
  "concat_string": "Ba"
}
        </pre>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`API live on port ${PORT}`);
});
