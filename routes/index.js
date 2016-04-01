/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

let express = require('express');
let fs = require('fs');
let uuid = require('uuid');

module.exports = function () {
    let app = express.Router();

    app.get('/:id', function (req, res) {
        // check if ID is actually id...
        if(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(req.params.id)) {

            fs.readFile(__dirname +'/../farms/'+ req.params.id +'.json', function (err, data) {
                if (err) {
                    res.status(500).json('Unable to find farm plan');
                    return;
                }

                res.type('application/json');
                res.send(data.toString());
            });
        } else {
            res.status(500).json('Unable to find farm plan');
        }
    });

    app.post('/save', function (req, res) {
        let id = uuid.v4();
        let data = null;
        try {
            data = JSON.stringify(req.body);
        } catch(e) {
            res.status(500).json('Failed to save farm plan');
            return;
        }

        fs.writeFile(__dirname +'/../farms/'+ id +'.json', data, function (err, data) {
            if (err) {
                res.status(500).json('Failed to save farm plan');
                return;
            }
            res.json({id: id});
        })
    });

    return app;
};