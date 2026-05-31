const express = require("express");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("client/src")); //serves files

//Route prefixing
app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server spinning on http://localhost:${PORT}`);
});
