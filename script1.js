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
var facID;
var n;
var extractfacID; //Change


//-----------------------------------------------------------------------------------------
updateFreshCourses(); //Function to be called when JSON object is received. STATUS:200 @Angad?





function updateFreshCourses(){

console.log("updateFreshCourses() running");

//LET US ASSUME THAT THE FACULTY LIST IS STORED IN A ARRAY  OF DICTIONARY IN javascript
//@Angad JSON store the JSON data into this dictionary array.
//Extract it from the object and store it in dataJSON
counter=0;
dataJSON=[];
dataJSON[0]={"venue":"SJT 305", "courseCode":"CSE2001", "courseTitle":"Introduction To Python", "type":"LAB", "slot":"L33+L36", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[1]={"venue":"SJT 302", "courseCode":"CSE1002", "courseTitle":"Web Development", "type":"TH", "slot":"A2+TA2", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[2]={"venue":"SJT 103", "courseCode":"PHY1999", "courseTitle":"Innovative Projects in Physics", "type":"TH", "slot":"B2", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[3]={"venue":"SJT 103", "courseCode":"CSE1003", "courseTitle":"Learnign OOPS", "type":"LAB", "slot":"L10+L11", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
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



}//End of updateFreshCourses()

//----------------------------------------------------------------------------------------------




var flag=0; // The next is being called 6 times, fixing bug forcefully

$(".fac").click(function() {
    facID=(this.id); // or alert($(this).attr('id'));
    facID= parseInt(facID.substr(3,facID.length));
    updateFrontend (0);
    flag++;

});


//--------------------------------------------------------------------------------------------------------------------------
//Remove courses   -------------------change-------------------------------------------------------------
$(document).on('click', '.close', function(){
    extractfacID=parseInt((this.id).substr(2,(this.id).length));
    $("#row"+extractfacID).remove();
    dataJSON[extractfacID]["slot"]=slotInit[extractfacID];
    facID=extractfacID;
    updateFrontend(1);
});
//-----------------------------------------End-----------------------------------------------------------






/*Function: updateFrontend()
T-> Will be invoked when a subject is clicked
*/


function updateFrontend(flag02){

if(flag02==0) {   // Replaced 2x changes
    facID--;
    slotInit[facID] = dataJSON[facID]["slot"];
    addDataToList(slotInit[facID], dataJSON[facID]["courseCode"], dataJSON[facID]["courseTitle"], dataJSON[facID]["venue"], dataJSON[facID]["faculty"], dataJSON[facID]["c"], facID); //CHANGE IN PARAMETR
}
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
        dataJSON[facID]["slot"] =dataJSON[facID]["slot"].substr(i+1, length); //Store the later part of the slot in slot

        changeSlotColor(slotName[facID], dataJSON[facID]["courseCode"]); //Call function to change color

        if(dataJSON[facID]["slot"].localeCompare("")!=0) // If slot has another part
            extractSlot();
    }

    else {
        slotName[facID]=".";
        slotName[facID] = slotName[facID] + dataJSON[facID]["slot"]; // Copy slot to slotName and call fxn to change color
        changeSlotColor(slotName[facID], dataJSON[facID]["courseCode"]);
        return;

    }
}




function changeSlotColor(s, code) {
    var slotI= s.substr(1, s.length);
    if($(s).hasClass("TH")==true)//Change
    {
        $(".TH").remove();
    }
    $(s).addClass("TH");//Change
    $(s).html(code+"-"+ '<br/>'+slotI);

}

function addDataToList(s,c,t,v,f,cd,id_cell) //Updating selected courses table
{
    var table = document.getElementById("sec_Course");
    var row=table.insertRow(1);
    row.id="row"+id_cell;//change
    var slot=row.insertCell(0);
    var code=row.insertCell(1);
    var title=row.insertCell(2);
    var ven=row.insertCell(3);
    var facl=row.insertCell(4);
    var cred=row.insertCell(5);
    var delt=row.insertCell(6);// CHANGE
    delt.id="id"+id_cell;//change
    var classN="close" ; //change

    slot.innerHTML=s;
    code.innerHTML=c;
    title.innerHTML=t;
    ven.innerHTML=v;
    facl.innerHTML=f;
    cred.innerHTML=cd;
    delt.innerHTML="<b/><i class=\"fas fa-times cross\"/></b/>"; //CHANGE
    $("#"+delt.id).addClass(classN);//CHANGE

}


}//End of updateFrontend()
