import mongoose from 'mongoose';

// get the MONGO_URI and DB_NAME from the environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ionic-backend';
const DB_NAME = process.env.DB_NAME || 'ionic-backend';

// export a function that connects to the database
const connectDb = async () => {
  try{
    const connection = await mongoose.connect(MONGO_URI, {
    dbName: DB_NAME,
  })
  console.log('Database connected successfully', connection.connection.name)
  return connection;

  } catch (error) {
    console.log('Error connecting to the database', error)
  }
}

export default connectDb;