const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'secret-folder');
fs.promises.readdir(filePath, { withFileTypes: true })
  .then((dirents) => {
    const files = dirents.reduce((acc, element) => {
if (element.isFile()){

    fs.promises.stat(path.join(filePath, element.name))
    .then((stat) => {
      acc += `${path.basename(element.name, path.extname(element.name))} - ${path.extname(element.name).slice(1)} - ${stat.size/1000}kb\n`;
      console.log(acc);
    })
}
return acc
    },'')
    console.log(files);
  })