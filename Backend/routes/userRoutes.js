import express from 'express'
import { Display, Login, logout, register } from '../webapi/controllers/UserController.js'
import authenticate from '../webapi/controllers/authController.js'

// const router = express.Router();

const route = express.Router()
route.get('/Display', Display)
route.post('/register', register)
route.post('/Login', Login)
route.delete('/logout', authenticate, logout)

export default route