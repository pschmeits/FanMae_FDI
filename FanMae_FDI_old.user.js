// ==UserScript==
// @name         FanMae_FDI
// @version      1.0
// @description  Tampermonkey script for importing CSV to Fannie Mae Syndicator Dashboard. (FDI - Fund Data Importer)
// @author       Parker "bye0n" Schmeits
// @match        https://home.fanniemae.com/HCD/SyndicatorDashboard/*
// ==/UserScript==

(function () {
	'use strict';
    filterInputFields();
    importCSV();
})();

function CSVToArray(data) {
    let count = 0;
	let array = data.split("\n");
    array.forEach( function(element) {
        array[count] = element.split(",");
        count++;
    })
	return array;
}

function filterInputFields() {
    var inputs = document.getElementsByTagName('input');
    var result = [];
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type.toLowerCase() == 'text') {
            result.push(inputs[i]);
        }
    }
    return result;
}

function importCSV() {
    var input = document.createElement("input");
    input.type = "file";
    Object.assign(input.style, {
        display: "block",
        position: "relative",
        "z-index": 10000
    });
    input.addEventListener("input", function (event) {
        var importedFiles = event.target;
        var reader = new FileReader();
        reader.readAsText(importedFiles.files[0]);
        reader.onload = function () {
            var csvArray = CSVToArray(reader.result);
            populateData(csvArray);
        };
    });
    document.body.prepend(input);
}

function populateData(data) {
    let count = 0;
    if (Array.isArray(data) && data.length > 0) {
        data.forEach( function(arr) {
            if (Array.isArray(arr) && arr.length > 0) {
                arr.forEach( function(element) {
                    filterInputFields()[count].value = element;
                    count++;
                });
            }
        })
    }
}
