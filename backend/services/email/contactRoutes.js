import express from "express";
import {
    sendContactEmail,
} from "./contact.js";

const router = express.Router();

router.post("/post", sendContactEmail);

export default router;