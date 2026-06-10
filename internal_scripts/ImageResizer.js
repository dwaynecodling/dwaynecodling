"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
const convinienceHelper_1 = require("./convinienceHelper");
const fs = require("fs");
const sharp = require('sharp');
const path = require("path");
async function imageFromBuffer(buff) {
    return new Promise((resolve, reject) => {
        let img = new canvas_1.Image();
        img.onerror = err => reject(err);
        img.onload = () => resolve(img);
        img.src = buff;
    });
}
async function convertToWebP(originalPath, outputPath) {
    return sharp(originalPath)
        .webp({ quality: 75 })
        .toFile(outputPath);
}
var BufferConvert;
(function (BufferConvert) {
    async function jpegToWebP(buff) {
        return sharp(buff)
            .webp({ quality: 75 })
            .toBuffer();
    }
    BufferConvert.jpegToWebP = jpegToWebP;
})(BufferConvert || (BufferConvert = {}));
async function imageFromSource(filePath) {
    return new Promise(async (resolve, reject) => {
        try {
            let source = fs.readFileSync(filePath);
            let img = await imageFromBuffer(source);
            resolve(img);
        }
        catch (exception) {
            let jpegFallback = filePath.replace(/(?:\.webp)/gmi, ".jpg");
            if (fs.existsSync(jpegFallback)) {
                let source = fs.readFileSync(jpegFallback);
                let img = await imageFromBuffer(source);
                resolve(img);
            }
            else {
                reject(exception);
            }
        }
    });
}
function getFinalSize(inputSize, requestedSize) {
    if (!convinienceHelper_1.isNullOrUndefined(requestedSize.scale)) {
        if (requestedSize.scale === "1x")
            return {
                width: inputSize.width / 2,
                height: inputSize.height / 2
            };
        return inputSize;
    }
    else {
        if (!convinienceHelper_1.isNullOrUndefined(requestedSize.width)) {
            let ratio = inputSize.height / inputSize.width;
            return {
                width: requestedSize.width,
                height: requestedSize.width * ratio
            };
        }
        else if (!convinienceHelper_1.isNullOrUndefined(requestedSize.height)) {
            let ratio = inputSize.width / inputSize.height;
            return {
                width: requestedSize.height * ratio,
                height: requestedSize.height
            };
        }
        else {
            return inputSize;
        }
    }
}
module.exports = {
    resizer: async (filePath, options) => {
        return new Promise((resolve, reject) => {
            imageFromSource(filePath).then(img => {
                let finalSize = getFinalSize({
                    width: img.width,
                    height: img.height
                }, {
                    width: options.newWidth,
                    height: options.newHeight,
                    scale: options.scale
                });
                let oCanvas = canvas_1.createCanvas(finalSize.width, finalSize.height);
                let oCtx = oCanvas.getContext('2d');
                oCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, oCanvas.width, oCanvas.height);
                if (options.outputFileType === "jpeg" || options.outputFileType === "jpg") {
                    resolve(oCanvas.toBuffer());
                }
                else {
                    resolve(BufferConvert.jpegToWebP(oCanvas.toBuffer()));
                }
            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }
};
//# sourceMappingURL=ImageResizer.js.map