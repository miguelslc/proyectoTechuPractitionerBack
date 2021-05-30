const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const Account = mongoose.model('Account');

const auth = require('../auth');

router.get('/register', (req, res, next) => {
  User.find().then((user) => {
    if(!user){ return res.sendStatus(401); }

    return res.json({user});
  }).catch(next);
});

router.get('/register/:id', auth.required, (req, res, next) => {
    User.findById(req.payload.id).then((user) => {
      if(!user){ return res.sendStatus(401); }
  
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

router.put('/', auth.required, (req, res, next) => {
    User.findById(req.payload.id).then((user) => {
      if(!user){ return res.sendStatus(401); }
  
      // only update fields that were actually passed...
      if(typeof req.body.user.name !== 'undefined'){
        user.name = req.body.user.name;
      }
      if(typeof req.body.user.email !== 'undefined'){
        user.email = req.body.user.email;
      }
      if(typeof req.body.user.password !== 'undefined'){
        user.setPassword(req.body.user.password);
      }
  
      return user.save().then(() => {
        return res.json({user: user.toAuthJSON()});
      });
    }).catch(next);
});

router.post('/login', (req, res, next) => {
    if(!req.body.user.email){
      return res.status(422).json({errors: {email: "Por favor, ingrese E-Mail."}});
    }
  
    if(!req.body.user.password){
      return res.status(422).json({errors: {password: "Por favor, ingrese Password"}});
    }
  
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if(err){ return next(err); }
  
      if(user){
        user.token = user.generateJWT();
        return res.json({user: user.toAuthJSON()});
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
});

router.post('/register', (req, res, next) => {

    let user = new User();
    if(!req.body.user.name){
      return res.status(422).json({errors: {name: "Por favor, ingrese Nombre"}});
    }
    if(!req.body.user.email){
      return res.status(422).json({errors: {email: "Por favor, ingrese E-Mail."}});
    }
    if(!req.body.user.password){
      return res.status(422).json({errors: {password: "Por favor, ingrese Password"}});
    }
    user.name = req.body.user.name;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
  
    user.save().then(() => {
      createAccount(user);
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

let createAccount = async (user) => {
  let account = new Account({user});
  account.save().catch( (err) => console.log(err));
};

module.exports = router;