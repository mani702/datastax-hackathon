const passport=require('passport');
const { v4 : uuidv4 } =require( 'uuid');
const Uuid = require('cassandra-driver').types.Uuid;
const {addUserGoogle,getUserGoogle,addUser,getUserById} = require('./db-actions')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser(function(user, done) {
    done (null, user);
  });
  
  passport.deserializeUser(function(id, done) {
      done(null, id);
  });
passport.use(new GoogleStrategy({
    clientID: '390470853110-l7dmi40ej78i0mh9vsi3dtegbhfhs9ud.apps.googleusercontent.com',
    clientSecret: '7UFs8hoVvg2zZVt2fKzgBerN',
    callbackURL: "http://localhost:3000/google/callback"
  },
 async function(accessToken, refreshToken, profile, done) {
    
   var id= await getUserGoogle(profile.id);
      console.log("passport id is"+id+typeof(id));
      console.log("goggle id")
      if(id==undefined){
      id=uuidv4();  
      addUserGoogle(id,profile.id);
      addUser(id,'','','','')
      }
      return done(null, id);
  }
));