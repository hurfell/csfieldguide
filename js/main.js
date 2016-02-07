// Variables
var anzahlStellen = 3;
var maxNumber = 4;
var startNumbers = 10;
var lists = [];
var totalRows = 0;
var startBucket = 1;
var bucketCount;
var sortierschritte;

// Program Flow

function initSystem(){
    startBucket = 1;
    sortierschritte = 0;

    aktualisiereSortierschritte();

    // Reset all boxes
    deleteAllDivs();
    // create new array with numbers
    createStartDiv();
    createMachineConfig();

    createBuckets();
    createBucketController();
    aktualisiereStelle();

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
        //appendRow(maxNumber);
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
        var actualBucket = getStartBucket();
        var erster = true;
        console.log(sortedArray);
        sortedArray.forEach(function (entry) {
            if(!erster)
            {
                if (entry.length >= 1) {
                    var destination = 'bucket'+actualBucket;
                    var resultId = 'result'+destination;
                    // If resultbucket exists, merge the two results
                    if(document.getElementById(resultId)  !== null)
                    {
                        console.log('Merge notwendig');
                        var array1 = entry;
                        var array2 = getNumbers(resultId);
                        array2 = array2.concat(array1);
                        console.log(array2);
                        removeFromLists(resultId);
                        addToLists(resultId, array2);
                        deleteDiv(resultId);
                        createDiv(resultId, destination);
                    }
                    else
                    {
                        //console.log("EntryCount: "+entryCount+ "Values: "+entry);
                        addToLists(resultId, entry);
                        createResultDivs(entry, destination,actualBucket);
                    }
                }
                actualBucket++;
            }
            erster = false;
        });
        sortierschritte ++;
        aktualisiereSortierschritte();
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

function aktualisiereSortierschritte()
{
    document.getElementById("sortierschritte").innerHTML = "Anzahl der Sortierschritte: " + sortierschritte;
}
function getStartBucket() {
    return startBucket;
}

function setStartBucket(start){
    startBucket = start;
}

function dropCard(ev) {
    ev.preventDefault();

    // important variables:
    var droppedDiv = ev.dataTransfer.getData("text");
    var theTarget = ev.target.id;
    console.log(lists);
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
function createResultDivs(array, parent, bucketnumber) {
    console.log(parent);
    var target = document.getElementById(parent);

    var newDiv = document.createElement('div');
    var divIdName = 'result'+parent;
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
    newDiv.setAttribute('class', 'stapel');
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

function createMachineConfig() {
    var target = document.getElementById("machineConfig");

    if (document.getElementById("stelle_name"))
        document.getElementById("stelle_name").remove();
    var stellename = "<p id='stelle_name'> Nach welcher Stelle soll sortiert werden?</p>";
    target.innerHTML = target.innerHTML + stellename;
    if (document.getElementById("stelle"))
        document.getElementById("stelle").remove();


    var newDiv = document.createElement('input');
    var divIdName = 'stelle';
    newDiv.setAttribute('id', divIdName);
    newDiv.setAttribute('type', 'number');
    newDiv.setAttribute('name', 'whatNumber');
    newDiv.setAttribute('min', '1');
    newDiv.setAttribute('max', "" + anzahlStellen);
    newDiv.setAttribute('value', "1");
    newDiv.setAttribute('onchange', "aktualisiereStelle()");
    target.appendChild(newDiv);

}

function createBuckets(){
    // Bucket Count
    bucketCount = $("#numberofbuckets" ).val();
    var target = document.getElementById("resultcontainer");
    var actualRow=1;
    var appendant = "";

    // Initialize (empty) Results Container:
    target.innerHTML = "";
    // Create bucketCount Buckets, max 4 at a row...
    for (var i=0;i<bucketCount;i++){
        // Row..
        if(i%4 == 0)
        {
            // New row
            console.log("New Row...");
            target.innerHTML = target.innerHTML + "<div id='resultrow"+ actualRow +"' class='row resultrow bottom-buffer'></div>";
            appendant = document.getElementById("resultrow"+actualRow);
            actualRow ++;
        }
        appendant.innerHTML = appendant.innerHTML + "<div class='col-md-1'></div>";
        if(i<4){
            appendant.innerHTML = appendant.innerHTML + "<div id='bucket"+(i+1)+"' class='col-md-1 bucket activebucket'>Bucket "+ (i+1) +"</div>"
        }
        else
        {
            appendant.innerHTML = appendant.innerHTML + "<div id='bucket"+(i+1)+"' class='col-md-1 bucket'>Bucket "+ (i+1) +"</div>";
        }


    }
}

function createBucketController(){
    var target = document.getElementById("bucketcontroller");
    if (document.getElementById("bucketcontrolmenu"))
        document.getElementById("bucketcontrolmenu").remove();
    var stellename = "<div id='bucketcontrolmenu' class='row'></div>";
    target.innerHTML += stellename;

    var leftcontrol = "<div class='col-md-3'><button onclick='bucketControlLeft()'>&lt;</button></div>";
    var controltext="<div id='controltext' class='col-md-6'>Ergebnis in Buckets 1 bis 4</div>";
    var rightcontrol = "<div class='col-md-3 text-right'><button onclick='bucketControlRight()'>&gt;</button></div>";
    target = document.getElementById("bucketcontrolmenu");
    target.innerHTML += leftcontrol + controltext + rightcontrol;


}

function bucketControlLeft(){
    if(startBucket > 1) {
        var min = startBucket - 1;
        var max = startBucket + maxNumber - 1;
        // Text neu setzen
        var neuerText = "Ergebnis in Buckets " + min + " bis " + max;
        document.getElementById("controltext").innerHTML = neuerText;
        // Umfärben der Buckets
        // 1. Bucket grau machen und letztes + 1 blau
        document.getElementById("bucket" + max).className = "";
        document.getElementById("bucket" + max).className = "col-md-1 bucket";

        document.getElementById("bucket" + min).className = "";
        document.getElementById("bucket" + min).className = "col-md-1 bucket activebucket";
        startBucket--;
    }
    else
    {
        alert("Es geht nicht nach links...");
    }

}

function bucketControlRight(){
    if((startBucket + maxNumber)-1 < bucketCount)
    {
        var min = startBucket + 1;
        var max = startBucket + maxNumber;
        // Text neu setzen
        var neuerText = "Ergebnis in Buckets "+ min +  " bis " + max;
        document.getElementById("controltext").innerHTML = neuerText;
        // Umfärben der Buckets
        // 1. Bucket grau machen und letztes + 1 blau
        document.getElementById("bucket"+startBucket).className = "";
        document.getElementById("bucket"+startBucket).className = "col-md-1 bucket";

        document.getElementById("bucket"+max).className = "";
        document.getElementById("bucket"+max).className = "col-md-1 bucket activebucket";



        startBucket ++;
    }
    else
    {
        alert("Es geht nicht nach rechts...");
    }
}

function aktualisiereStelle()
{
    // String bauen:
    var ausgabe = "";
    var welcheStelle = $("#stelle" ).val();

    for (var i=1; i<=anzahlStellen; i++){
        if(i == welcheStelle)
            ausgabe += 'X ';
        else
            ausgabe += 'O ';
    }
    document.getElementById("anzeigeStelle").innerHTML = ausgabe;
}

