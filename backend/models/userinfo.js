const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    DOB: {
      type: Object,
      required: true,
    },
    Occupation: {
      type: String,
      required: true,
    },
    Impression: {
      type: String,
      required: true,
    },
    //Learn
    LSubject: {
      type: Array,
      required: true,
    },
    LTopic: {
      type: Array,
      required: true,
    },
    LTiming: {
      type: String,
      required: true,
    },
    //Teach
    TSubject: {
      type: Array,
      required: true,
    },
    TTopic: {
      type: Array,
      required: true,
    },
    TTiming: {
      type: String,
      required: true,
    },
    Image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    Email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
