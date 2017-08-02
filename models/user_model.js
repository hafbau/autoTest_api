/**
 *  User schema
 *
 *  Define User Model
 *  @param {Object} schema
 *  @return {Object}
 **/
const bcrypt = require('bcrypt');

module.exports = (schema, decorate) => {
  const User = schema.define('user', {
    // auth related
    email: {type: schema.String, "null": false, limit: 150, index: true, unique: true},
    password: {type: schema.String, "null": false, limit: 250},
    lastActive: {type: schema.Date, default: Date.now()},
    loggedIn: {type: schema.Boolean, default: true},
    // Name related
    username: {type: schema.String, limit: 150, index: true},
    first_name: {type: schema.String, limit: 150, index: true},
    last_name: {type: schema.String, limit: 150, index: true},
    // other options goes in meta
    meta: {type: schema.Json},
    avatar_source: {type: schema.String, limit: 255},

  }, {});

  /* Validators */
  User.validatesPresenceOf('email');
  User.validatesUniquenessOf('email', {message: 'email already exists'});
  User.validatesPresenceOf('password');
  User.validatesLengthOf('password', {min: 5, message: {min: 'Password is too short'}});

  // User.validatesUniquenessOf('username', {message: 'username already exists'});
  // User.validatesFormatOf('username', {with: /^\S+$/, message:"is not valid"});

  const userNameValidator = (err) => {
    if (!this.first_name) return
    if (!this.first_name.replace(/\s+/g, '').length) { err(); }
  };

  const emailValidator = (err) => {
    if(!/^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/.test(this.email)) { err(); }
  };

  // User.validate('first_name', userNameValidator, {message: 'Bad first name'});
  // User.validate('email', emailValidator, {message: 'Bad email'});

  // hooks
  User.beforeCreate = async function (next) {
    if (this.password) {
      const salt = bcrypt.genSaltSync(10);
      this.password = await bcrypt.hash(this.password, salt)
    }
    // Pass control to the next
    return next();
  };

  // custom helpers
  User.authenticate = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { email } }, (err, user) => {
        if (err) return reject(err);
        if (!user) return reject({message: "User not found"});
        bcrypt.compare(password, user.password)
        .then(matched => matched ? resolve(user) : reject({message: "Password mismatch"}) );
      });
    });
  }

  return decorate(User);
};
