/** 
 * Express Route: /passengers
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var Passenger = require('../app/models/passenger');

router.route('/passengers')

    .get(function (req, res) {
        Passenger.find(function (err, passengers) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(passengers);
            }
        });
    })

    .post(function (req, res) {
        /**
        * error 1003: Given attribute alreay exists
                 */
        Car.find({ license: req.body.emailAddress }, function (err, car) {
            if (err) {
                res.status(400).json({
                    "errorCode": "1003",
                    "errorMessage": util.format("attribule of %s alreay exists", "emailAddress"),
                    "statusCode": "400"
                });
                return;
            }
        });
        /**
        * error1004: empty field
        */
        if (req.body.firstName.trim().length === 0) {
            res.status(400).json({
                "errorCode": "1004",
                "errorMessage": util.format("Missing required parameter %s", "firstName"),
                "statusCode": "400"
            });
            return;
        }
        if (req.body.lastName.trim().length === 0) {
            res.status(400).json({
                "errorCode": "1004",
                "errorMessage": util.format("Missing required parameter %s", "lastName"),
                "statusCode": "400"
            });
            return;
        }
        if (req.body.emailAddress.trim().length === 0) {
            res.status(400).json({
                "errorCode": "1004",
                "errorMessage": util.format("Missing required parameter %s", "emailAddress"),
                "statusCode": "400"
            });
            return;
        }
        if (req.body.password.trim().length === 0) {
            res.status(400).json({
                "errorCode": "1004",
                "errorMessage": util.format("Missing required parameter %s", "password"),
                "statusCode": "400"
            });
            return;
        }
        if (req.body.phoneNumber.trim().length === 0) {
            res.status(400).json({
                "errorCode": "1004",
                "errorMessage": util.format("Missing required parameter %s", "phoneNumber"),
                "statusCode": "400"
            });
            return;
        }

        /**
        * format wrong
        */
        if (typeof req.body.firstName === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "firstName"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.lastName === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "lastName"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.username === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "username"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.emailAddress === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "emailAddress"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.password === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "password"), "statusCode": "422" });
            return;
        }

        var passenger = new Passenger();
        passenger.firstName = req.body.firstName;
        passenger.lastName = req.body.lastName;
        passenger.dateOfBirth = req.body.dateOfBirth;
        passenger.username = req.body.username;
        passenger.emailAddress = req.body.emailAddress;
        passenger.password = req.body.password;
        passenger.addressLine1 = req.body.addressLine1;
        passenger.addressLine2 = req.body.addressLine2;
        passenger.city = req.body.city;
        passenger.state = req.body.state;
        passenger.zip = req.body.zip;
        passenger.phoneNumber = req.body.phoneNumber;

        passenger.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).json({ "message": "Passenger Created", "passengerCreated": passenger });
            }
        });
    });

/** 
 * Express Route: /passengers/:passenger_id
 * @param {string} passenger_id - Id Hash of passenger Object
 */
router.route('/passengers/:passenger_id')
    /**
     * GET call for the passenger entity (single).
     * @returns {object} the passenger with Id passenger_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function (req, res) {
        /**
         *error 1002: Id not found (GET, DELETE, PATCH)
         */
        if (typeof req.params.passenger_id === "undefined") {
            res.status(404).json({
                "errorCode": "1002",
                "errorMessage": util.format("%s not found", passenger_id),
                "statusCode": "400"
            });
            return;
        }

        Passenger.findById(req.params.passenger_id, function (err, passenger) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(passenger);
            }
        });
    })

    .patch(function (req, res) {

        if (typeof req.body.firstName === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "firstName"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.lastName === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "lastName"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.username === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "username"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.emailAddress === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "emailAddress"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.password === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "password"), "statusCode": "422" });
            return;
        }

        Passenger.findById(req.params.passenger_id, function (err, passenger) {
            if (err) {
                res.status(500).send(err);
            } else {
                passenger.firstName = req.body.firstName;
                passenger.lastName = req.body.lastName;
                passenger.dateOfBirth = req.body.dateOfBirth;
                passenger.username = req.body.username;
                passenger.emailAddress = req.body.emailAddress;
                passenger.password = req.body.password;
                passenger.addressLine1 = req.body.addressLine1;
                passenger.addressLine2 = req.body.addressLine2;
                passenger.city = req.body.city;
                passenger.state = req.body.state;
                passenger.zip = req.body.zip;
                passenger.phoneNumber = req.body.phoneNumber;

                passenger.save(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json({ "message": "Passenger Updated", "passengerUpdated": passenger });
                    }
                });
            }
        });
    })

    .delete(function (req, res) {
        Passenger.remove({
            _id: req.params.passenger_id
        }, function (err, passenger) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({ "message": "Passenger Deleted" });
            }
        });
    });

module.exports = router;