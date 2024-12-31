import express from 'express'
import {index} from '../controllers/province.controller.js'

const router = express.Router()

router.get('/',index)



export  default  router