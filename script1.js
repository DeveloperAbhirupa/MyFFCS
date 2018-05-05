function access() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "http://redefinedffcs.herokuapp.com/nosignup/timetable", true);
    console.log(xhttp);
    console.log("Test1");
    xhttp.send();
}


var venue;//Hardcoded data to be replaced by JSON
var courseCode;//Hardcoded data to be replaced by JSON
var courseTitle;//Hardcoded data to be replaced by JSON
var type="LAB";//Hardcoded data to be replaced by JSON
var slot="L33+L36+L50+L51+L10+L11"; //Hardcoded data to be replaced by JSON
var faculty;//Hardcoded data to be replaced by JSON
var slotName=".";

// console.log(length);


extractSlot();

function extractSlot() {
    var flag=0;
    var length=slot.length;
    var i=0;
    for(;i<length;i++) //Check if + sign is present which means there are more than 1 slots
        if(slot[i]=="+"){
            flag=1; //Flag to 1 if more than 1 slot present
            break;
        }
    if (flag == 1) {
        slotName=".";
        slotName =slotName + slot.substr(0, i); //Store the first part of the slot in slotName
        slot =slot.substr(i+1, length); //Store the later part of the slot in slot
        console.log("slot", slotName);
        changeSlotColor(slotName); //Call function to change color
        if(slot.localeCompare("")!=0) // If slot has another part
            extractSlot();
    }

    else {
        slotName=".";
        slotName = slotName + slot; // Copy slot to slotName and call fxn to change color
        changeSlotColor(slotName);
        console.log("slot", slotName);
    }
}
type="TH";
changeSlotColor(".A1");
changeSlotColor(".B1");
changeSlotColor(".E2");
changeSlotColor(".C2");
// console.log(slotName,"slotName");
function changeSlotColor(s) {
    $(s).addClass(type);
}

changeSlotColor();


