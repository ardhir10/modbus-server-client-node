const express = require('express')
const app = express()
const port = 3000
var datetime = require('node-datetime');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/getTags', (req, res) => {
    var modbus = require('jsmodbus');
    const net = require('net')
    const socket = new net.Socket()
    const options = {
        'host': req.body.options.host,
        'port': req.body.options.port
    }
    let dt = datetime.create();
    let dateTime = dt.format('Y-m-d H:M:S');
    const client = new modbus.client.TCP(socket)
    let tagAddress = req.body.tags;
    var deviceName = req.body.options.device;
    socket.on('connect', function () {
        async function getData() {
            let result = {}
            let deviceRes = {}
            let valuemodbus;
            for (var key in tagAddress) {
                let resp = await client.readHoldingRegisters(tagAddress[key], 2)
                var strArray = key.split(":");
                switch (strArray[1]) {
                    case 'FloatBE':
                        valuemodbus = resp.response._body._valuesAsBuffer.readFloatBE();
                        break;

                    case 'Int16BE':
                        valuemodbus = resp.response._body._valuesAsBuffer.readInt16BE();
                        break;

                    default:
                        valuemodbus = resp.response._body._valuesAsBuffer.readFloatBE();
                        break;
                }
                result[strArray[0]] = valuemodbus
            }
            deviceRes[deviceName] = result
            console.log(dateTime +" Connect to : " + req.body.options.host + ":" + req.body.options.port);
            res.send(deviceRes);
            socket.end()
        }
        getData();
    })
    socket.on('error', () => {
        res.send({
            message: null
        });
        socket.end()
    })

    socket.connect(options)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))