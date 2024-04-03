import { app } from "./app.js";
import { connnectDB } from "./db/dbConnect.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello");
});
connnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`app is running at ${port}`);
    });
  })
  .catch((er) => {
    console.log(er);
  });
