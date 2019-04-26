const fs = require('fs');
const path = require('path');

let inputDir = "./ShaderLib";
let referDir = "./ShaderChunk";
let outputDir = "./Output";

for (let fp of fs.readdirSync(inputDir)) {
    let content = fs.readFileSync(path.join(inputDir, fp), "utf-8");
    content = content.replace(/\s*#include\s*<(.*)>/g, (_, ref) => {
        return `\n\n/*${ref}*/\n`+fs.readFileSync(path.join(referDir, ref + ".glsl"), "utf-8");
    })
    fs.writeFileSync(path.join(outputDir, fp), content);
}