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

router.get('/', auth.required, (req, res, next) => {
  let movementsList = [];
  Movement.find({movements:req.body.id}, function(err, movements){
  //Movement.find({movements:req.body.id}).then(function(movement){
    if(!movements) { return res.sendStatus(404); }
    if (err){
      next(err);
    } else {
      for (let movement of movements) {
        movementsList.push({id: movement._id, name: movement.name, release: movement.release, amount: movement.amount});
    }
    //return res.json({
      return res.json({status:"success", message: "movements list found!!!", data:{movements: movementsList}});
    };
    //return res.json({movement: movements.toAuthJSON()});
  }).catch(next);
});


router.post('/', function(req, res, next){
    let movement = new Movement();

    movement.amount = req.body.movement.amount;
    movement.name = req.body.movement.name;
    movement.release = req.body.movement.release;
    
    movement.save().then(function(){
      return res.json({movement});
    }).catch(next);
});
module.exports = router;