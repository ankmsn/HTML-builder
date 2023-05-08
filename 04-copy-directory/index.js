const fs = require ('fs');
const path = require ('path');

const dirCopy = path.join(__dirname, 'files-copy');
const dirOriginal = path.join(__dirname, 'files')

fs.rm(dirCopy, { recursive: true, force: true }, (err) => {
    if (err) throw err;
    
    fs.mkdir(dirCopy, { recursive: true }, (err) => {
        if (err) throw err;

        fs.readdir(dirOriginal, (err, files) => {
            for (let file of files) {
                const fileOriginal = path.join(__dirname, 'files', file);
                const fileCopy = path.join(__dirname, 'files-copy', file)

                fs.copyFile(fileOriginal, fileCopy, (err) => {
                    if (err) throw err;
                });
            }
        });
    });
});
