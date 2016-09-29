/** 
 * Express Route: /cars
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var Car = require('../app/models/car');

router.route('/cars') 
    /**
     * GET call for the car entity (multiple).
     * @returns {object} A list of cars. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Car.find(function(err, cars){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(cars);
            }
        });
    })
    /**
     * POST call for the car entity.
     * @param {string} license - The license plate of the new car
     * @param {integer} doorCount - The amount of doors of the new car
     * @param {string} make - The make of the new car
     * @param {string} model - The model of the new car
     * @returns {object} A message and the car created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        /**
         * error 1003: Given attribute alreay exists
         */
        Car.find({license = req.body.license}, function(err, car){
            if(!err){
               res.status(400).json({
                "errorCode": "1003",
                "errorMessage" : util.format("attribule of %s alreay exists", "license" ),
                "statusCode": "400"});
                return;
            }
        });  
     /**
      * error1004: empty field
      */
      if(!req.body.license){
          res.status(400).json({
            "errorCode": "1004", 
            "errorMessage" : util.format("Missing required parameter %s", "license"),  
            "statusCode" : "400"
       });
      }
        if(req.body.make.trim().length === 0){
          res.status(400).json({
            "errorCode": "1004", 
            "errorMessage" : util.format("Missing required parameter %s", "make"), 
            "statusCode" : "400"
       });
      }
        if(req.body.model == empty){
          res.status(400).json({
            "errorCode": "1004", 
            "errorMessage" : util.format("Missing required parameter %s", "model"), 
            "statusCode" : "400"
       });
      }
        if(req.body.doorCount == empty){
          res.status(400).json({
            "errorCode": "1004", 
            "errorMessage" : util.format("Missing required parameter %s", "doorCount"),
            "statusCode" : "400"
       });
      }
        /**
         * error1005: wrong format
         */
        if(typeof req.body.license === 'undefined'){
            res.status(422).json({
                "errorCode": "1005", 
                "errorMessage" : util.format("Missing required parameter %s", "license"),
                "statusCode" : "422"
            });
            return;
        }
        if(typeof req.body.doorCount === 'undefined'){
            res.status(422).json({"errorCode": "1005", 
            "errorMessage" : util.format("Missing required parameter %s", "doorCount"), 
            "statusCode" : "422"
        });
            return;
        }
        if(typeof req.body.make === 'undefined'){
            res.status(422).json({"errorCode": "1005", 
            "errorMessage" : util.format("Missing required parameter %s", "make"), 
            "statusCode" : "422"
        });
            return;
        }
        if(typeof req.body.model === 'undefined'){
            res.status(422).json({"errorCode": "1005", 
            "errorMessage" : util.format("Missing required parameter %s", "model"), 
            "statusCode" : "422"
        });
            return;
        }

        var car = new Car();
        car.license = req.body.license;
        car.doorCount = req.body.doorCount;
        car.make = req.body.make;
        car.model = req.body.model;

        car.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(201).json({"message" : "Car Created", "carCreated" : car});
            }
        });
    });

/** 
 * Express Route: /cars/:car_id
 * @param {string} car_id - Id Hash of Car Object
 */
router.route('/cars/:car_id')
    /**
     * GET call for the car entity (single).
     * @returns {object} the car with Id car_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * error 1002: Id not found
         */
        if(typeof req.params.car_id === "undefined"){
            res.status(404).json({
                "errorCode": "1002",
                "errorMessage" : util.format("%s not found", car_id),
                "statusCode": "400"});
                return;
        }

        Car.findById(req.params.car_id, function(err, car){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(car);
            }
        });  
    })
    /**
     * PATCH call for the car entity (single).
     * @param {string} license - The license plate of the new car
     * @param {integer} doorCount - The amount of doors of the new car
     * @param {string} make - The make of the new car
     * @param {string} model - The model of the new car
     * @returns {object} A message and the car updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        if(typeof req.body.license === 'undefined'){
            res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "license"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.doorCount === 'undefined'){
            res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "doorCount"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.make === 'undefined'){
            res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "make"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.model === 'undefined'){
            res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "model"), "statusCode" : "422"});
            return;
        }

        Car.findById(req.params.car_id, function(err, car){
            if(err){
                res.status(500).send(err);
            }else{
                car.license = req.body.license;
                car.doorCount = req.body.doorCount;
                car.make = req.body.make;
                car.model = req.body.model;

                car.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json({"message" : "Car Updated", "carUpdated" : car});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the car entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        Car.remove({
            _id : req.params.car_id
        }, function(err, car){
            if(err){
                res.status(500).send(err);
            }else{
                res.json({"message" : "Car Deleted"});
            }
        });
    });

module.exports = router;