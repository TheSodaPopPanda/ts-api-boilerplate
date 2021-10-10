import { Router, Request, Response } from 'express';
import Joi from "joi"
import {loginUser, logoutUser, registerUser} from "../../controllers/auth"

// import * as _dayjs from 'dayjs'
// const dayjs = _dayjs.default
// console.log("test format")
// console.log(dayjs().format("YYYY-MM-DD hh:mm:ss"))
  
const loginValid = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).max(50).required(),
})
  
const logoutValid = Joi.object({
  session_token: Joi.string().required(),
})

const registerValid = Joi.object({
  username:  Joi.string().min(3).max(24).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).max(50).required(),
})

export const authRouter = () => {
  
  const router = Router()
  console.log("auth router")

  router.post('/login', (req: Request, res: Response)=>{
      loginValid.validateAsync(req.body)
      .then((data)=>{
        loginUser(data, req, res)
      })
      .catch((err:any)=>{
        res.status(400).send({error:err.details[0].message})
      })
  })
 
  router.post('/logout', (req: Request, res: Response)=>{
    logoutValid.validateAsync(req.body)
    .then((data)=>{
      logoutUser(data, req, res)
    })
    .catch((err:any)=>{
      res.status(400).send({error:err.details[0].message})
    })
  })

  router.post('/register', (req: Request, res: Response)=>{
    registerValid.validateAsync(req.body)
    .then((data)=>{
      registerUser(data, req, res)
    })
    .catch((err:any)=>{
      res.status(400).send({error:err.details[0].message})
    })
  })


  return router
};