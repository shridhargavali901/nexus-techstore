import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOneAndUpdate(
      { email: "shridhargavali901@gmail.com" },
      { isAdmin: true },
      { new: true }
    );
    if (user) {
      console.log("SUCCESS: Shridhar is now an Admin! 👑");
    } else {
      console.log("ERROR: User not found.");
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

makeAdmin();
