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
    .get(function (req, res) {
        Car.find(function (err, cars) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(cars);
            }
        });
    })
    .post(function (req, res) {
        /**
         * error 1003: Given attribute alreay exists
         */
        Car.find({ license: req.body.license }, function (err, car) {
            if (err) {
                res.status(400).json({
                    "errorCode": "1003",
                    "errorMessage": util.format("attribule of %s alreay exists", "license"),
                    "statusCode": "400"
                });
                return;
            }
        });
        /**
         * error1004: empty field
         */
        if (!req.body.driver) {
            res.status(400).json({
                "errorCode": "1004",
                "errorMessage": util.format("Missing required parameter %s", "driver"),
                "statusCode": "400"
            });
            return;
        }
        if (!req.body.license) {
            res.status(400).json({
                "errorCode": "1004",
                "errorMessage": util.format("Missing required parameter %s", "license"),
                "statusCode": "400"
            });
            return;
        }
        if (!req.body.make) {
            res.status(400).json({
                "errorCode": "1004",
                "errorMessage": util.format("Missing required parameter %s", "make"),
                "statusCode": "400"
            });
            return;
        }
        if (!req.body.model) {
            res.status(400).json({
                "errorCode": "1004",
                "errorMessage": util.format("Missing required parameter %s", "model"),
                "statusCode": "400"
            });
            return;
        }
        if (!req.body.doorCount) {
            res.status(400).json({
                "errorCode": "1004",
                "errorMessage": util.format("Missing required parameter %s", "doorCount"),
                "statusCode": "400"
            });
            return;
        }
        /**
         * format wrong (POST, PATCH)
         */
        if (typeof req.body.license === 'undefined') {
            res.status(422).json({
                "errorCode": "1005",
                "errorMessage": util.format("Missing required parameter %s", "license"),
                "statusCode": "422"
            });
            return;
        }
        if (typeof req.body.doorCount === 'undefined') {
            res.status(422).json({
                "errorCode": "1005",
                "errorMessage": util.format("Missing required parameter %s", "doorCount"),
                "statusCode": "422"
            });
            return;
        }
        if (typeof req.body.make === 'undefined') {
            res.status(422).json({
                "errorCode": "1005",
                "errorMessage": util.format("Missing required parameter %s", "make"),
                "statusCode": "422"
            });
            return;
        }
        if (typeof req.body.model === 'undefined') {
            res.status(422).json({
                "errorCode": "1005",
                "errorMessage": util.format("Missing required parameter %s", "model"),
                "statusCode": "422"
            });
            return;
        }

        var car = new Car();
        car.license = req.body.license;
        car.doorCount = req.body.doorCount;
        car.make = req.body.make;
        car.model = req.body.model;
        car.driver = req.body.driver;

        car.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).json({ "message": "Car Created", "carCreated": car });
            }
        });
    });

router.route('/cars/:car_id')
    /**
     * GET
     */
    .get(function (req, res) {
        /**
         *error 1002: Id not found (GET, DELETE, PATCH)
         */
        if (typeof req.params.car_id === "undefined") {
            res.status(404).json({
                "errorCode": "1002",
                "errorMessage": util.format("%s not found", car_id),
                "statusCode": "400"
            });
            return;
        }

        Car.findById(req.params.car_id, function (err, car) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(car);
            }
        });
    })
    /**
     * PATCH 
     */
    .patch(function (req, res) {

        /**
         *error 1002: Id not found (GET, DELETE, PATCH)
         */
        if (typeof req.params.car_id === "undefined") {
            res.status(404).json({
                "errorCode": "1002",
                "errorMessage": util.format("%s not found", car_id),
                "statusCode": "400"
            });
            return;
        }


        /**
         * format wrong (POST, PATCH)
         */

        if (typeof req.body.license === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "license"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.doorCount === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "doorCount"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.make === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "make"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.model === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "model"), "statusCode": "422" });
            return;
        }

        Car.findById(req.params.car_id, function (err, car) {
            if (err) {
                res.status(500).send(err);
            } else {
                car.license = req.body.license;
                car.doorCount = req.body.doorCount;
                car.make = req.body.make;
                car.model = req.body.model;
                car.driver = req.body.driver;

                car.save(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json({ "message": "Car Updated", "carUpdated": car });
                    }
                });
            }
        });
    })
    /**
     * DELETE 
     */
    .delete(function (req, res) {
        /**
         *error 1002: Id not found (GET, DELETE, PATCH)
       */
        if (typeof req.params.car_id === "undefined") {
            res.status(404).json({
                "errorCode": "1002",
                "errorMessage": util.format("%s not found", car_id),
                "statusCode": "400"
            });
            return;
        }

        Car.remove({
            _id: req.params.car_id
        }, function (err, car) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({ "message": "Car Deleted" });
            }
        });
    });

module.exports = router;