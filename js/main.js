// Variables
var stapelName = "result";
var anzahlStellen = 3;
var maxNumber = 4;
var startNumbers = 5;
var lists = [];
var totalRows = 0;
var resultFieldCount = 0;

// Program Flow

function initSystem(){
    // Reset all boxes
    deleteAllDivs();
    // create new array with numbers
    createStartDiv();
    createMachineConfig();
    createResultRow();
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
        /*
        alert("Mergevorgang gestartet... ");
        // We have two divs to merge
        unteresDiv = ev.target.id;
        oberesDiv = ev.dataTransfer.getData("text");
         // start merging*/

    }


}

function dropCard(ev) {
    ev.preventDefault();

    // important variables:
    var droppedDiv = ev.dataTransfer.getData("text");
    var theTarget = ev.target.id;
    var targetField = document.getElementById(theTarget).parentElement.id;
    if (droppedDiv != theTarget) {
        // lists aktualisieren
        var array1 = getNumbers(droppedDiv);
        var array2 = getNumbers(theTarget);
        array2 = array2.concat(array1);
        removeFromLists(droppedDiv);
        removeFromLists(theTarget);
        addToLists(theTarget, array2);
        // beide divs löschen
        deleteDiv(droppedDiv);
        deleteDiv(theTarget);

        // neues div zeichnen (wohin?)
        createDiv(theTarget, targetField);
    }

}

//position  1 entspricht resultField1, etc
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
    newDiv.setAttribute('class', 'resultCard');
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

function createResultRow() {
    // creates one new Row of results
    var results = maxNumber;
    // set the ResultFieldCount
    // row Numbers = 

}

function createMachineConfig() {
    if (document.getElementById("stelle"))
        document.getElementById("stelle").remove();
    var target = document.getElementById("stelleZumSortieren");
    var newDiv = document.createElement('input');
    var divIdName = 'stelle';
    newDiv.setAttribute('id', divIdName);
    newDiv.setAttribute('type', 'number');
    newDiv.setAttribute('name', 'whatNumber');
    newDiv.setAttribute('min', '1');
    newDiv.setAttribute('max', "" + anzahlStellen);
    newDiv.setAttribute('value', "1");
    target.appendChild(newDiv);
    /*
     if (document.getElementById("feldzahl"))
     document.getElementById("feldzahl").remove();
    var newDiv2 = document.createElement('input');
    var divIdName2 = 'feldzahl';
    newDiv2.setAttribute('id', divIdName2);
    newDiv2.setAttribute('type', 'number');
    newDiv2.setAttribute('name', 'whatNumber');
    newDiv2.setAttribute('min', '4');
    newDiv2.setAttribute('max', '16');
    newDiv2.setAttribute('value', "4");
     target.appendChild(newDiv2);*/
    /*
    var newDiv3 = document.createElement('div');
    var newButton = document.createElement('button');
    newButton.setAttribute('style',"width:200px;height:20px");
    //HIER FEHLT NOCH DER NAMEN FÜR DEN BUTTON DER DIE FELDER ERZEUGT
    newDiv3.appendChild(newButton);
     target.appendChild(newDiv3);*/

}


