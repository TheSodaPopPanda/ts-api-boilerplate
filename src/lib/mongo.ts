const mongoose = require('mongoose')

export const mongoDb = mongoose.createConnection(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT || 27017 }`
  // 27017}/${process.env.MONGO_DB || "default"}`
);
