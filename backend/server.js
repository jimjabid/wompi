import express from "express";


import paymentRoutes from "./routes/paymentRoutes.js";
import cors from "cors";


const app = express();


const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json()); // Parse JSON bodies

// Use payment routes
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
