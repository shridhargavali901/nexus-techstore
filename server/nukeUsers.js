import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const nukeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const myEmail = "shridhargavali901@gmail.com";
    
    // Tumhare account ko chhod kar sabko uda do
    const result = await User.deleteMany({ email: { $ne: myEmail } });
    
    // Tumhare account ko permanently Admin fix kar do
    await User.findOneAndUpdate({ email: myEmail }, { isAdmin: true });
    
    console.log(`💥 NUKE SUCCESS: ${result.deletedCount} fake users deleted!`);
    console.log("👑 Only Shridhar is the Supreme Admin now.");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

nukeDatabase();
