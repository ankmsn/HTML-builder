const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, {flags: 'a'});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Введите текст:')

const writeToFile = () => {
  rl.question('', (answer) => {
    if (answer === 'exit'){
      console.log('Файл записан. Успехов!')
      writeStream.end();
      rl.close();
    } else {
      writeStream.write(answer + '\n');
      writeToFile();
    }
  });
}

writeToFile();
