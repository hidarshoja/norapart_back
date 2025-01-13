import express from 'express'
import {
    createViews,
    getAllOptions,
    getDailyIpCounts,
    getIncome,
    updateOptions,
    getByKey
} from '../controllers/setting.controller.js'
import {adminRoute, protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get('/views/statistic',protectRoute,adminRoute,getDailyIpCounts)
router.get('/income/statistic',protectRoute,adminRoute,getIncome)
router.get('/about-us',getAllOptions)
router.get('/about-us/key/:key',getByKey)

router.post('/views',createViews)

router.patch('/about-us/update',updateOptions)

export  default  router