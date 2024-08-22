// create a function that reads a file nd prints its contents
const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.error(`error reading ${path}:\n ${err}`)
            process.exit(1);
        }
        console.log(data);
    })
}

const filePath = process.argv[2]
cat(filePath);
