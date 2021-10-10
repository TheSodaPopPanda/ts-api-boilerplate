import {Router} from 'express';
import {authRouter} from "./auth"

export default () => {
  const router = Router()

  router.use("/auth",authRouter())

  return router
}