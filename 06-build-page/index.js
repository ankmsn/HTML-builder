const fs = require('fs');
const path = require('path');

// Создание папки project-dist
const projectDistPath = path.join(__dirname, 'project-dist');
fs.mkdir(projectDistPath, () => {});

// Сборка стилей
const readPathStyle = path.join(__dirname, 'styles');
const writePathStyle = path.join(__dirname, 'project-dist', 'style.css');
const writeStreamStyle = fs.createWriteStream(writePathStyle, {flags: 'w'});

fs.readdir(readPathStyle, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  for (let file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const filePath = path.join(readPathStyle, file.name);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;

        writeStreamStyle.write(data, () => {
        });
      });
    }
  }
});

// Копирование assets
const dirCopy = path.join(__dirname, 'project-dist/assets');
const dirOriginal = path.join(__dirname, 'assets')

fs.rm(dirCopy, { recursive: true, force: true }, (err) => {
    if (err) throw err;

    fs.mkdir(dirCopy, { recursive: true }, (err) => {
        if (err) throw err;

        fs.readdir(dirOriginal, { withFileTypes: true }, (err, files) => {
            if (err) throw err;
            
            for (let file of files) {
                const fileOriginal = path.join(__dirname, 'assets', file.name);
                const fileCopy = path.join(__dirname, 'project-dist/assets', file.name);

                if (file.isDirectory()) {
                    fs.mkdir(fileCopy, { recursive: true }, (err) => {
                        if (err) throw err;
                    });
                } else {
                    fs.copyFile(fileOriginal, fileCopy, (err) => {
                        if (err) throw err;
                    });
                }
            }
        });
    });
});


// Замена тегов в template.html
const templatePath = path.join(__dirname, 'template.html');
fs.readFile(templatePath, 'utf-8', (err, contentTemplate) => {
  if (err) throw err;

  const componentsPath = path.join(__dirname, 'components');
  fs.readdir(componentsPath, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
   
      const componentName = path.basename(file, '.html');
      const componentTag = `{{${componentName}}}`;
      const componentFilePath = path.join(componentsPath, file);
   
      fs.readFile(componentFilePath, 'utf-8', (err, contentComponent) => {
        if (err) throw err;

        contentTemplate = contentTemplate.replace(componentTag, contentComponent);

        if (!contentTemplate.includes(componentTag)) {
          const indexPath = path.join(projectDistPath, 'index.html');
          const writeStream = fs.createWriteStream(indexPath, { flags: 'w' });
          writeStream.write(contentTemplate, () => {});
        }
      });
    });
  });
});
