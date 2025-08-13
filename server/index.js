const express = require("express");
const cors = require("cors");
const blockchainRoutes = require("./routes/blockchainRoutes");
const mnemonicRoutes = require("./routes/mnemonicRoutes");
const { mnemonicMiddleware } = require("./middleware/mnemonicMiddleware");

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/mnemonics", mnemonicRoutes);
app.use(mnemonicMiddleware);
app.use("/api/blockchains", blockchainRoutes);

app.listen(PORT, () => {
    console.log(`server is running successfully on ${PORT}`);
});