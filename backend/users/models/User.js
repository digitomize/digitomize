const mongoose = require("mongoose");
const { COMMUNITY_ROLE } = require("../../community/utils/const");

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
});

const communitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Community Id is required."],
    unique: true,
  },
  role: {
    type: String,
    default: COMMUNITY_ROLE.MEMBER,
  },
  score: {
    type: Number,
    default: 0,
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
    name: {
      type: String,
      // required: [true, "First name is required."]
    },
    picture: {
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
      default: false,
    },
    bio: {
      type: stringToggleSchema,
      default: { data: null, showOnWebsite: false },
    },
    dateOfBirth: {
      type: stringToggleSchema,
      default: { data: null, showOnWebsite: false },
    },
    phoneNumber: {
      type: numberToggleSchema,
      default: { data: null, showOnWebsite: false },
    },
    skills: [
      {
        type: String,
        default: [],
      },
    ],
    role: {
      type: String,
      default: "user",
    },
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
      default: { data: null, showOnWebsite: false },
    },
    codechef: {
      type: contestToggleSchema,
      default: {
        username: null,
        rating: null,
        badge: null,
        showOnWebsite: false,
        fetchTime: 0,
        attendedContestsCount: null,
      },
    },
    leetcode: {
      type: contestToggleSchema,
      default: {
        username: null,
        rating: null,
        badge: null,
        showOnWebsite: false,
        fetchTime: 0,
        attendedContestsCount: null,
      },
    },
    codeforces: {
      type: contestToggleSchema,
      default: {
        username: null,
        rating: null,
        badge: null,
        showOnWebsite: false,
        fetchTime: 0,
        attendedContestsCount: null,
      },
    },
    updatesToday: [
      {
        timestamp: { type: Date, default: Date.now },
        count: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.updateCount = function () {
  try {
    console.log("step1");
    const today = new Date().toDateString();
    const updateIndex = this.updatesToday.findIndex(
      (update) => update.timestamp.toDateString() === today
    );

    if (updateIndex === -1) {
      console.log("step2");
      console.log(this.updatesToday);
      this.updatesToday.push({ timestamp: new Date(), count: 1 });
      console.log(this.updatesToday);
    } else {
      console.log("step3");
      this.updatesToday[updateIndex].count += 1;
    }

    // Check if it's a new day and reset the updatesToday array if needed
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    if (now >= midnight) {
      console.log("step4");
      this.updatesToday = [{ timestamp: now, count: 1 }];
    }
    console.log(this.updatesToday);
  } catch (error) {
    throw new Error(`Error updating update count: ${error.message}`);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
