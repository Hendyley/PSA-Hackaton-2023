const fs = require('fs');
const path = require('path');

outputjson = {};

function readoutput(callback){
   
    // Specify the path to your JSON file
    const OutputPth = path.join(__dirname, 'Result', 'output.json');

    // Read the JSON file
    fs.readFile(OutputPth, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
            callback(err, null); // Pass an error to the callback
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            outputjson = jsonData;
            //console.log('JSON data:', outputjson);
            callback(null, outputjson); // Pass the JSON data to the callback
                      
        } catch (err) {
            //console.error('Error parsing JSON:', err);
            callback(err, null); // Pass an error to the callback
        }
        
    });
    
}



module.exports = {
    readoutput
};