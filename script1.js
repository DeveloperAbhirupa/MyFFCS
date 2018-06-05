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
var state = "L";

//-----------------------------------------------------------------------------------------
updateFreshCourses(); //Function to be called when JSON object is received. STATUS:200 @Angad?





function updateFreshCourses(){

console.log("updateFreshCourses() running");

//LET US ASSUME THAT THE FACULTY LIST IS STORED IN A ARRAY  OF DICTIONARY IN javascript
//@Angad JSON store the JSON data into this dictionary array.
//Extract it from the object and store it in dataJSON
counter=0;
dataJSON=[];
dataJSON[0]={"venue":"TT 305", "courseCode":"CSE2001", "courseTitle":"Introduction To Python", "type":"ELA", "slot":"L33+L36", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[1]={"venue":"SJT 302", "courseCode":"CSE1002", "courseTitle":"Web Development", "type":"ETH", "slot":"A2+TA2", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[2]={"venue":"SJT 103", "courseCode":"PHY1999", "courseTitle":"Innovative Projects in Physics", "type":"ETH", "slot":"B2", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[3]={"venue":"SJT 103", "courseCode":"CSE1003", "courseTitle":"Learnign OOPS", "type":"ELA", "slot":"L10+L11", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
n=dataJSON.length;


slotInit =[];
slotName=[];
//------------------------------------------UPDATE TABLE-------------------------------------------//

    console.log("Filling tables");  //Superman
    var count0=0;
for(var l =0; l<n ;l++){  //Loop to update table
    // console.log("Substring extracted",(dataJSON[l]["type"][1])," and state value", state);//superman
    // console.log("Comparison result:", (dataJSON[l]["type"][1].localeCompare(state) == 0));//superman
    if((dataJSON[l]["type"][1].localeCompare(state) == 0)) //Superman
    {
        var data = dataJSON[l]["slot"] + "|" + dataJSON[l]["venue"] + "|" + dataJSON[l]["faculty"] + "|";
        if (data.length >= 23)
            $("#fac" + (count0 + 1)).html(data.substr(0, 23) + data.substr(23, data.length) + '<hr/>');
        else
            $("#fac" + (count0 + 1)).html(data + '<hr/>');
        count0 = count0 +1;
    }
}//Table updated with course options



}//End of updateFreshCourses()

//----------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------- Baker


var temp="0";
var temp2="#0";
$(".slotLabel").on("click", function(){
    var innerHTMLElement= (this.id).toUpperCase();
    innerHTMLElement = innerHTMLElement.substr(1, innerHTMLElement.length);
    innerHTMLElement = "." + innerHTMLElement; //Extracting class
    console.log($(innerHTMLElement).hasClass("testSlot"), "for class", innerHTMLElement);
    if($(innerHTMLElement).hasClass("testSlot") == false) {
        $(temp).removeClass("testSlot");
        $(temp2).removeClass("textBold");
        console.log("Changing bold at",temp2);
        temp = innerHTMLElement;
        $(temp2.substr(0,1)+this.id).addClass("textBold"); //Extracting the # sign
        if($(innerHTMLElement).hasClass("TH")== false)
        {   console.log("Color change working");
            $(innerHTMLElement).addClass("testSlot");}
    }
    else{
        $(temp).removeClass("testSlot");
        $(temp2).removeClass("textBold");
    }
    temp2=temp2.substr(0,1)+(this.id); //Extracting th
});

state="L"; //Initializing state of slider to Lab
$('#sw1').on('click', function(){

    if ($('#sw1').is(":checked"))
    {
        state="T";
        console.log(state);
    } else {
        state="L";
        console.log(state);
    }
    updateFreshCourses();
});


//---------------------------------------------------------------------------------- Baker ends



var flag=0;

$(".fac").click(function() {
    facID=(this.id); // or alert($(this).attr('id'));
    facID= parseInt(facID.substr(3,facID.length));
    console.log("id clicked",facID); //superman

    var html_cont = document.getElementById(this.id).innerHTML;
    html_cont=html_cont+"|";
    // console.log("HTML content", html_cont);
    var slot, ven,fac0,i0,i1;
    for(i0=0;i0<html_cont.length;i0++) //Extract slot
    {
        if(html_cont[i0].localeCompare("|")==0)
            break;
    }
    slot=html_cont.substr(0,i0);
    for(i1=i0+1;i1<html_cont.length;i1++) //Extract slot
    {
        if(html_cont[i1].localeCompare("|")==0) {
            console.log("breaking at", html_cont[i1]);
            break;
        }
    }
    ven=html_cont.substring(i0+1,i1);
    // console.log("venue", ven," from",i0+1," to ", i1);
    // console.log("ven", ven , "start at:",html_cont[i0+1],"ending at", html_cont[i1], "cotent being", html_cont);
    for(i0=i1+1;i0<html_cont.length;i0++) //Extract slot
    {
        if(html_cont[i0].localeCompare("|")==0) {
            break;
        }
    }
    fac0=html_cont.substring(i1+1,i0);
    console.log("SLOT", slot, "code", ven, " faculty", fac0);
    var facIDReplace=-1;
    for(var findC=0; findC<n; findC++)
    {
        if(dataJSON[findC]["slot"].localeCompare(slot)==0 && dataJSON[findC]["venue"].localeCompare(ven)==0 && dataJSON[findC]["faculty"].localeCompare(fac0)==0) {
            facIDReplace = findC;
            break;
        }
    }
    console.log("Tracked ID:", facIDReplace);
    facID=facIDReplace;



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
    // facID--;
    // console.log("Handling f")
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
        changeSlotColor(slotName[facID], dataJSON[facID]["courseCode"], flag02); //Call function to change color
        if(dataJSON[facID]["slot"].localeCompare("")!=0) // If slot has another part
            extractSlot();
    }

    else {
        slotName[facID]=".";
        slotName[facID] = slotName[facID] + dataJSON[facID]["slot"]; // Copy slot to slotName and call fxn to change color
        changeSlotColor(slotName[facID], dataJSON[facID]["courseCode"], flag02);
        return;

    }
}




function changeSlotColor(s, code, flag02) {//Multiple changes
    var slotI= s.substr(1, s.length);
    if(flag02==1) {
        if ($(s).hasClass("TH") == true)//Change
        {
            console.log("Removing", s);
            $(s).removeClass( "TH" );
            $(s).html(s);
        }
    }
    else {
        $(s).addClass("TH");//Change
        $(s).html(code + "-" + '<br/>' + slotI);
    }

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
