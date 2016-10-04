/** 
 * Express Route: /rides
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var Ride = require('../app/models/ride');

router.route('/rides') 
    /**
     * GET call for the ride entity (multiple).
     * @returns {object} A list of rides. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Ride.find(function(err, rides){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(rides);
            }
        });
    })
    /**
     * POST call for the ride entity.
   
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){

     /**
      * error1004: empty field
      */
      if(!req.body.rideType){
          res.status(400).json({
            "errorCode": "1004", 
            "errorMessage" : util.format("Missing required parameter %s", "rideType"),  
            "statusCode" : "400"
       });
      }
        if(req.body.startPoint.trim().length === 0){
          res.status(400).json({
            "errorCode": "1004", 
            "errorMessage" : util.format("Missing required parameter %s", "startPoint"), 
            "statusCode" : "400"
       });
       return
      }
        if(req.body.endPoint == empty){
          res.status(400).json({
            "errorCode": "1004", 
            "errorMessage" : util.format("Missing required parameter %s", "endPoint"), 
            "statusCode" : "400"
       });
      }
        if(req.body.requestTime == empty){
          res.status(400).json({
            "errorCode": "1004", 
            "errorMessage" : util.format("Missing required parameter %s", "requestTime"),
            "statusCode" : "400"
       });
      }
        /**
         * error1005: wrong format
         */
        if(typeof req.body.rideType === 'undefined'){
            res.status(422).json({
                "errorCode": "1005", 
                "errorMessage" : util.format("Missing required parameter %s", "rideType"),
                "statusCode" : "422"
            });
            return;
        }
        if(typeof req.body.startPoint === 'undefined'){
            res.status(422).json({"errorCode": "1005", 
            "errorMessage" : util.format("Missing required parameter %s", "startPoint"), 
            "statusCode" : "422"
        });
            return;
        }
        if(typeof req.body.endPoint === 'undefined'){
            res.status(422).json({"errorCode": "1005", 
            "errorMessage" : util.format("Missing required parameter %s", "endPoint"), 
            "statusCode" : "422"
        });
            return;
        }


        var ride = new Ride();
        ride.route = req.body.route;
        ride.fare = req.body.fare;
        ride.status = req.body.status;
        ride.dropOffTime = req.body.dropOffTime;
        ride.pickupTime = req.body.pickupTime;
        ride.requestTime = req.body.requestTime;
        ride.rideType = req.body.rideType;
        ride.startPoint = req.body.startPoint;
        ride.endPoint = req.body.endPoint;

        ride.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(201).json({"message" : "Ride Created", "rideCreated" : ride});
            }
        });
    });

/** 
 * Express Route: /rides/:ride_id
 * @param {string} ride_id - Id Hash of Ride Object
 */
router.route('/ride/:ride_id')
    /**
     * GET call for the ride entity (single).
     * @returns {object} the ride with Id ride_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * error 1002: Id not found
         */
        if(typeof req.params.ride_id === "undefined"){
            res.status(404).json({
                "errorCode": "1002",
                "errorMessage" : util.format("%s not found", ride_id),
                "statusCode": "400"});
                return;
        }

        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(ride);
            }
        });  
    })
    /**
     * PATCH call for the ride entity (single).
     * @param {string} license - The license plate of the new ride
     * @param {integer} doorCount - The amount of doors of the new ride
     * @param {string} make - The make of the new ride
     * @param {string} model - The model of the new ride
     * @returns {object} A message and the ride updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        if(typeof req.body.license === 'undefined'){
            res.status(422).json({"errorCode": "1002", 
            "errorMessage" : util.format("Missing required parameter %s", "license"), 
            "statusCode" : "422"});
            return;
        }
        if(typeof req.body.doorCount === 'undefined'){
            res.status(422).json({"errorCode": "1002", 
            "errorMessage" : util.format("Missing required parameter %s", "doorCount"), 
            "statusCode" : "422"});
            return;
        }
        if(typeof req.body.make === 'undefined'){
            res.status(422).json({"errorCode": "1002", 
            "errorMessage" : util.format("Missing required parameter %s", "make"), 
            "statusCode" : "422"});
            return;
        }
        if(typeof req.body.model === 'undefined'){
            res.status(422).json({"errorCode": "1002", 
            "errorMessage" : util.format("Missing required parameter %s", "model"), 
            "statusCode" : "422"});
            return;
        }

        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.status(500).send(err);
            }else{
                ride.license = req.body.license;
                ride.doorCount = req.body.doorCount;
                ride.make = req.body.make;
                ride.model = req.body.model;

                ride.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json({"message" : "Ride Updated", "rideUpdated" : ride});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the ride entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        Ride.remove({
            _id : req.params._id
        }, function(err, ride){
            if(err){
                res.status(500).send(err);
            }else{
                res.json({"message" : "Ride Deleted"});
            }
        });
    });

module.exports = router;