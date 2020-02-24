const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Account = mongoose.model('Account');
const User = mongoose.model('User');

// router.param('account', (req, res, next, number) => {
//   Account.findOne({ number })
//     .then((account) => {
//       if (!account) { return res.sendStatus(404); }
//       req.account = account;
//       return next();
//     }).catch(next);
// });

//router.get('/', auth.required, (req, res, next) => {
router.get('/', (req, res, next) => {
  Account.find({})
    .then((accounts) => {
      if(!accounts) { return res.sendStatus(404);}
      return res.json({accounts});
    }).catch(next);
});

router.post('/', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if (!user) { return res.sendStatus(401); }

    var account = new Account(req.body.account);
    account.user = user;

    return account.save().then(() => {
      return res.json({account: account.toJSON()});
    });
  }).catch(next);
});

router.put('/:account', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if(req.account.user._id.toString() === req.payload.id.toString()){
      if(typeof req.body.account.amount !== 'undefined'){
        req.account.amount = req.body.account.amount;
      }
      req.account.save().then((a) => {
        return res.json({article: a.toJSON()});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

module.exports = router;