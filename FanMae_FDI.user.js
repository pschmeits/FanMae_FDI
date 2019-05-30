// ==UserScript==
// @name         FanMae_FDI
// @version      1.0
// @description  Tampermonkey script for importing CSV to Fannie Mae Syndicator Dashboard. (FDI - Fund Data Importer)
// @author       Parker "bye0n" Schmeits
// @match        https://home.fanniemae.com/HCD/SyndicatorDashboard/*
// ==/UserScript==

(function () {
	'use strict';
    main();
})();

function CSVToArray(data) { // Converts the text provided in the data argument into an array of arrays (Array of Lines w/ Lines = Array of Values)
    let count = 0; // Counter to ensure that the proper string is replaced with its respective conversion to an array.
    let lines = data.split("\n"); // Seperates the CSV into an array of the lines within the file.
    lines.forEach( function(line) {
        lines[count] = line.split(","); // Seperates each line into its individual data members.
        count++; // Increases count to convert each line in the array into an array of data members.
    })
	return lines;
}

function filterInputFields() {
    var inputs = document.getElementsByTagName('input'); // Identifies and creates an array of the "input" elements on the page.
    var result = [];
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type.toLowerCase() == 'text') { // Verifies whether or not the "input" elements on the page are "text" inputs or not.
            result.push(inputs[i]); // If the "input" elements are "text" inputs then it adds them to an array that the function returns.
        }
    }
    return result;
}

function main() { // Imports CSV and populates "text" inputs on the page with the sequentially corresponding data from the imported CSV.
    var input = document.createElement("input"); // Creates an input element through which users can upload CSVs.
    input.type = "file"; // Sets input element type to "file".
    Object.assign(input.style, { // Stylization of the input element for CSVs.
        display: "block",
        position: "relative",
        "z-index": 10000
    });
    input.addEventListener("input", function (event) {
        var importedFiles = event.target; // Sets a variable for the imported files from the input element.
        var reader = new FileReader(); // Creates an object to interpret the imported files.
        reader.readAsText(importedFiles.files[0]); // Interprets the first argument from the imported files as text. (Only the first imported file will be processed)
        reader.onload = function () { // After the reader has loaded/interpretted the file this runs
            var csvArray = CSVToArray(reader.result); // Converts imported CSV into an array of arrays to but used by the program.
            populateInputs(csvArray); // Populates the "text" inputs on the page with the sequentially corresponding data from the CSV.
        };
    });
    document.body.prepend(input); // Adds/Places the input element through which users can upload CSVs at the top of the page, above the body.
}

function populateInputs(data) { // Populates the "text" inputs on the page with the sequentially corresponding data from the argument of the function.
    let count = 0; // Counter to ensure that data is placed in the corresponding input.
    if (Array.isArray(data) && data.length > 0) { // Ensures that the argument is an array of elements before iteration.
        data.forEach( function(line) { // Iterates through the external array and executes the following function for each element.
            if (Array.isArray(line) && line.length > 0) { // Ensures that the argument is an array of elements before iteration.
                line.forEach( function(val) { // Iterates through the internal array and executes the following function for each element.
                    filterInputFields()[count].value = val; // Sets the value of the corresponding input field with the value found in the internal array.
                    count++; // Increases count to ensure that the next sequential input is set to the next sequential value.
                });
            }
        })
    }
}