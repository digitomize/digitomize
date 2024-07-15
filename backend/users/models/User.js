import mongoose from "mongoose";
import { ROLE } from "../../core/const.js";

const stringToggleSchema = new mongoose.Schema({
  data: String,
  showOnWebsite: Boolean,
});

const numberToggleSchema = new mongoose.Schema({
  data: Number,
  showOnWebsite: Boolean,
});

const contestToggleSchema = new mongoose.Schema({
  username: String,
  rating: Number,
  badge: String,
  fetchTime: Number,
  attendedContestsCount: Number,
  showOnWebsite: Boolean,
  totalQuestions: Number,
  easyQuestions:Number,
  mediumQuestions:Number,
  hardQuestions: Number,
});

const communitySchema = new mongoose.Schema({
  communityId: {
    type: String,
    required: [true, "Community Id is required."],
  },
});

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: [true, "uid is required."],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    role: {
      type: Number,
      required: [true, "role is required"],
      default: ROLE.USER,
    },
    name: {
      type: String,
      // required: [true, "First name is required."]
    },
    picture: {
      type: String,
    },
    resume: {
      type: String,
    },
    email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      // required: [true, "Email is required."]
      unique: { value: true, caseInsensitive: true },
      lowercase: true,
    },
    email_show: {
      type: Boolean,
      default: true,
    },
    preferences: {
      contest_notifs: {
        codechef: { type: Boolean, default: false },
        leetcode: { type: Boolean, default: false },
        codeforces: { type: Boolean, default: false },
        atcoder: { type: Boolean, default: false },
        codingninjas: { type: Boolean, default: false },
        geeksforgeeks: { type: Boolean, default: false },
      },
    },
    bio: {
      type: stringToggleSchema,
      default: { data: null, showOnWebsite: false },
    },
    dateOfBirth: {
      type: stringToggleSchema,
      default: { data: null, showOnWebsite: true },
    },
    phoneNumber: {
      type: stringToggleSchema,
      default: { data: null, showOnWebsite: true },
    },
    solved: [
      {
        type: Number,
      },
    ],
    bookmark: [
      {
        type: Number,
      },
    ],
    skills: [
      {
        type: String,
        default: [],
      },
    ],
    education: [
      {
        institute: {
          type: String,
          default: null,
        },
        degree: {
          type: String,
          default: null,
        },
        year: {
          type: Number,
          default: null,
        },
      },
    ],
    community: {
      type: [communitySchema],
      default: [],
    },
    github: {
      type: stringToggleSchema,
      default: { data: null, showOnWebsite: true },
    },
    social: {
      linkedin: {
        type: String,
        default: null,
      },
      instagram: {
        type: String,
        default: null,
      },
      twitter: {
        type: String,
        default: null,
      },
    },
    deviceID: {
      type: String,
      default: null,
    },
    codechef: {
      type: contestToggleSchema,
      default: {
        username: null,
        rating: null,
        badge: null,
        showOnWebsite: true,
        fetchTime: 0,
        attendedContestsCount: null,
        totalQuestions:0,
        easyQuestions:0,
        mediumQuestions:0,
        hardQuestions:0
      },
    },
    leetcode: {
      type: contestToggleSchema,
      default: {
        username: null,
        rating: null,
        badge: null,
        showOnWebsite: true,
        fetchTime: 0,
        attendedContestsCount: null,
        totalQuestions:0,
        easyQuestions:0,
        mediumQuestions:0,
        hardQuestions:0
      },
    },
    codeforces: {
      type: contestToggleSchema,
      default: {
        username: null,
        rating: null,
        badge: null,
        showOnWebsite: true,
        fetchTime: 0,
        attendedContestsCount: null,
        totalQuestions:0,
        easyQuestions:0,
        mediumQuestions:0,
        hardQuestions:0
      },
    },
    digitomize_rating: {
      type: Number,
      default: 0,
    },
    updatesToday: [
      {
        timestamp: { type: Date, default: Date.now },
        count: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true },
);

userSchema.methods.updateCount = function () {
  try {
    // console.log("step1");
    const today = new Date().toDateString();
    const updateIndex = this.updatesToday.findIndex(
      (update) => update.timestamp.toDateString() === today,
    );

    if (updateIndex === -1) {
      // console.log("step2");
      // console.log(this.updatesToday);
      this.updatesToday.push({ timestamp: new Date(), count: 1 });
      // console.log(this.updatesToday);
    } else {
      // console.log("step3");
      this.updatesToday[updateIndex].count += 1;
    }

    // Check if it's a new day and reset the updatesToday array if needed
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    if (now >= midnight) {
      // console.log("step4");
      this.updatesToday = [{ timestamp: now, count: 1 }];
    }
    // console.log(this.updatesToday);
  } catch (error) {
    throw new Error(`Error updating update count: ${error.message}`);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
