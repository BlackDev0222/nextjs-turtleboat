import mongoose from "mongoose";

const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectdb = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB...");
    return mongoose.connection.db;
  }

  return mongoose.connect(process.env.MONGODB_URL ?? "", options);
};

connectdb()
  .then(() => {
    console.log("Successfully connected to MongoDB...");
  })
  .catch((err) => console.log(err));

  export default connectdb;
