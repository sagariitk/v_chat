const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport){
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "17265502054-hudrg229rjt8gsr6agpoohckqnkoda6r.apps.googleusercontent.com",
            clientSecret: "PVtHf_WOqIyIqI1VNh5Dj9hP",
            callbackURL: "http://127.0.0.1:1338/profile"
        },
        function(token, refreshToken, profile, done){
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};