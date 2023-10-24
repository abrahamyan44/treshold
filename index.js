const express = require('express');
const multer = require("multer");
const nodemailer = require("nodemailer");

const { RenderImage } = require('./render');

const PORT = 3001;

const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: 'noreply.tangie@gmail.com',
                pass: 'xdwowikfywxfdlgk',
        }
});
console.log("Email transporter is crated");

const sendMail = (to, svgBuffer) => {
        const mailOptions = {
                from: 'noreply.tangie@gmail.com',
                to,
                subject: 'Tangie file',
                text: 'Find Svg file in attachments',
                attachments: [
                        {
                                filename: 'file.svg',
                                content: new Buffer(svgBuffer,'utf-8'),
                        },
                ],
        };

        return new Promise((res, rej) => {
                transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                                console.log(error);
                                rej(error);
                        } else {
                                console.log('Email sent: ' + info.response);
                                res();
                        }
                });
        })
}

const app = express();
const upload = multer({
        dest: __dirname + "/temp",
});

app.post(
    '/render',
    upload.single("file"),
    async (req, res) => {
        console.log(req.rawHeaders);
        console.log("Request on /render");
        const tempPath = req.file.path;
        console.log("req.file: ", req.file);
        console.log(`Saving tmp file in ${tempPath}`);
        const renderImage = new RenderImage(tempPath, __dirname + "/img.svg");
        const svgBuf = await renderImage.trace();
        console.log("Svg buffer ready");
        await sendMail('yurabrahamyan44@gmail.com', svgBuf);
        console.log("Email sent");
        res.end("Email with attachment is sent");
})

app.listen(PORT, "0.0.0.0", () =>{
        console.log(`Server is running on port:  ${PORT}`);
})
