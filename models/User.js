const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  created_at: { type: Date },
  updated_at: { type: Date },
});

UserSchema.pre('save', function (callback) {
  const user = this;
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  user.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!user.created_at) {
    user.created_at = currentDate;
  }

  if (!user.isModified('password')) return callback();

  bcrypt.genSalt(5, (err, salt) => {
    if (err) return callback(err);

    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) { return callback(err); }
      this.password = hash;
      callback();
    });
  });
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', UserSchema);
