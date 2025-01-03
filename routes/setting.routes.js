import express from 'express'
import {createViews, getDailyIpCounts, getIncome} from '../controllers/setting.controller.js'
import {adminRoute, protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get('/views/statistic',protectRoute,adminRoute,getDailyIpCounts)
router.get('/income/statistic',protectRoute,adminRoute,getIncome)

router.post('/views',createViews)


export  default  router