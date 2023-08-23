const JSZip = require('jszip')
const path = require('path')
const fs = require('fs')

class zipDistFilePlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('zipDistFilePlugin', (compilation) => {
            console.log(111, compilation.outputOptions)
            const entryDirPath = path.join('dist')
            const jsZip = new JSZip()

            function readDir(jsZip, dirPath) {
                const files = fs.readdirSync(dirPath)

                files.forEach((fileName) => {
                    const fillPath = `${dirPath}/${fileName}`
                    const file = fs.statSync(fillPath)
                    if (file.isDirectory()) {
                        const dirZip = jsZip.folder(fileName)
                        readDir(dirZip, fillPath)
                    } else {
                        jsZip.file(fileName, fs.readFileSync(fillPath))
                    }
                })
            }
            readDir(jsZip, entryDirPath)
            jsZip
                .generateAsync({
                    type: 'nodebuffer',
                    streamFiles: false,
                    compression: 'DEFLATE',
                })
                .then((content) => {
                    const dest = path.join('dist')
                    // 删除旧包
                    fs.rmdirSync(`${dest}/dist.zip`, { recursive: true })
                    // 创建新包
                    fs.mkdirSync(dest, {
                        recursive: true,
                    })
                    // 把zip包写到硬盘中，这个content目前是一段buffer
                    fs.writeFileSync(`${dest}/dist.zip`, content)
                })
        })
    }
}

module.exports = zipDistFilePlugin
