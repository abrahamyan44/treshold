const potrace = require('potrace');
const fs = require('fs');

class RenderImage {
    constructor(inputPath, savePath) {
        this.inputPath = inputPath;
        this.savePath = savePath;
    }

    trace() {
        console.log("Trace started");
        return new Promise((resolve, reject) => {
            potrace.trace(this.inputPath, (err, svg) => {
                if (err) {
                    reject(err);
                }
                fs.writeFile(this.savePath, svg, (err) => {
                    console.log(`Trying to save in path: ${this.savePath}`);
                    if (err) {
                        reject(err);
                    }
                    resolve(svg);
                })
            });
        })
    }
}

module.exports = { RenderImage }
