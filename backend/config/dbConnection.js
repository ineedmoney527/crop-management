import { createConnection } from "mysql";
var connection = createConnection({
  // host: "localhost",
  // user: "root",
  // database: "vhack",
  host: 'localhost',
  port: 3307, // Your MySQL port
  user: 'root',
  password: '',
  database: 'Gamification'
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
