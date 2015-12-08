// Variables
var stapelName = "result";
var anzahlStellen = 3;
var maxNumber = 4;
var startNumbers = 5;
var lists = [];
var totalRows = 0;

// Program Flow

function initSystem(){
    // Reset all boxes
    deleteAllDivs();
    // create new array with numbers
    createStartDiv();
    createMachineConfig();
    console.log("Seite generiert mit " + lists.length + " Elementen.");
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(ev.target.id);
    if (ev.target.id == "theMachine") {
        alert("Maschine startet... ");
        ev.target.appendChild(document.getElementById(data));
        // Append new Row to Result in Frontend:
        appendRow(maxNumber);
        // Start sorting
        var sortedArray = [];
        var numbers = getNumbers(data);
        // Initialize Array
        for (var i = 0; i <= maxNumber; i++) {
            sortedArray.push([]);
        }
        for ( var i = 0; i < numbers.length; i++) {
            var stapel = numbers[i].toString().charAt(stelle.value - 1);
            //console.log("Stapel: "+ stapel);
            sortedArray[parseInt(stapel)].push(numbers[i]);
            //console.log(sortedArray);
        }
        // Delete pushed Entry from List
        removeFromLists(data);
        deleteDiv(data);
        // Create List Entries
        var entryCount = totalRows - 10;
        sortedArray.forEach(function (entry) {
            if (entry.length >= 1) {
                //console.log("EntryCount: "+entryCount+ "Values: "+entry);
                addToLists(stapelName + entryCount, entry);
                createResultDivs(entryCount, entry, 'resultField' + entryCount);
            }
            entryCount++;
        });
        console.log(lists);

    }
    else {
        alert("Mergevorgang gestartet... ");
        // We have two divs to merge
        unteresDiv = ev.target.id;
        oberesDiv = ev.dataTransfer.getData("text");
        // start merging

    }


}

//position  1 entspricht resultFiel1, etc
function createResultDivs(position, array, parent) {
    var target = document.getElementById(parent);
    var newDiv = document.createElement('div');
    var divIdName = "result"+position;
    newDiv.setAttribute('id', divIdName);
    newDiv.setAttribute('class', 'resultCard');
    newDiv.setAttribute('draggable', 'true');
    newDiv.setAttribute('ondragstart', 'drag(event)');
    newDiv.setAttribute('ondragover', 'allowDrop(event)');
    newDiv.setAttribute('ondrop', 'dropCard(event)');
    array.forEach(function (entry) {
        newDiv.innerHTML += entry + '<br>';
    });
    target.appendChild(newDiv);
}

function appendRow(numberOfCols) {
    // How many Bootstrap Cols per Column?
    var target = document.getElementById("results");
    var bootstrapCols = 12 / numberOfCols;
    var outerDiv = document.createElement('div');
    outerDiv.setAttribute('class', 'row');
    for (var i = totalRows; i < totalRows + numberOfCols; i++) {
        var innerDiv = document.createElement('div');
        innerDiv.setAttribute('class', 'col-md-' + bootstrapCols + ' resultcolumn');
        innerDiv.setAttribute('id', 'resultField' + (i + 1));
        outerDiv.appendChild(innerDiv);
    }
    target.appendChild(outerDiv);
    totalRows += 10;

}


// Manage Lists
function deleteAllDivs()
{
    lists.forEach(function(entry)
    {
        console.log(entry);
        // delete div
        deleteDiv(entry.name);

    });
    // Delete list
    lists = [];
}

function deleteDiv(toDelete)
{
    document.getElementById(toDelete).remove();
}
function createStartDiv() {
    var target = document.getElementById("launchPad");
    var newDiv = document.createElement('div');
    var divIdName = "urstapel";
    newDiv.setAttribute('id', divIdName);
    newDiv.setAttribute('draggable', 'true');
    newDiv.setAttribute('ondragstart', 'drag(event)');
    newDiv.setAttribute('ondragover', 'allowDrop(event)');
    newDiv.setAttribute('ondrop', 'dropCard(event)');
    var newNumbers = generateNumbers(startNumbers, anzahlStellen, maxNumber);
    newNumbers.forEach(function (entry) {
        newDiv.innerHTML += entry + '<br>';
    });
    target.appendChild(newDiv);

    // add the new Array to List
    addToLists(divIdName, newNumbers);

}
function createDiv(divId, targetId)
{
    var target = document.getElementById(targetId);
    var newDiv = document.createElement('div');
    var divIdName = divId;
    newDiv.setAttribute('id',divIdName);
    newDiv.setAttribute('draggable','true');
    newDiv.setAttribute('ondragstart','drag(event)');
    newDiv.setAttribute('ondragover','allowDrop(event)');
    newDiv.setAttribute('ondrop', 'dropCard(event)');
    numbers = getNumbers(divIdName);
    numbers.forEach(function(entry){
        newDiv.innerHTML += entry + '<br>';
    });
    target.appendChild(newDiv);
    // get numbers

    // add div to list

}

function addToLists(divName, numberArray) {
    // ToDo: check if divName already is in List
    lists.push({name: divName, values: numberArray});
    //console.log(lists);
}

function removeFromLists(divName) {
    lists = lists.filter(function (el) {
        return el.name !== divName;
    });
}

function getNumbers(targetId)
{
    listElement = findElement(lists, 'name',targetId);
    console.log("targetID: " + targetId + " listElement: " + listElement);
    return listElement.values;
}

function findElement(arr, propName, propValue) {
    for (var i=0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
            return arr[i];

    // will return undefined if not found; you could return a default instead
}

function replaceElement(arr, propName, propValue, newValue) {
    for (var i=0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
           arr[i].values = newValue;

    // will return undefined if not found; you could return a default instead
}


function dropCard(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    merge(ev.target,data);
    alert("Karte gedropt von "+data+ " auf " + ev.target.id);
}

function merge(unten,oben) {
    var hilf = findElement(lists, 'name',unten.id).values.concat(findElement(lists, 'name',oben).values);
    replaceElement(lists, 'name', unten.id, hilf);
    alert(findElement(lists, 'name',unten.id).values);
}

function generateNumbers(anzahl, stellen, max) {
    // return array
    var zufallsArray = [];
    var i, j, zahl;

    for (i = 0; i < anzahl; i++) {
        zahl = "";
        for (j = 0; j < stellen; j++) {
            zahl += rand(1, max);
        }
        zufallsArray.push(zahl);
    }
    console.log(zufallsArray);
    return zufallsArray


}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMachineConfig() {
    if (document.getElementById("stelle"))
        document.getElementById("stelle").remove();
    var target = document.getElementById("machineConfig");
    var newDiv = document.createElement('input');
    var divIdName = 'stelle';
    newDiv.setAttribute('id', divIdName);
    newDiv.setAttribute('type', 'number');
    newDiv.setAttribute('name', 'whatNumber');
    newDiv.setAttribute('min', '1');
    newDiv.setAttribute('max', "" + anzahlStellen);
    newDiv.setAttribute('value', "1");
    target.appendChild(newDiv);

}


