const passport = require('passport');
const {users} = require('../models');
passport.use(new LocalStrategy(
    function(email, pass, done) {
     users.findAll({where:{ email: email }, raw:true}, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(pass)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
  module.exports = passport;