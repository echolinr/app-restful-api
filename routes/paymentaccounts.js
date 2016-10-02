/** 
 * Express Route: /paymentaccounts
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var Passenger = require('../app/models/passenger');
var Driver = require('../app/models/driver');
var PaymentAccount = require('../app/models/paymentaccount');

router.route('/passenger/:passenger_id/paymentaccount')
    .post(function (req, res) {
        Passenger.findById(req.params.passenger_id, function (err, passenger) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            var account = new PaymentAccount(req.body);

            if(!account.expirationDate) {
                res.status(400).json({
                    message:'passenger require expirationDate'
                });
                return ;
            }
            account.passenger_id = req.params.passenger_id;
            account.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.status(201).json({ "message": "PaymentAccount Created", "paymentAccountCreated": account });
            });
        })
    });

router.route('/driver/:driver_id/paymentaccount')
    .post(function (req, res) {
        Driver.findById(req.params.driver_id, function (err, driver) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            var account = new PaymentAccount(req.body);

            if(!account.expirationDate) {
                res.status(400).json({
                    message:'driver require expirationDate'
                });
                return ;
            }
            account.driver_id = req.params.driver_id;
            account.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.status(201).json({ "message": "PaymentAccount Created", "paymentAccountCreated": account });
            });
        })
    });
router.route('/paymentaccounts')
    /**
     * GET call for the paymentAccount entity (multiple).
     * @returns {object} A list of paymentAccounts. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function (req, res) {
        PaymentAccount.find(function (err, paymentAccounts) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(paymentAccounts);
            }
        });
    })

    .post(function (req, res) {
        // if(typeof req.body.accountType === 'undefined'){
        //     res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "accountType"), "statusCode" : "422"});
        //     return;
        // }
        // if(typeof req.body.accountNumber === 'undefined'){
        //     res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "accountNumber"), "statusCode" : "422"});
        //     return;
        // }
        // if(typeof req.body.expirationDate === 'undefined'){
        //     res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "expirationDate"), "statusCode" : "422"});
        //     return;
        // }
        // if(typeof req.body.nameOnAccount === 'undefined'){
        //     res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "nameOnAccount"), "statusCode" : "422"});
        //     return;
        // }
        // if(typeof req.body.bank === 'undefined'){
        //     res.status(422).json({"errorCode": "1002", "errorMessage" : util.format("Missing required parameter %s", "bank"), "statusCode" : "422"});
        //     return;
        // }

        var paymentAccount = new PaymentAccount(req.body);
        // paymentAccount.accountType = req.body.accountType;
        // paymentAccount.accountNumber = req.body.accountNumber;
        // paymentAccount.expirationDate = req.body.expirationDate;
        // paymentAccount.nameOnAccount = req.body.nameOnAccount;
        // paymentAccount.bank = req.body.bank;

        paymentAccount.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).json({ "message": "PaymentAccount Created", "paymentAccountCreated": paymentAccount });
            }
        });
    });

/** 
 * Express Route: /paymentaccounts/:paymentaccount_id
 * @param {string} paymentaccount_id - Id Hash of PaymentAccount Object
 */
router.route('/paymentaccounts/:paymentaccount_id')
    /**
     * GET call for the paymentAccount entity (single).
     * @returns {object} the paymentaccount with Id paymentaccount_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function (req, res) {
        PaymentAccount.findById(req.params.paymentaccount_id, function (err, paymentAccount) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(paymentAccount);
            }
        });
    })
    .patch(function (req, res) {
        if (typeof req.body.accountType === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "accountType"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.accountNumber === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "accountNumber"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.expirationDate === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "expirationDate"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.nameOnAccount === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "nameOnAccount"), "statusCode": "422" });
            return;
        }
        if (typeof req.body.bank === 'undefined') {
            res.status(422).json({ "errorCode": "1002", "errorMessage": util.format("Missing required parameter %s", "bank"), "statusCode": "422" });
            return;
        }

        PaymentAccount.findById(req.params.paymentaccount_id, function (err, paymentAccount) {
            if (err) {
                res.status(500).send(err);
            } else {
                paymentAccount.accountType = req.body.accountType;
                paymentAccount.accountNumber = req.body.accountNumber;
                paymentAccount.expirationDate = req.body.expirationDate;
                paymentAccount.nameOnAccount = req.body.nameOnAccount;
                paymentAccount.bank = req.body.bank;

                paymentaccount.save(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json({ "message": "PaymentAccount Updated", "paymentAccountUpdated": paymentAccount });
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the paymentaccount entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function (req, res) {
        PaymentAccount.remove({
            _id: req.params.paymentaccount_id
        }, function (err, paymentaccount) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({ "message": "PaymentAccount Deleted" });
            }
        });
    });

module.exports = router;