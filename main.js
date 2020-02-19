const axios = require('axios');
var request = require('request');
var InfiniteLoop = require('infinite-loop');
var il = new InfiniteLoop();

const controller = require('./controller');
function sendSocket(msg) {
    var optionsIo = {
        'method': 'POST',
        'url': 'https://websocket-modbus.herokuapp.com/modbus',
        // 'url': 'http://localhost:8080/modbus',
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
function addOne() {

    for (var key in controller) {
        // axios.post('http://localhost:3000/getTags',  
        //          controller[key]
        //      )
        //     .then(function (response) {
        //         let finalResult = {
        //             "device": key,
        //             "tags": response.data,
        //         }
        //         console.log(finalResult);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        async function getData() {
            let device =  key;
            let request = controller[key];
            let response = await axios.post('http://localhost:3000/getTags', request)
            // let finalResult = {
                 
            //      [device]: response.data,
            // }
            console.log(response.data);
            sendSocket(response.data)
        }
        getData()
    }

}
il.add(addOne);
il.setInterval(1000).run();