import { Request, Response } from 'express';
import { mongoDb } from '../lib/mongo'; 
import { UserSchema, SessionSchema } from "../models/mongo/UserSchema"
import { hashSync, compareSync } from "bcryptjs"
import { logger } from '../logger';
import { v4 as uuidv4 } from "uuid"

import * as _dayjs from 'dayjs'
const dayjs = _dayjs.default

const users = mongoDb.model('Users', UserSchema);
const sessions = mongoDb.model('Sessions', SessionSchema);

interface ISession {
  session_token: string,
  user_uuid: string,
  last_active: string
}

interface IUser {
  _id: string;
  username: string,
  email: string; 
  password: string; 
}


const createSession = (userData:IUser, res:Response) => {
  const session_token = uuidv4()
  const newSession = new sessions({
    session_token,
    player_uuid: userData._id,
    last_active: dayjs().format("YYYY-MM-DD hh:mm:ss")
  })
  newSession.save()
  .then((sessionData:ISession)=>{
      res.status(200).send({
        session_token:sessionData.session_token,
        _uuid:sessionData.session_token,
      })
  })
  .catch((err:any)=>{
      res.status(400).send({error: "Unknown error occurred", debug:err.toString()})
  })
}


export const loginUser = (data:IUser, req: Request, res: Response) => {

  users.findOne({email: data.email})
  .then((result:IUser)=>{
    if(result){
      if(compareSync(data.password, result.password)){
        createSession(result,res)
      }else{
        res.status(400).send({error:"invalid password"})
      }
    }else{
      res.status(400).send({error:"couldn't find an account with that username"})
    }
  })  
  .catch((err:any)=>{
    res.status(500).send({error: "Unknown error occurred", debug:err.toString()})
  })

}


export const logoutUser = (data:{session_token: string}, req: Request, res: Response) => {

  sessions.findOneAndDelete({session_token:data.session_token})
  .then((result:ISession)=>{
      if(result){
        res.status(200).send({message:"session destroyed"})
      }else{
        res.status(400).send({error: "session not found"})
      }
  }) 
  .catch((err:any)=>{
    res.status(500).send({error: "Unknown error occurred", debug:err.toString()})
  })

}


export const registerUser = (data:IUser, req: Request, res: Response) => {

  users.findOne({email: data.email},(result:IUser)=>{
    if(result){
      res.status(400).send({error:"an account with that email already exists"})
    }else{
      const newUser = new users({
        username: data.username,
        email: data.email,
        password: hashSync(data.password, 10)
      })
      newUser.save()
      .then((result:IUser)=>{
        createSession(result,res)
      })
      .catch((err:any)=>{
          res.status(500).send({error: "Unknown error occurred", debug:err.toString()})
      })
    }
  })  
}