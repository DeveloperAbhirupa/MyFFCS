$(document).ready(()=>{

    $("#sb").on("click",(e)=>{
        e.preventDefault();

        $.post("http://redefinedffcs.herokuapp.com/timetable",{CODE:$("#i1").val().toUpperCase()},(data)=>{
            alert(data);

        });


    });


});


//--------------------------------------------GLOBAL VARIABLES---------------------------
var slotInit =[];
var slotName=[];
var counter=0;
var dataJSON=[];
var n;
//-----------------------------------------------------------------------------------------
updateFreshCourses(); //Function to be called when JSON object is received. STATUS:200 @Angad?





function updateFreshCourses(){

console.log("updateFreshCourses() running");

//LET US ASSUME THAT THE FACULTY LIST IS STORED IN A ARRAY  OF DICTIONARY IN javascript
counter=0;
dataJSON=[];
dataJSON[0]={"venue":"SJT 305", "courseCode":"CSE2001", "courseTitle":"Introduction To Python", "type":"LAB", "slot":"L33+L36+L50+L51+L10+L11", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[1]={"venue":"SJT 302", "courseCode":"CSE1002", "courseTitle":"Introduction To Python", "type":"LAB", "slot":"A2+TA2", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[2]={"venue":"SJT 103", "courseCode":"PHY1999", "courseTitle":"Introduction To Python", "type":"LAB", "slot":"B2", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
n=dataJSON.length;
slotInit =[];
slotName=[];
//------------------------------------------UPDATE TABLE-------------------------------------------//

for(var l =0; l<n ;l++){  //Loop to update table
  var data =dataJSON[l]["slot"]+"|"+dataJSON[l]["venue"]+"|"+dataJSON[l]["faculty"]+"|";
  if (data.length >=23)
      $("#fac"+(l+1)).html(data.substr(0,23)+ data.substr(23, data.length)+'<hr/>');
  else
      $("#fac"+(l+1)).html(data+'<hr/>');
}//Table updated with course options


console.log("CHECK");

}//End of updateFreshCourses()
console.log(dataJSON[counter]["slot"],"Testing 02");



/*Function: updateFrontend()
T-> Will be invoked when a subject is clicked
*/

var facID;
$("div").click(function() {
    facID=(this.id); // or alert($(this).attr('id'));
    
});



function updateFrontend(){
  console.log("WORKING 01");
slotInit[facID]=dataJSON[facID]["slot"];


console.log(dataJSON[facID]["courseCode"],"TEST2");
addDataToList(slotInit[facID], dataJSON[facID]["courseCode"], dataJSON[facID]["courseTitle"], dataJSON[facID]["venue"], dataJSON[facID]["faculty"] , dataJSON[facID]["c"]);
// console.log(length);

slotName[facID]=".";

extractSlot();

function extractSlot() {
    var flag=0;
    var length=dataJSON[facID]["slot"].length;
    var i=0;
    for(;i<length;i++) //Check if + sign is present which means there are more than 1 slots
        if(dataJSON[facID]["slot"][i]=="+"){
            flag=1; //Flag to 1 if more than 1 slot present
            break;
        }

    if (flag == 1) {
        slotName[facID]=".";
        slotName[facID] =slotName[facID] + dataJSON[facID]["slot"].substr(0, i); //Store the first part of the slot in slotName
        console.log(slotName[facID],"testing 3");
        dataJSON[facID]["slot"] =dataJSON[facID]["slot"].substr(i+1, length); //Store the later part of the slot in slot

        changeSlotColor(slotName[facID], dataJSON[facID]["courseCode"]); //Call function to change color

        if(dataJSON[fcaID]["slot"].localeCompare("")!=0) // If slot has another part
            extractSlot();
    }

    else {
        console.log("ELSE RUNNING");
        slotName[facID]=".";
        slotName[facID] = slotName[facID] + dataJSON[facID]["slot"]; // Copy slot to slotName and call fxn to change color
        changeSlotColor(slotName[facID], dataJSON[facID]["courseCode"]);
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


}//End of updateFrontend()
