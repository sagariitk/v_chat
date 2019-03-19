var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
        done(null, user);
});

passport.use(
    new GoogleStrategy({
        clientID: '17265502054-od9cbtg29ep90clu7kmhjinfrhv6pd6l.apps.googleusercontent.com',
        clientSecret: 'Uy63fMdQjKDw9IgNnJAZSx33',
        callbackURL: 'http://vijaysantoria.xyz:9000/callback'
    },
    function(accessToken, refreshToken, profile, done){
        done(null, profile);
    })
)