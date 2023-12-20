import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// Ports
const PORT = process.env.PORT || 5000;

// Connections
connectToDatabase().then(() => {
  app.listen(PORT, () => console.log('Server running on port 5000'));
}).catch((error) => {
  console.log(error);
});

