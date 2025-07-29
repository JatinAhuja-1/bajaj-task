const express = require("express");
const app = express();


app.use(express.json());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input: 'data' must be an array",
    });
  }

  const numbers = [];
  const alphabets = [];
  const special_characters = [];
  let allAlphaChars = "";

  data.forEach((item) => {
    if (/^-?\d+$/.test(item)) {
      numbers.push(item.toString());
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
      allAlphaChars += item;
    } else {
      const alphaOnly = (item.match(/[a-zA-Z]/g) || []).join("");
      if (alphaOnly.length > 0) {
        allAlphaChars += alphaOnly;
      }
      special_characters.push(item);
    }
  });

  const even_numbers = [];
  const odd_numbers = [];
  let sum = 0;

  numbers.forEach((numStr) => {
    const num = parseInt(numStr, 10);
    if (num % 2 === 0) {
      even_numbers.push(numStr);
    } else {
      odd_numbers.push(numStr);
    }
    sum += num;
  });

  let reversed = allAlphaChars.split("").reverse();
  let concat_string = "";
  reversed.forEach((char, idx) => {
    concat_string += idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
  });

  res.status(200).json({
    is_success: true,
    user_id: "jatin_ahuja_17112004",
    email: "jatin1706.be22@chitkara.edu.in",
    roll_number: "2210991706",
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: sum.toString(),
    concat_string,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
