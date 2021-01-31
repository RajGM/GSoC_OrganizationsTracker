


let yearOptions = document.getElementById("yearOptions");
let yearOpt1 = document.getElementById("yearOpt1");
let yearOpt12 = document.getElementById("yearOpt2");
let yearOpt3 = document.getElementById("yearOpt3");
let yearForm = document.getElementById("yearForm");
let andOr1 = document.getElementById("andOr1");
let andOrOpt1 = document.getElementById("andOrOpt1");
let andOrOpt2 = document.getElementById("andOrOpt2");
let toolForm = document.getElementById("toolForm");
let andOrFinal = document.getElementById("andOrFinal");
let andOrFinalOpt1 = document.getElementById("andOrFinalOpt1");
let andOrFinalOpt2 = document.getElementById("andOrFinalOpt2");
let topicForm = document.getElementById("topicForm");
let goButton = document.getElementById("goButton");
let messageForm = document.getElementById("messageForm");
let andOr1Par = document.getElementById("andOr1Par");
let Query = {
    YearQ: "at least",
    Years: "1",
    andOr1: "AND",
    Tool: "",
    andOr2: "AND/OR",
    Topic: "",
}

yearOpt1.onclick = function () {
    yearOptions.innerHTML = yearOpt1.innerHTML;
    Query.YearQ = "at least"
}

yearOpt2.onclick = function () {
    yearOptions.innerHTML = yearOpt2.innerHTML;
    Query.YearQ = "at most"
}

yearOpt3.onclick = function () {
    yearOptions.innerHTML = yearOpt3.innerHTML;
    Query.YearQ = "equal"
}

yearForm.onchange = function () {
    Query.Years = yearForm.value;
}

andOrOpt1.onclick = function () {
    andOr1.innerHTML = andOrOpt1.innerHTML;
    Query.andOr1 = andOrOpt1.innerHTML;
}

andOrOpt2.onclick = function () {
    andOr1.innerHTML = andOrOpt2.innerHTML;
    Query.andOr1 = andOrOpt2.innerHTML;
}

toolForm.onchange = function(){
    Query.Tool = toolForm.value;
}

andOrFinalOpt1.onclick = function () {
    andOrFinal.innerHTML = andOrFinalOpt1.innerHTML;
    Query.andOr2 = andOrFinalOpt1.innerHTML;
}

andOrFinalOpt2.onclick = function () {
    andOrFinal.innerHTML = andOrFinalOpt2.innerHTML;
    Query.andOr2 = andOrFinalOpt2.innerHTML;
}

topicForm.onchange = function(){
    Query.Topic = topicForm.value;
}

goButton.onclick = function () {


    if (Query.YearQ.toLocaleLowerCase() == "details") {
        errorCase = yearOptions;
        yearOptions.style.border = "5px solid red";
        messageForm.value = "Make sure you select Details about Year";
        //exit case
    } else {

        testCase();


    }
}

function testCase() {

    console.log("Inside tetCase fun");
    // console.log( yearForm.value );
    // console.log( parseInt(yearForm.value) );
    if (Query.Years != 0) {

        if (Query.andOr1 == "AND") {
            
            if (Query.Tool.length != 0) {
                console.log("Not able to get here");
                if (Query.andOr2 == "AND") {

                    if (Query.Topic != "") {
                        //query case
                        if (Query.YearQ.toLocaleLowerCase() == "at least") {
                            //put code here
                            for (const [key, value] of Object.entries(jsonData)) {
                                if (value.years.length >= Query.Years) {
                                    for (let i = 0; i < value.years.length; i++) {
                                        if (value.years[i] >= 2016) {
                                            if ( value[value.years[i]]["tech"].includes(Query.Tool) && value[value.years[i]]["topics"].includes(Query.Topic) ) {
                                                console.log(key);
                                                //console.log(value[value.years[i]].tech);
                                                //console.log(value[value.years[i]].topics);
                                            }
                                        }else{
                                            //fill the dataSet by only copying name
                                            //fill --
                                        }
                                    }
                                }
                            }

                        } else if (Query.YearQ.toLocaleLowerCase() == "at most") {


                            for (const [key, value] of Object.entries(jsonData)) {
                                if (value.years.length <= Query.Years) {
                                    for (let i = 0; i < value.years.length; i++) {
                                        if (value.years[i] >= 2016) {
                                            if ( value[value.years[i]]["tech"].includes(Query.Tool) && value[value.years[i]]["topics"].includes(Query.Topic) ) {
                                                console.log(key);
                                                //console.log(value[value.years[i]].tech);
                                                //console.log(value[value.years[i]].topics);
                                            }
                                        }else{
                                            //fill the dataSet by only copying name
                                            //fill --
                                        }
                                    }
                                }
                            }

                        } else if (Query.YearQ.toLocaleLowerCase() == "equal to") {


                            for (const [key, value] of Object.entries(jsonData)) {
                                if (value.years.length == Query.Years) {
                                    for (let i = 0; i < value.years.length; i++) {
                                        if (value.years[i] >= 2016) {
                                            if ( value[value.years[i]]["tech"].includes(Query.Tool) && value[value.years[i]]["topics"].includes(Query.Topic) ) {
                                                console.log(key);
                                                //console.log(value[value.years[i]].tech);
                                                //console.log(value[value.years[i]].topics);
                                            }
                                        }else{
                                            //fill the dataSet by only copying name
                                            //fill --
                                        }
                                    }
                                }
                            }





                        } else {
                            messageForm.value = "You are trying to be a hacker";
                            //exit case
                        }


                    } else {
                        console.log(topicForm);
                        errorCase = topicForm;
                        topicForm.style.border = "5px solid red";
                        messageForm.value = "Make sure you enter Topic Name";
                        //exit case
                    }

                } else if (Query.andOr2 == "OR") {
                    //ignore case
                    








                } else {
                    console.log(andOrFinal);
                    errorCase = andOrFinal;
                    andOrFinal.style.border = "5px solid red";
                    messageForm.value = "Make sure you select atleast one option";
                    //exit case
                }

            } else {
                console.log(toolForm);
                errorCase = toolForm;
                toolForm.style.border = "5px solid red";
                messageForm.value = "Make sure you enter Tool Name";
                //exit case
            }


        } else if (Query.andOr1 == "OR") {

            if (Query.Tool != "") {

                if (Query.andOr2 == "AND") {

                    if (Query.Topic != "") {
                        //query case
                    } else {
                        //exit case
                    }

                } else if (Query.andOr2 == "OR") {

                    if (Query.Topic != "") {
                        //query case
                    } else {
                        //ignore case
                    }


                } else {
                    console.log(andOrFinal);
                    errorCase = andOrFinal;
                    andOrFinal.style.border = "5px solid red";
                    messageForm.value = "Make sure you select atleast one option";
                    //exit case
                }

            } else {
                //ignore it 


            }

        } else {
            console.log(andOr1Par);
            errorCase = andOr1Par;
            andOr1Par.style.border = "5px solid red";
            messageForm.value = "Make sure you select at least one option";
            //exit case
        }


    } else {
        errorCase = yearForm;
        yearForm.style.border = "5px solid red";
        messageForm.value = "Make sure you enter a number in Year";
        //exit case
    }


}






