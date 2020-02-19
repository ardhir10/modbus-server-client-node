'use strict'
const Modbus = require('jsmodbus')
const net = require('net')
require('dotenv').config()
const env = require('dotenv-array')()
var request = require('request');
const socket = new net.Socket()
const client = new Modbus.client.TCP(socket)
const options = {
    'host': process.env.MB_HOST,
    'port': process.env.MB_PORT,
}
var tagAddress = require('./tag_setting.js')
var InfiniteLoop = require('infinite-loop');
var il = new InfiniteLoop();
var datetime = require('node-datetime');
var Table = require('cli-table');
var colors = require('colors');
var readInterval = 1000;
var statusSocket = process.env.MB_WEBSOCKET;
// console.log(readInterval);
var timer = 20;
var refreshIntervalId = setInterval(() => {
    let dt = datetime.create();
    let dateTime = dt.format('Y-m-d H:M:S');
    console.clear();
    console.log(dateTime.white + ' ' + "Connecting to modbus ... ".green + timer-- + 's');
    if (timer === -1) {
        process.exit();
    }
}, 1000);


// MONGO DB
var mongoose = require('mongoose');
// -------config db mongo
mongoose.connect('mongodb://localhost/modbus', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connec to mongo !")
});
var Schema = mongoose.Schema;
var logDataSchema = {
    timestamps: String,
    datetime: Date,
    date: String,
    name: String,
    value: Number,
    device_id: Number,
}

// NAMA COLLECTION/TABLE ADA ADA PLURALNYA Misal : user jadi users,mixing jadi mixings
var logData = mongoose.model('log', new Schema(logDataSchema));

var tableOption = {
    chars: {
        'top': '═',
        'top-mid': '╤',
        'top-left': '╔',
        'top-right': '╗',
        'bottom': '═',
        'bottom-mid': '╧',
        'bottom-left': '╚',
        'bottom-right': '╝',
        'left': '║',
        'left-mid': '╟',
        'mid': '─',
        'mid-mid': '┼',
        'right': '║',
        'right-mid': '╢',
        'middle': '│'
    },
    style: {
        'padding-left': 3,
        'padding-right': 3,

    }
};
var table = new Table(tableOption);


function sendSocket(msg) {
    var optionsIo = {
        'method': 'POST',
        'url': 'http://localhost:1010/modbus',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "data": msg
        })

    };
    request(optionsIo, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
    });
}

var readHolding = (key, address, callBack) => {
    client.readHoldingRegisters(address, 2)
        .then(function (resp) {
            let valueFromModbus = resp.response._body._valuesAsBuffer.readFloatBE(0);
            let dateTime = datetime.create().format('Y-m-d H:M:S');
            let timestamps = Date.now();
            let datetimeIso = new Date(timestamps).toISOString();
            var statusLog;
            
            logData.insertMany({
                timestamps: timestamps,
                datetime: datetimeIso,
                date: dateTime,
                name: key,
                value: valueFromModbus
        }, (err, _mongooseDocuments) => {
                if (err) {
                    // console.log(err);
                    statusLog = 'FALSE'.red;
                } else {
                    statusLog = 'TRUE'.brightBlue;
                }
                // else console.log(mongooseDocuments);
                // else console.log(dateTime + ": Logging successfully ");
                table.push(
                    [dateTime.brightWhite + '', address.yellow, [key].toString().brightGreen, '  ' + valueFromModbus.toString().brightYellow, statusLog]
                );
            });
            callBack(key, valueFromModbus)
        }).catch(function () {
            process.exit();
        })
}



// TAGNYA TURUN SATU
var address = tagAddress;



var valueSendToIo = {};

socket.on('connect', function () {
    /* later */
    clearInterval(refreshIntervalId);
    let dateTime = datetime.create().format('Y-m-d H:M:S');
    console.log(dateTime + ': Modbus Connect !')
    readInterval = parseInt(process.env.MB_READ_INTERVAL)

    function addOne() {
        let loopProcess = (callBack) => {
            for (var key in address) {
                readHolding(key, address[key], function (keyModbus, valueFromModbus) {
                    valueSendToIo[keyModbus] = valueFromModbus;
                });
            }
            callBack(table, valueSendToIo);
        }
        var clearScreen = (res, callBack) => {
            console.clear();
            callBack();
        }
        loopProcess(function (res,vstio) {
            clearScreen(res, () => {
                console.log(res.toString());
                // console.log(vstio);
                if (statusSocket === 'true') {
                    sendSocket(vstio)
                }
            })
            table = [];
            table = new Table(tableOption);
            table.push(
                ['    DATETIME      '.bold.red, 'ADR '.bold.red, 'TAG NAME '.bold.red, ' VALUE'.bold.red, ' LOG STATUS'.bold.red],
            );

        });
    }
    il.add(addOne);
    il.setInterval(readInterval).run();
})

// socket.on('error', console.error)
socket.on('error', (error) => {
    let dt = datetime.create();
    let dateTime = dt.format('Y-m-d H:M:S');
    console.log(dateTime + ' ' + error.message);
    // console.log(dateTime + ' ' + "Try to reconnect, please wait ...");
    // setTimeout(() => {
    //     process.exit();
    // }, 3000);
})
socket.connect(options)