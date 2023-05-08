const fs = require('fs');
const path = require('path');

const readPath = path.join(__dirname, 'styles');
const writePath = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(writePath, {flags: 'w'});

fs.readdir(readPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  for (let file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const filePath = path.join(readPath, file.name);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;

        writeStream.write(data, () => {
        });
      });
    }
  }
});
