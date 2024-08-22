// add function webCat. takes a url using axios and read contet of that url and prints it to the console.
const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.error(`Error reading ${path}:\n ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response.data);
    } catch(err) {
        console.error(`Error fetching ${url}:\n ${err}`)
        process.exit(1); 
    }
}

const input = process.argv[2];
if(input.startsWith('http')) {
    webCat(input);
} else {
    cat(input);
}