import app from "../app"; // The express app we just created
//require("dotenv").config();

const port = parseInt(process.env.PORT, 10) || 8000;
app.listen(port, () => {
  console.log(`SMS API live on port ${port}`);
});
