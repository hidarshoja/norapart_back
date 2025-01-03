import express from 'express';
import {index, create, update, destroy} from "../controllers/question.controller.js";

const router = express.Router();

router.get('/', index)

router.post('/', create)

router.patch('/:id', update)

router.delete('/:id', destroy)


export default  router