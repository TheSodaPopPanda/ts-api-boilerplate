import express, { Request, Response } from 'express';
import dotenv from 'dotenv';


const PORT:Number = 8080 || Number(process.env.PORT)

async function startServer() {
  dotenv.config({path:__dirname+'/../.env'})

  const app = express();

  const expressLoaders = require("./lib/express").expressLoaders

  expressLoaders({app}) 

  console.log(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT || 27017}`)


  // v1 api router
  app.use("/api/v1/", require("./api/v1").default())

  app.use("*", (req: Request, res: Response) => {
    res.status(404).send("Error 404")
  })

  //  Start Server
  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}!`)
  });

  return app

}

startServer()

