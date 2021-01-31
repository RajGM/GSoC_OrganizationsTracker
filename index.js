let jsonData;
let startYear = 2009;
let endYear = 2021;
let totalOrg;
let myTable = document.getElementById("myTable");
let row1 = document.getElementById("row1");
let rowBuild = 0;
let activeCol = {};
let activeState = {};
let currentActiveColor = "yellow";
let participatedAndNoInfoColor = "blue";
let participatedAndInfoColor = "green";
let notParticipatedColor = "red";









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
let Query = {
    YearQ: "At least",
    Years: "0",
    andOr1: "OR",
    Tool: "",
    andOr2: "OR",
    Topic: "",
    /*
    Tool:{
        OR:[],
        AND:[]
    },
    Topic:{
        OR:[],
        AND:[]
    }
    */
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

andOrFinalOpt1.onclick = function () {
    andOrFinal.innerHTML = andOrFinalOpt1.innerHTML;
    Query.andOr2 = andOrFinalOpt1.innerHTML;
}

andOrFinalOpt2.onclick = function () {
    andOrFinal.innerHTML = andOrFinalOpt2.innerHTML;
    Query.andOr2 = andOrFinalOpt2.innerHTML;
}

goButton.onclick = function () {
    console.log(yearForm.value);
    console.log(toolForm.value);
    console.log(topicForm.value);
    console.log(Query);
    console.log("Go button clicked");
    //do  a query search here

    for (const [key, value] of Object.entries(jsonData)) {
        if (value.years.length > 4) {
            for (let i = 0; i < value.years.length; i++) {
                if (value.years[i] >= 2016) {
                    if (value[value.years[i]]["li"] !== "undefined") {
                        console.log(value[value.years[i]].tech);
                    }
                }

            }
        }

    }


}

console.log(Query);





























//build dummy 0th row
function buildCell() {
    for (let i = 1; i <= endYear - startYear + 3; i++) {
        let currCell = row1.insertCell(i);
        currCell.innerHTML = startYear + i - 1;
        if (startYear + i == endYear + 1) {
            currCell.innerHTML = "Tech";
        } else if (startYear + i == endYear + 2) {
            currCell.innerHTML = "Topics";
        } else if (startYear + i == endYear + 3) {
            currCell.innerHTML = "Links";
        }
    }
}

//build total dummay rows equal to number of organization
function testBuild(totalOrg) {
    for (let i = 0; i < totalOrg; i++) {
        let currRow = myTable.insertRow(rowBuild + 1);
        for (let j = 0; j <= endYear - startYear + 3; j++) {
            let currCell = currRow.insertCell(j);
            if (j == 0) {
                currCell.innerHTML = "Organization";
            } else if (j >= 1 && j <= endYear - startYear) {
                currCell.innerHTML = "No";
                currCell.setAttribute("bgcolor", notParticipatedColor);
                currCell.addEventListener('click', changeData);
            } else {
                currCell.innerHTML = " ";
            }
        }
        rowBuild++;
    }
}

function changeData(e) {
    let targetRow = e.target.parentNode.rowIndex;
    let targetCol = e.target.cellIndex;
    let orgName = Object.keys(jsonData)[e.target.parentNode.rowIndex - 1];
    let activeColcell = activeCol[orgName];
    let orgYear = startYear + targetCol - 1;

    myTable.rows[targetRow].cells[activeColcell].setAttribute("bgcolor", "white");
    activeCol[orgName] = targetCol;

    if (orgYear >= 2016 && jsonData[orgName][orgYear]) {
        myTable.rows[targetRow].cells[targetCol].setAttribute("bgcolor", participatedAndInfoColor);
        myTable.rows[targetRow].cells[endYear - startYear + 1].innerHTML = jsonData[orgName][orgYear].tech;
        myTable.rows[targetRow].cells[endYear - startYear + 2].innerHTML = jsonData[orgName][orgYear].topics;
        myTable.rows[targetRow].cells[endYear - startYear + 3].innerHTML = "<a href=" + jsonData[orgName][orgYear].link + ">Link</a>";
        if (activeState[orgName]) {
            myTable.rows[targetRow].cells[targetCol].innerHTML = orgYear;
            activeState[orgName] = false;
        } else {
            myTable.rows[targetRow].cells[targetCol].innerHTML = "Yes";
            activeState[orgName] = true;
        }
    } else if (jsonData[orgName]["years"].includes(orgYear.toString())) {
        myTable.rows[targetRow].cells[targetCol].setAttribute("bgcolor", participatedAndNoInfoColor);
        myTable.rows[targetRow].cells[endYear - startYear + 1].innerHTML = "--";
        myTable.rows[targetRow].cells[endYear - startYear + 2].innerHTML = "--";
        myTable.rows[targetRow].cells[endYear - startYear + 3].innerHTML = "--";
        if (activeState[orgName]) {
            myTable.rows[targetRow].cells[targetCol].innerHTML = orgYear;
            activeState[orgName] = false;
        } else {
            myTable.rows[targetRow].cells[targetCol].innerHTML = "Yes";
            activeState[orgName] = true;
        }
    } else {
        myTable.rows[targetRow].cells[targetCol].setAttribute("bgcolor", notParticipatedColor);
        myTable.rows[targetRow].cells[endYear - startYear + 1].innerHTML = "--";
        myTable.rows[targetRow].cells[endYear - startYear + 2].innerHTML = "--";
        myTable.rows[targetRow].cells[endYear - startYear + 3].innerHTML = "--";
        if (activeState[orgName]) {
            myTable.rows[targetRow].cells[targetCol].innerHTML = orgYear;
            activeState[orgName] = false;
        } else {
            myTable.rows[targetRow].cells[targetCol].innerHTML = "No";
            activeState[orgName] = true;
        }
    }

}

//place value "Yes" in cell where appropriate
function finalCall() {
    totalOrg = Object.keys(jsonData).length;
    const sortedObject = Object.fromEntries(Object.entries(jsonData).sort());
    testBuild(totalOrg);
    let currRow = 1;
    for (const [key, value] of Object.entries(sortedObject)) {
        value.years = value.years.sort();
        myTable.rows[currRow].cells[0].innerHTML = key;
        for (let i = 0; i < value.years.length; i++) {
            myTable.rows[currRow].cells[value.years[i] - startYear + 1].innerHTML = "Yes";
            var parsedInt = parseInt(value.years[i]);
            if (parsedInt >= 2016) {
                myTable.rows[currRow].cells[value.years[i] - startYear + 1].setAttribute("bgcolor", participatedAndInfoColor);
            } else {
                myTable.rows[currRow].cells[value.years[i] - startYear + 1].setAttribute("bgcolor", participatedAndNoInfoColor);
            }

            if (value.years.length == i + 1) {
                activeCol[key] = value.years[i] - startYear + 1;
                activeState[key] = true;
                if (parsedInt >= 2016) {
                    myTable.rows[currRow].cells[value.years[i] - startYear + 1].setAttribute("bgcolor", currentActiveColor);
                    myTable.rows[currRow].cells[endYear - startYear + 1].innerHTML = value[value.years[i]].tech;
                    myTable.rows[currRow].cells[endYear - startYear + 2].innerHTML = value[value.years[i]].topics;
                    myTable.rows[currRow].cells[endYear - startYear + 3].innerHTML = "<a href=" + value[value.years[i]].link + ">Link</a>";
                } else {
                    myTable.rows[currRow].cells[value.years[i] - startYear + 1].setAttribute("bgcolor", currentActiveColor);
                    myTable.rows[currRow].cells[endYear - startYear + 1].innerHTML = "--";
                    myTable.rows[currRow].cells[endYear - startYear + 2].innerHTML = "--";
                    myTable.rows[currRow].cells[endYear - startYear + 3].innerHTML = "--"
                }
            }

        }
        currRow++;
    }
    jsonData = sortedObject;
}

async function callME() {
    await fetch("./allDataCombined.json")
        .then(response => {
            return response.json();
        })
        .then(
            data => {
                jsonData = data;
            }
        );

    finalCall();
}

buildCell();

callME();