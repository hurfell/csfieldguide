// Variables
var anzahlStellen = 3;
var maxNumber = 4;
var startNumbers = 5;
var lists = [];

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
        // Start sorting
        console.log(data)
        var numbers = getNumbers(data);
        console.log(numbers);
        var numbers1 = [];
        var numbers2 = [];
        var numbers3 = [];
        var numbers4 = [];
        console.log(numbers[1].toString().charAt(stelle.value-1));
        for ( var i = 0; i < numbers.byteLength; i++) {
            //HIER MACHT ER NOCH ALLES FALSCH
            if(numbers[i].toString().charAt(stelle.value-1)=='1') {
                console.log("...");
                numbers1.add(number[i]);
            } else if(numbers[i].toString().charAt(stelle.value-1)=="2") {
                numbers2.add(number[i]);
            } else if(numbers[i].toString().charAt(stelle.value-1)=="3") {
                numbers3.add(number[i]);
            } else if(numbers[i].toString().charAt(stelle.value-1)=="4") {
                numbers4.add(number[i]);
            }
        }
        console.log(numbers1);
        console.log(numbers2);
        console.log(numbers3);
        console.log(numbers4);

        // remove urstapel from machine when ready

        // display all new "buckets"
    }
    else {
        alert("Mergevorgang gestartet... ");
        // We have two divs to merge
        unteresDiv = ev.target.id;
        oberesDiv = ev.dataTransfer.getData("text");
        // start merging

    }


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
    console.log(lists);
}

function getNumbers(targetId)
{
    listElement = findElement(lists, 'name',targetId);
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


