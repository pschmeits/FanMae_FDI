// ==UserScript==
// @name         FanMae_FDI
// @version      1.0
// @description  Tampermonkey script for importing CSV to Fannie Mae Syndicator Dashboard. (FDI - Fund Data Importer)
// @author       Parker "bye0n" Schmeits (Modifications and Adaptations) and Konrad "Tree" Słotwiński (CSVImporter)
// @match        https://home.fanniemae.com/HCD/SyndicatorDashboard/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

const CSVI_STORE = "csvi_store";

const CSVI_EVENT_IMPORT = "csvi_import";
const CSVI_EVENT_RECORD = "csvi_record";
const INPUTS = "inputs";
var count = 0;

document.addEventListener(CSVI_EVENT_IMPORT, function (e) {
    //Custom event after CSV import
	//alert("Import");
    // window.location.replace("https://www.google.com/");
});

document.addEventListener(CSVI_EVENT_RECORD, function (e) {
    // Custom event on record import
	// alert(`CSVI Importing: (${e.detail.store}) ${e.detail.record}`);
    /* GM_getValue(CSVI_STORE).forEach(function(element) {
        console.log(element);
    });
    */
    e.detail.record.forEach(function(element) {
        filterInputFields()[count].value = element;
        count++;
    });
    //console.log(GM_getValue(CSVI_STORE));
    //console.log(GM_getValue(TABLE_DATA));
	// window.location.replace("https://www.google.com/");
});

(function () {
	'use strict';
    filterInputFields();
    loadCSV();
})();

function CSVToArray(data, delimiter = ",") {
	let objPattern = new RegExp(`(\\${delimiter}|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\"\\${delimiter}\\r\\n]*))`, "gi");
	let array = [
		[]
	];
	let arrMatches = null;
	while (arrMatches = objPattern.exec(data)) {
		let strMatchedDelimiter = arrMatches[1];
		let strMatchedValue;
		if (strMatchedDelimiter.length && strMatchedDelimiter !== delimiter) {
			array.push([]);
		}
		if (arrMatches[2]) {
			strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
		} else {
			strMatchedValue = arrMatches[3];
		}
		array[array.length - 1].push(strMatchedValue);
	}
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

function loadCSV() {
    let input = document.createElement("input");
    input.type = "file";
    Object.assign(input.style, {
        display: "block",
        position: "relative",
        "z-index": 10000
    });
    input.addEventListener("input", function (value) {
        let reader = new FileReader();
        reader.readAsText(value.target.files[0]);
        reader.onload = function () {
            GM_setValue(CSVI_STORE, CSVToArray(reader.result));
            document.dispatchEvent(new Event(CSVI_EVENT_IMPORT))
            populateData();
        };
    });
    document.body.prepend(input);
}

function populateData() {
    const data = GM_getValue(CSVI_STORE);
    if (Array.isArray(data) && data.length > 0) {
        while (Array.isArray(data) && data.length) {
            document.dispatchEvent(new CustomEvent(CSVI_EVENT_RECORD, {
                detail: {store: data.length, record: data.shift()}
            }));
            GM_setValue(CSVI_STORE, data);
        }
    }
}