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
var noSignUPsubCounter=0;
var clashStatus=0;
var removeSlotFlag=0;
var arraySubject = [];
var length;
var ced;
arraySubject =[];
var facIDReplace;
// console.log("STATE1:", arraySubject, "and", dataJSON);
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
dataJSON[1]={"venue":"SJT 302", "courseCode":"CSE1002", "courseTitle":"Web Development", "type":"ETH", "slot":"A2+TA2", "c":"2", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[2]={"venue":"SJT 103", "courseCode":"PHY1999", "courseTitle":"Innovative Projects in Physics", "type":"ETH", "slot":"B2", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[3]={"venue":"SJT 103", "courseCode":"CSE1003", "courseTitle":"Learnign OOPS", "type":"ELA", "slot":"L10+L36", "c":"4", "faculty":"Dr. Rajkumar S"};//Hardcoded
dataJSON[4]={"venue":"TT 102", "courseCode":"FLA1001", "courseTitle":"French", "type":"ETH", "slot":"TA2+D2+DA1", "c":"6", "faculty":"Dinesh Karthick"};//Hardcoded
dataJSON[5]={"venue":"SMV 012", "courseCode":"CHY1701", "courseTitle":"Basic Chemistry", "type":"ELA", "slot":"L2+L3+L13+L14+L15", "c":"3", "faculty":"Virat Kohli"};//Hardcoded
    n=dataJSON.length;

    // console.log("STATE2:", arraySubject);

slotInit =[];
//Pancake
    for(var l3=0;l3<n;l3++)
        slotInit[l3]=dataJSON[l3]["slot"];
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
    // console.log($(innerHTMLElement).hasClass("testSlot"), "for class", innerHTMLElement);
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
    // console.log("id clicked",facID); //superman

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
            // console.log("breaking at", html_cont[i1]);
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
    // console.log("SLOT", slot, "code", ven, " faculty", fac0);

    facIDReplace=-1;
    // console.log("Pancake prints n", n);
    for(var findC=0; findC<n; findC++)
    {
        // console.log("to be compared with", slotInit[findC]);
        // console.log("slot, venue, fac", dataJSON[findC]["slot"]);
        if(slotInit[findC].localeCompare(slot)==0 && dataJSON[findC]["venue"].localeCompare(ven)==0 && dataJSON[findC]["faculty"].localeCompare(fac0)==0) {
            facIDReplace = findC;
            break;
        }
    }
    // console.log("Tracked ID:", facIDReplace);
    facID=facIDReplace;
    console.log("Printing facID:", facID);
    console.log("Assigning values", arraySubject);
    var slotClash=0;
    var slotCompare=[];
    var toBeComparedWith =[];
    function DummyExtractSlot(slotDummy){
        var k=0;
        var l5;
        for(l5=0;l5<slotDummy.length; l5++)
        {
            if(slotDummy[l5].localeCompare("+")==0)
            {
                toBeComparedWith[k]=slotDummy.substring(0,l5);
                slotDummy=slotDummy.substring(l5+1, slotDummy.length);
                l5=0;
                k++;
            }
        }
        toBeComparedWith[k]=slotDummy.substring(0,l5);
        console.log("Slot array to be compared with:", toBeComparedWith);
    }
    function ExtractSlotForIncomingCourse(slotDummy){
        var k=0;
        var l5;
        for(l5=0;l5<slotDummy.length; l5++)
        {
            if(slotDummy[l5].localeCompare("+")==0)
            {
                slotCompare[k]=slotDummy.substring(0,l5);
                slotDummy=slotDummy.substring(l5+1, slotDummy.length);
                l5=0;
                k++;
            }
        }
        slotCompare[k]=slotDummy.substring(0,l5);
        console.log("Slot array to be compared:", slotCompare);
    }
    ExtractSlotForIncomingCourse(slotInit[facID]);
    for(var l6=0;l6<noSignUPsubCounter;l6++)//Check whether any slots clashed or not
    {

        DummyExtractSlot(arraySubject[l6]["SLOT"]);
        for(var l7=0; l7<slotCompare.length;l7++)
        {
            for(var l6=0; l6<toBeComparedWith.length;l6++)
            {
                if(slotCompare[l7].localeCompare(toBeComparedWith[l6])==0){
                    slotClash=1;
                    break;
                }
            }
            if(slotClash==1)
                break;
        }
        if(slotClash==1)
            break;
    }
    if(slotClash==1)
    {
        alert("FUCK YOU");

        slotClash =0;
        return;
    }
    console.log("Strawberry SAYS STATE BEFORE:", arraySubject);
    console.log("Strawberry SAYS noSignupsubcounter:", noSignUPsubCounter);
    arraySubject[noSignUPsubCounter] = {
        "SLOT": slotInit[facID],
        "CODE": dataJSON[facID]["courseCode"],
        "TITLE": dataJSON[facID]["courseTitle"],
        "VENUE": dataJSON[facID]["venue"],
        "FACULTY": dataJSON[facID]["faculty"],
        "CREDITS": dataJSON[facID]["c"]
    };
    console.log("STRAWBERRY SAYS STATE IS:", arraySubject);
    noSignUPsubCounter++;


    updateFrontend (0);
    flag++;

});


//--------------------------------------------------------------------------------------------------------------------------
//Remove courses   -------------------change-------------------------------------------------------------


$(document).on('click', '.close', function(){
    // console.log('pancake');
    removeSlotFlag=1;//pancake
    extractfacID=parseInt((this.id).substr(2,(this.id).length));
    $("#row"+extractfacID).remove();
    dataJSON[extractfacID]["slot"]=slotInit[extractfacID];
    facID=extractfacID;
    ced=ced- parseInt(dataJSON[facID]["c"]);
    $("#credits").html("<br><h4><b>" + ced + "</b></h4>CREDITS");

    for(var l6=0;l6<arraySubject.length; l6++)
    {   console.log("if", arraySubject[l6]["SLOT"], "equals",slotInit[facID])
        if(arraySubject[l6]["SLOT"].localeCompare(slotInit[facID])== 0  && arraySubject[l6]["FACULTY"].localeCompare(dataJSON[facID]["faculty"])== 0)
        {
            console.log("ORANGE DELETES:", slotInit[facID]);
            for(var l7=l6;l7<arraySubject.length-1;l7++)
            {
                console.log("l7+1",l7+1);
                arraySubject[l7] = {
                    "SLOT": arraySubject[l7+1]["SLOT"],
                    "CODE": arraySubject[l7+1]["CODE"],
                    "VENUE": arraySubject[l7+1]["TITLE"],
                    "FACULTY": arraySubject[l7+1]["FACULTY"],
                    "CREDITS": arraySubject[l7+1]["CREDITS"]
                };
            }
            arraySubject[l7] = {
                "SLOT": NaN,
                "CODE": NaN,
                "VENUE": NaN,
                "FACULTY": NaN,
                "CREDITS": NaN
            };
            noSignUPsubCounter--;
            break;
        }
    }
    console.log("CLOSING SUBJECT SET STATUS:", arraySubject);
    updateFrontend(1);
});
//-----------------------------------------End-----------------------------------------------------------






/*Function: updateFrontend()
T-> Will be invoked when a subject is clicked
*/


function updateFrontend(flag02) {
    length = slotInit[facID].length;

    if (flag02 == 0) {   // Replaced 2x changes

        slotName[facID] = ".";
        dataJSON[facID]["slot"]=slotInit[facID];
        extractSlot();
        // console.log("Strawberry runs extractSlot() 1");

        if (clashStatus == 1) {
            clashStatus = 0;
        }
        else {
            clashStatus = 0;
            ced = 0;
            console.log("POPCORN COUNTS CREDITS TILL ", noSignUPsubCounter);
            for (var l2 = 0; l2 < noSignUPsubCounter; l2++)
                ced += parseInt(arraySubject[l2]["CREDITS"]);

            $("#creds").html('Total Credits: ' + ced);
            $("#credits").html("<br><h4><b>" + ced + "</b></h4>CREDITS");

            console.log("ORANGE SAYS CREDIT UPDATION",arraySubject);
            addDataToList(slotInit[facID], dataJSON[facID]["courseCode"], dataJSON[facID]["TITLE"], dataJSON[facID]["VENUE"], dataJSON[facID]["FACULTY"], dataJSON[facID]["CREDITS"], facID);

        }
    }
    else{
        extractSlot();
        // console.log("Strawberry runs extractSlot() 2");
    }

    function extractSlot() {
        var flag = 0;

        var i = 0;
        console.log("length: ", length, "of" ,slotInit[facID]);
        for (; i < length; i++) //Check if + sign is present which means there are more than 1 slots
            if (dataJSON[facID]["slot"][i] == "+") {
                flag = 1; //Flag to 1 if more than 1 slot present
                break;
            }
        console.log("printing",dataJSON[facID]["slot"]);
        if (flag == 1) {

            // console.log("CHECKPOINT is ", slotInit[facID]);
            slotName[facID] = ".";
            slotName[facID] = slotName[facID] + dataJSON[facID]["slot"].substr(0, i); //Store the first part of the slot in slotName
            dataJSON[facID]["slot"] = dataJSON[facID]["slot"].substr(i + 1, length); //Store the later part of the slot in slot
            // console.log("{ancake tests value of if",($(slotName[facID]).hasClass("TH") == true  && removeSlotFlag==0));
            if ($(slotName[facID]).hasClass("TH") == true   && removeSlotFlag==0) {
                alert("SLOTS CLASHED"); //If slots clashed then dont change color
                clashStatus = 1;
                return;
            }
            else if($(slotName[facID]).hasClass("TH") == true && removeSlotFlag==1)
            {
                changeSlotColor(slotName[facID], dataJSON[facID]["CODE"]); //Call function to change color

            }
            else {
                changeSlotColor(slotName[facID], dataJSON[facID]["CODE"]); //Call function to change color
            }

            if (dataJSON[facID]["slot"].localeCompare("") != 0) // If slot has another part
            {
                extractSlot();
                length = dataJSON[facID]["slot"].length;
                console.log("CHECKPOINT is ", dataJSON[facID]["slot"]);
            }
        }

        else {
            slotName[facID] = ".";
            slotName[facID] = slotName[facID] + dataJSON[facID]["slot"]; // Copy slot to slotName and call fxn to change color
            if ($(slotName[facID]).hasClass("TH") == true && removeSlotFlag==0) {
                alert("SLOTS CLASHED"); //If slots clashed then dont change color
                clashStatus = 1;
                return;
            }
            else {
                changeSlotColor(slotName[facID], dataJSON[facID]["CODE"]);
            }

            return;

        }
    }


    function changeSlotColor(s, code, flag02) {//Multiple changes
        // console.log("Pancake runs");
        var slotI = s.substr(1, s.length);
        // console.log("Pancake runs changeSlotColor");
        if (removeSlotFlag == 1) {
            // console.log("Strawberry runs if", $(s).hasClass("TH") == true);
            if ($(s).hasClass("TH") == true)//Change
            {
                // console.log("Pancake tries removing", s);
                $(s).removeClass("TH");
                $(s).html(s);

            }
            else { //strawberry

                // console.log("Strawberry runs else");
                $(s).addClass("TH");//Change
                $(s).html(code + "-" + '<br/>' + slotI);
            }
        }
        else {
            // console.log("Strawberry runs else");
            $(s).addClass("TH");//Change
            $(s).html(code + "-" + '<br/>' + slotI);
        }

    }

    function addDataToList(s, c, t, v, f, cd, id_cell) //Updating selected courses table
    {
        // console.log("should read empty", arraySubject);
        // for(var l4=0; l4<arraySubject.length; l4++){
        //     if(arraySubject[l4]["SLOT"].localeCompare(slotInit[facID])== 0  || arraySubject[l4]["FACULTY"].localeCompare(dataJSON[facID]["faculty"])== 0){
        //         alert("SLOT BOOM");
        //         return;
        //     }
        //
        //  }


        var table = document.getElementById("sec_Course");
        var row = table.insertRow(1);
        row.id = "row" + id_cell;//change
        var slot = row.insertCell(0);
        var code = row.insertCell(1);
        var title = row.insertCell(2);
        var ven = row.insertCell(3);
        var facl = row.insertCell(4);
        var cred = row.insertCell(5);
        var delt = row.insertCell(6);// CHANGE
        delt.id = "id" + id_cell;//change
        var classN = "close"; //change

        slot.innerHTML = s;
        code.innerHTML = c;
        title.innerHTML = t;
        ven.innerHTML = v;
        facl.innerHTML = f;
        cred.innerHTML = cd;
        delt.innerHTML = "<b/><i class=\"fas fa-times cross\"/></b/>"; //CHANGE
        $("#" + delt.id).addClass(classN);//CHANGE

    };
}

//
// }//End of updateFrontend()
