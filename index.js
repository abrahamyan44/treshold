const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer");
const { RenderImage } = require('./render');

var multiparty = require('multiparty');
var http = require('http');
var util = require('util');

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty({ uploadDir: __dirname + "/temp", });

const PORT = 3001;

const app = express();
// app.use(bodyParser.json());

const upload = multer({
        dest: __dirname + "/temp",
});

// const logger = (req, res, next) => {
//     req.rawBody = '';
//     req.setEncoding('utf8');
//
//     req.on('data', function(chunk) {
//         req.rawBody += chunk;
//     });
//
//     req.on('end', function() {
//         // console.log(" req.rawBody: ",  req.rawBody.toString())
//         next();
//     });
//
//         console.log(`
//       ${req.method}
//       ${req.url}
//       ${req.ip}`);
//         next();
// };
//
// // app.use(logger)

app.post(
    '/render',
    upload.single("file"),
    async (req, res) => {
        console.log(req.rawHeaders)
        console.log("Request on /render");
        const tempPath = req.file.path;
        console.log("req.file: ", req.file)
        console.log(`Saving tmp file in ${tempPath}`);
        const renderImage = new RenderImage(tempPath, __dirname + "/img.svg");
        const svgBuf = await renderImage.trace();
        console.log("Svg buffer ready");
        res.end(svgBuf)
})

// app.post('/render', multipartyMiddleware, function(req, res) {
//     console.log("req.rawHeaders: ", req.rawHeaders)
//     console.log(req.body, req.files);
//     var file = req.files.file;
//     console.log(file.name);
//     console.log(file.type);
//     res.status(200).send('OK');
// });

app.listen(PORT, "0.0.0.0", () =>{
        console.log(`Server is running on port:  ${PORT}`);
})
//
// var http = require('http')
// var url = require('url')
// var queryString = require( "querystring" );
//
// var port = 3001
// if (process.argv[2]) {
//     port = Number(process.argv[2])
// }
//
// var server = http.createServer(function (req, res) {
//
//     console.log("* " + req.method + " ************************************")
//     console.log(req.url)
//     console.log(req.headers)
//
//     var bodyData = '';
//
//     req.on('data', function(chunk) {
//         bodyData += chunk.toString();
//     });
//
//     req.on('end', function() {
//         console.log(bodyData)
//
//         res.writeHead(200, "OK", {'Content-Type': 'application/json'});
//         res.end();
//     });
//
// })
//
// server.listen(port)
//
// console.log("Server listening on " + port)