import {createCanvas, Image} from "canvas";
import {isNullOrUndefined} from "./convinienceHelper";

const fs = require("fs");
const webp = require('webp-converter');
const path = require("path");

interface IResizerOptions{
    newWidth?: number;
    newHeight?: number;
    scale?:string;
    outputFileType:"jpg"|"jpeg"|"webp";
}

interface ISize{
    width?:number;
    height?:number;
    scale?:"2x"|"1x";
}

async function imageFromBuffer(buff:Buffer){
    return new Promise<Image>((resolve, reject) => {
        let img = new Image();
        img.onerror = err => reject(err);
        img.onload = () => resolve(img);
        img.src = buff;
    });
}

async function convertToWebP(originalPath:string, outputPath:string){
    return new Promise((resolve, reject) => {
        webp.cwebp(originalPath, outputPath,"-q 80", function(status,error){
            if (status == '100'){
                resolve()
            }
            else{
                reject(error);
            }
        });
    });
}

namespace BufferConvert{
    export async function jpegToWebP(buff:Buffer):Promise<Buffer>{
        return new Promise((resolve, reject) => {
            let rnd = [...Array(12)].map(() => Math.random().toString(36)[2]).join('');
            let tempJpeg = path.resolve(path.join(__dirname, `../tmp/${rnd}.jpeg` ));
            let out = path.resolve(path.join(__dirname, `../tmp/${rnd}.webp` ));
            fs.writeFile(tempJpeg, buff, ()=>{
                convertToWebP(tempJpeg, out).catch(ex => {
                    reject(ex);
                }).finally(()=>{
                    let b = fs.readFileSync(out);
                    resolve(b);
                    fs.unlinkSync(out);
                    fs.unlinkSync(tempJpeg);
                });
            });
        });
    }
}

async function imageFromSource(filePath:string){
    return new Promise<Image>(async (resolve, reject) => {
        try{
            let source = fs.readFileSync(filePath);
            let img = await imageFromBuffer(source);
            resolve(img);
        }
        catch (exception) {
            let jpegFallback = filePath.replace(/(?:\.webp)/gmi,".jpg");
            if (fs.existsSync(jpegFallback)){
                let source = fs.readFileSync(jpegFallback);
                let img = await imageFromBuffer(source);
                resolve(img);
            }
            else{
                reject(exception);
            }
        }
    });
}

function getFinalSize(inputSize:Omit<ISize, "scale">, requestedSize: ISize){
    if (!isNullOrUndefined(requestedSize.scale)){
        if (requestedSize.scale === "1x") return {
            width: inputSize.width / 2,
            height: inputSize.height / 2
        }
        return inputSize;
    }
    else{

        if (!isNullOrUndefined(requestedSize.width)){
            let ratio = inputSize.height / inputSize.width;
            return {
                width: requestedSize.width,
                height: requestedSize.width * ratio
            }
        }
        else if (!isNullOrUndefined(requestedSize.height)){
            let ratio = inputSize.width / inputSize.height;
            return {
                width: requestedSize.height * ratio,
                height: requestedSize.height
            }
        }
        else{
            return inputSize;
        }
    }
}

module.exports = {
    resizer: async (filePath:string, options:IResizerOptions):Promise<Buffer> => {
        return new Promise<Buffer>((resolve, reject) => {
            // let source = fs.readFileSync(filePath);
            imageFromSource(filePath).then(img => {
                let finalSize = getFinalSize({
                    width: img.width,
                    height: img.height
                }, {
                    width: options.newWidth,
                    height: options.newHeight,
                    scale: <any>options.scale
                });

                // step 1 - create a new canvas
                let oCanvas = createCanvas(finalSize.width, finalSize.height);
                let oCtx = oCanvas.getContext('2d');

                oCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, oCanvas.width, oCanvas.height);

                if (options.outputFileType === "jpeg" || options.outputFileType === "jpg"){
                    resolve(oCanvas.toBuffer());
                }
                else{
                    resolve(BufferConvert.jpegToWebP(oCanvas.toBuffer()));
                }
            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }
};