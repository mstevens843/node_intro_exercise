// add function webCat. takes a url using axios and read contet of that url and prints it to the console.
const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, writeToFile) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.error(`Error reading ${path}:\n ${err}`);
            process.exit(1);
        }
        handleOutput(data, writeToFile);
    });
}

async function webCat(url, writeToFile) {
    try {
        let response = await axios.get(url);
        handleOutput(response.data, writeToFile);
    } catch(err) {
        console.error(`Error fetching ${url}:\n ${err}`)
        process.exit(1); 
    }
}

// added code here
function handleOutput(content, writeToFile) {
    if(writeToFile) {
        fs.writeFile(writeToFile, content, 'utf-8', (err) => {
            if(err) {
                console.error(`Couldn't write to ${writeToFile}:\n ${err}`)
                process.exit(1);
            }
        })
    } else {
        console.log(content)
    }
}

const args = process.argv; 
let writeToFile = null; 
let input;

if(args[2] === '--out') {
    writeToFile = args[3];
    input = args[4];
} else {
    input = args[2]; 
}

if(input.startsWith('http')) {
    webCat(input, writeToFile);
} else {
    cat(input, writeToFile);
}