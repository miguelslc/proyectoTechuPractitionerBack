const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Movement = mongoose.model('Movimientos');

/* router.get('/', (req, res, next) => {
  let movementsList = [];
  //Movement.find().then(function(err, movimientos){
  Movement.find({}, function(err, movements){
    //if(!movimientos) { return res.sendStatus(404); }

    if (err){
      next(err);
     } else{
      for (let movement of movements) {
        movementsList.push({id: movement._id, name: movement.name, release: movement.release, amount: movement.amount});
      }
      res.json({status:"success", message: "movements list found!!!", data:{movements: movementsList}});
         
     }

    //return res.json({movement});
    //return res.json({movement: movements.toAuthJSON()});
  }).catch(next);
}); */
//router.get('/', (req, res, next) => {
router.get('/', auth.optional, (req, res, next) => {
  let movementsList = [];
  //Movement.find({}, function(err, movements){
  
  Movement.find({}, function(err, movements){
    if(!movements) { return res.sendStatus(404); }
    if (err){
      next(err);
    } else {
      for (let movement of movements) {
        movementsList.push({
          id: movement._id, 
          name: movement.name, 
          detail:movement.detail, 
          release: movement.release, 
          amount: movement.amount, 
          account: movement.account, 
          email: movement.email
        });
    }
    //return res.json({
      return res.json({movementsList});
    };
    //return res.json({movement: movements.toAuthJSON()});
  }).catch(next);
});


router.post('/', function(req, res, next){

    let movement = new Movement();

    movement.amount = req.body.movement.amount;
    movement.name = req.body.movement.name;
    movement.release = req.body.movement.release;
    movement.account = req.body.movement.account;
    movement.detail = req.body.movement.detail;
    movement.email = req.body.movement.email;

    movement.save().then(function(){
      return res.json({movement});
    }).catch(next);
});
module.exports = router;