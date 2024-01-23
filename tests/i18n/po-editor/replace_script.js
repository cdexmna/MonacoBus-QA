const fs = require('fs');

// Load both JSON files
const englishJson = JSON.parse(fs.readFileSync('Ticketing-Admin_English.json', 'utf8'));
const cpJson = JSON.parse(fs.readFileSync('../en-CP.json', 'utf8'));

// Function to recursively remove keys
function removeKeys(obj, keysToRemove) {
    if (typeof obj !== 'object' || obj === null) return obj;

    for (let key in obj) {
        if (keysToRemove.includes(obj[key])) {
            delete obj[key];
        } else if (typeof obj[key] === 'object') {
            removeKeys(obj[key], keysToRemove);
        }
    }

    return obj;
}

// Function to extract all values from an object recursively
function extractValues(obj) {
    let values = [];

    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            values = values.concat(extractValues(obj[key]));
        } else {
            values.push(obj[key]);
        }
    }

    return values;
}

// Get all values from the cpJson
const cpValues = extractValues(cpJson);

// Remove keys from englishJson that have the same values in cpJson
const updatedEnglishJson = removeKeys(englishJson, cpValues);

// Write the result back to the file
fs.writeFileSync('Ticketing-Admin_English.json', JSON.stringify(updatedEnglishJson, null, 4));