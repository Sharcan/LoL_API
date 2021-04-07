const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const Account = mongoose.model('Account');

passport.use(
    new localStrategy({usernameField: "username", passReqToCallback: true},
    (req, username, password, done) => {
        Account.findOne({username: username}, 
            (err, account) => {
                if(err) {
                    return done(err);
                }
                else if(!account){
                    return done(null, false, {message: "Compte inexistant"});
                }
                else if(!account.verifyPassword(password)) {
                    return done(null, false, {message: 'Mot de passe incorrect'});
                }
                else {
                    return done(null, account);
                }
            })
    })
)