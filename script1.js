$(document).ready(()=>{

    $("#sb").on("click",(e)=>{
        e.preventDefault();

        $.post("http://redefinedffcs.herokuapp.com/timetable",{CODE:$("#i1").val().toUpperCase()},(data)=>{
            alert(data);

        });


    });

});
updateFreshCourses();
console.log("OKAY");

function updateFreshCourses(){


//LET US ASSUME THAT THE FACULTY LIST IS STORED IN A ARRAY  OF DICTIONARY IN javascript
var counter=0;
var dataJSON=[];
var totalEntries=3; //Hard coded
dataJSON[0]={"venue":"SJT 305", "courseCode":"CSE2001", "courseTitle":"Introduction To Python", "type":"LAB", "slot":"L33+L36+L50+L51+L10+L11", "c":"4", "faculty":"Dr. Rajkumar S"};
var n=dataJSON.length;
var slotInit =[];
var slotName=[];


//------------------------------------------UPDATE TABLE-------------------------------------------//

var data =dataJSON[counter]["slot"]+"|"+dataJSON[counter]["venue"]+"|"+dataJSON[counter]["faculty"]+"|";
if (data.length >=23)
  $("#fac"+(counter+1)).html(data.substr(0,23)+ data.substr(23, data.length));
else {
  $("#fac"+(counter+1)).html(data);
}




/*Function: updateFrontend()
T-> Will be invoked when a subject is clicked
*/



function updateFrontend(){
slotInit[counter]=dataJSON[counter]["slot"];
// var venue="SJT 305";//Hardcoded data to be replaced by JSON
// var courseCode="CSE2001";//Hardcoded data to be replaced by JSON
// var courseTitle="Introduction To Python";//Hardcoded data to be replaced by JSON
// var type="LAB";//Hardcoded data to be replaced by JSON
// var slot="L33+L36+L50+L51+L10+L11"; //Hardcoded data to be replaced by JSON
// var c=4; //Hardcoded data to be replaced by JSON
// var slotInit=slot; //Copying values
// var faculty="Dr. Rajkumar S";//Hardcoded data to be replaced by JSON


console.log(dataJSON[counter]["courseCode"],"TEST2");
addDataToList(slotInit[counter], dataJSON[counter]["courseCode"], dataJSON[counter]["courseTitle"], dataJSON[counter]["venue"], dataJSON[counter]["faculty"] , dataJSON[counter]["c"]);
// console.log(length);

slotName[counter]=".";

extractSlot();

function extractSlot() {
    var flag=0;
    var length=dataJSON[counter]["slot"].length;
    var i=0;
    for(;i<length;i++) //Check if + sign is present which means there are more than 1 slots
        if(dataJSON[counter]["slot"][i]=="+"){
            flag=1; //Flag to 1 if more than 1 slot present
            break;
        }

    if (flag == 1) {
        slotName[counter]=".";
        slotName[counter] =slotName[counter] + dataJSON[counter]["slot"].substr(0, i); //Store the first part of the slot in slotName
        console.log(slotName[counter],"testing 3");
        dataJSON[counter]["slot"] =dataJSON[counter]["slot"].substr(i+1, length); //Store the later part of the slot in slot

        changeSlotColor(slotName[counter], dataJSON[counter]["courseCode"]); //Call function to change color

        if(dataJSON[counter]["slot"].localeCompare("")!=0) // If slot has another part
            extractSlot();
    }

    else {
        console.log("ELSE RUNNING");
        slotName[counter]=".";
        slotName[counter] = slotName[counter] + dataJSON[counter]["slot"]; // Copy slot to slotName and call fxn to change color
        changeSlotColor(slotName[counter], dataJSON[counter]["courseCode"]);
        console.log("LAST CALL");
        return;

    }
}


//Demo data feed
// //type="TH";
// changeSlotColor(".A1", "CSE1003");
// changeSlotColor(".B1", "PHY1999");
// changeSlotColor(".E2", "CHY1701");
// changeSlotColor(".C2", "MAT2002");
//Demo data feed end

// console.log(slotName,"slotName");


function changeSlotColor(s, code) {
  console.log("substr property of undefined", s);
    var slotI= s.substr(1, s.length);
    $(s).addClass(dataJSON[counter]["type"]);
    $(s).html(code+"-"+ '<br/>'+slotI);

}

function addDataToList(s,c,t,v,f,cd) //Updating selected courses table
{
    var table = document.getElementById("sec_Course");
    var row=table.insertRow(1);
    var slot=row.insertCell(0);
    var code=row.insertCell(1);
    var title=row.insertCell(2);
    var ven=row.insertCell(3);
    var facl=row.insertCell(4);
    var cred=row.insertCell(5);
    slot.innerHTML=s;
    code.innerHTML=c;
    title.innerHTML=t;
    ven.innerHTML=v;
    facl.innerHTML=f;
    cred.innerHTML=cd;

}
counter++;

}//End of updateFrontend()
}//ENd of updateFreshCourses()
