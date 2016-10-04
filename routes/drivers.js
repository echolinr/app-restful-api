/** 
 * Express Route: /drivers
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var Driver = require('../app/models/driver');

router.route('/drivers')
    .get(function (req, res) {
        /**
        * error 1002: Id not found (GET, DELETE, PATCH)
        */
        if (typeof req.params.driver_id === "undefined") {
            res.status(404).json({
                "errorCode": "1002",
                "errorMessage": util.format("%s not found", driver_id),
                "statusCode": "400"
            });
            return;
        }
        Driver.find(function (err, drivers) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(drivers);
            }
        });
    })
    .post(function (req, res) {

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
        if (typeof req.body.drivingLicense === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "drivingLicense"), "statusCode": "422" });
            return;
        }

        var driver = new Driver();

        driver.firstName = req.body.firstName;
        driver.lastName = req.body.lastName;
        driver.dateOfBirth = req.body.dateOfBirth;
        driver.licenseType = req.body.licenseType;
        driver.username = req.body.username;
        driver.emailAddress = req.body.emailAddress;
        driver.password = req.body.password;
        driver.addressLine1 = req.body.addressLine1;
        driver.addressLine2 = req.body.addressLine2;
        driver.city = req.body.city;
        driver.state = req.body.state;
        driver.zip = req.body.zip;
        driver.phoneNumber = req.body.phoneNumber;

        driver.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).json({ "message": "Driver Created", "driverCreated": driver });
            }
        });
    });

/** 
 * Express Route: /drivers/:driver_id
 * @param {string} driver_id - Id Hash of driver Object
 */
router.route('/drivers/:driver_id')

    .get(function (req, res) {
        /**
          * error 1002: Id not found
          */
        if (typeof req.params.driver_id === "undefined") {
            res.status(404).json({
                "errorCode": "1002",
                "errorMessage": util.format("%s not found", driver_id),
                "statusCode": "400"
            });
            return;
        }
        Driver.findById(req.params.driver_id, function (err, driver) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(driver);
            }
        });
    })

    .patch(function (req, res) {
        /**
          * error 1002: Id not found
          */
        if (typeof req.params.driver_id === "undefined") {
            res.status(404).json({
                "errorCode": "1002",
                "errorMessage": util.format("%s not found", driver_id),
                "statusCode": "400"
            });
            return;
        }

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
        if (typeof req.body.addressLine1 === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "addressLine1"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.addressLine2 === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "addressLine2"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.city === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "city"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.state === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "state"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.zip === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "zip"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.phoneNumber === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "phoneNumber"), "statusCode": "422" });
            return;
        }
        Driver.findById(req.params.driver_id, function (err, driver) {
            if (err) {
                res.status(500).send(err);
            } else {
                driver.firstName = req.body.firstName;
                driver.lastName = req.body.lastName;
                driver.dateOfBirth = req.body.dateOfBirth;
                driver.licenseType = req.body.licenseType;
                driver.username = req.body.username;
                driver.emailAddress = req.body.emailAddress;
                driver.password = req.body.password;
                driver.addressLine1 = req.body.addressLine1;
                driver.addressLine2 = req.body.addressLine2;
                driver.city = req.body.city;
                driver.state = req.body.state;
                driver.zip = req.body.zip;
                driver.phoneNumber = req.body.phoneNumber;

                driver.save(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json({ "message": "Driver Updated", "driverUpdated": driver });
                    }
                });
            }
        });
    })

    .delete(function (req, res) {
        /**
         * error 1002: Id not found
         */
        if (typeof req.params.driver_id === "undefined") {
            res.status(404).json({
                "errorCode": "1002",
                "errorMessage": util.format("%s not found", driver_id),
                "statusCode": "400"
            });
            return;
        }

        Driver.remove({
            _id: req.params.driver_id
        }, function (err, driver) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({ "message": "Driver Deleted" });
            }
        });
    });

module.exports = router;