import { createConnection } from "mysql";
var connection = createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'hack',
});
// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

export default connection;
