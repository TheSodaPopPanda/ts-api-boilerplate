import express from 'express';
import cors from 'cors';

export const expressLoaders = (({ app }: { app: express.Application }) => {


  // healthcheck
  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');

  // middleware
  app.use(cors());
  app.use(express.json());


  return app;
})