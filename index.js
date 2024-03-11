require("dotenv").config();
const database_connection = require("./src/db/connect_db");
const app = require("./app");
const PORT = process.env.PORT || 3000;

 database_connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`database connnection error ${err}`);
  });
