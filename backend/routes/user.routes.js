import express from 'express';
import { protectRoute } from '../middleware/protectRoute';

const app = express.Router();

router.get("/",protectRoute,);