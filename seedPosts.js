import mongoose from "mongoose";
import PostModel from "./models/PostSchema.js";
import UserModel from "./models/UserSchema.js";
import { getNextSequence } from "./utils/generateSequence.js";

const titles = [
  "Getting Started with Node.js",
  "Understanding Express Middleware",
  "Mastering MongoDB",
  "JWT Authentication Explained",
  "Async Await in JavaScript",
  "Building REST APIs",
  "Mongoose Best Practices",
  "Error Handling Tips",
  "Frontend vs Backend",
  "Learning React",
  "CSS Tricks You Should Know",
  "TypeScript Basics",
  "Authentication vs Authorization",
  "Deploying to Render",
  "Docker for Beginners",
  "Git Best Practices",
  "Why Learn Backend?",
  "Working with APIs",
  "Database Indexing",
  "MongoDB Aggregation",
];

const bodies = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "This post discusses important concepts every developer should know.",
  "Practice consistently to become a better programmer.",
  "Express makes building APIs simple and efficient.",
  "MongoDB is a flexible NoSQL database for modern applications.",
  "Always validate incoming request data.",
  "JWT is commonly used for secure authentication.",
  "Clean code is easier to maintain and debug.",
  "Understanding async programming is essential in JavaScript.",
  "Learning by building projects is the fastest way to improve.",
];

async function seedPosts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const users = await UserModel.find();

    if (users.length === 0) {
      console.log("❌ No users found.");
      process.exit(0);
    }

    const createdPosts = [];

    for (let i = 0; i < 30; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const sequence = await getNextSequence("post");

      const post = await PostModel.create({
        id: `PST-${sequence.toString().padStart(6, "0")}`,
        userId: randomUser._id,
        title: titles[Math.floor(Math.random() * titles.length)],
        body: bodies[Math.floor(Math.random() * bodies.length)],
      });

      createdPosts.push(post);

      randomUser.posts.push(post._id);
      await randomUser.save();
    }

    console.log(`✅ Successfully seeded ${createdPosts.length} posts`);

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    await mongoose.disconnect();
  }
}

seedPosts();
