import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import referralRoutes from "./src/routes/referralRoutes.js"; // Ensure correct path

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(
    cors({
      origin: ["http://localhost:3000/*","https://accredian-fe.vercel.app/*"], // Allow only your frontend
      methods: "GET,POST,PUT,DELETE",
      credentials: true, // Allow cookies if needed
    })
  );
app.use(express.json());

// Routes
app.use("/api/referrals", referralRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



