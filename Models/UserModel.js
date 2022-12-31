const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The user must have a name"],
    minlength: [5, "The name must have at least 5 characters"],
    maxlength: [25, "The name can have 25 characters at most"],
  },
  email: {
    type: String,
    required: [true, "User must have an email address"],
    validate: {
      validator: function (mail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
      },
      message: "Invalid email address",
    },
    unique: [true, "User exist with the same email already"],
  },
  password: {
    type: String,
    minlength: [8, "Password must have at least 8 characters"],
    required: [true, "User must have password"],
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

//Take the hash of the password before saving in database (pre-maturely)
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.correctPassword = async function (
  TypedPassword,
  ActualPassowrd
) {
  return await bcrypt.compare(TypedPassword, ActualPassowrd);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
