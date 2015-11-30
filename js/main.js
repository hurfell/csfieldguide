// Variables
var lists = [{name: "urstapel", values: [123,222,333]},{name: "teststapel", values: [311,122,313]}];

// Program Flow

function initSystem(){
    // Reset all boxes
    deleteAllDivs();

    // create new array with numbers
    createDiv("urstapel","launchPad");
    createDiv("teststapel","launchPad2");
    // Reset the machine?
    alert ("Seite generiert mit " +lists.length + " Elementen.");


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
    ev.target.appendChild(document.getElementById(data));
    alert("Maschine startet... ");
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
    //lists=[];
}

function deleteDiv(toDelete)
{
    document.getElementById(toDelete).remove();
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
    newDiv.setAttribute('ondrop','dropCard(event)')
    numbers = getNumbers(divIdName);
    numbers.forEach(function(entry){
        newDiv.innerHTML += entry + '<br>';
    });
    target.appendChild(newDiv);
    // get numbers

    // add div to list

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


