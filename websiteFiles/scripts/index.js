//Variables declaration
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
let errorCase;

let yearOptions = document.getElementById("yearOptions");
let yearOpt1 = document.getElementById("yearOpt1");
let yearOpt2 = document.getElementById("yearOpt2");
let yearOpt3 = document.getElementById("yearOpt3");
let yearForm = document.getElementById("yearForm");
let techForm = document.getElementById("techForm");
let topicForm = document.getElementById("topicForm");
let messageForm = document.getElementById("messageForm");
let yearButton = document.getElementById("yearButton");
let techButton = document.getElementById("techButton");
let topicButton = document.getElementById("topicButton");
let selectDataset1 = document.getElementById("selectDataset1");
let selectDataset2 = document.getElementById("selectDataset2");
let resetAllButton = document.getElementById("resetAllButton");
let tempData = {};
let selectedDataSet = 0;


//onClick functionality of buttons 

selectDataset1.onclick = function () {
    selectedDataSet = 0;
    selectDataset1.innerHTML = "Original Dataset Selected";

    if (!selectDataset2.disabled) {
        selectDataset2.innerHTML = "Select Filtered Dataset";
        selectDataset2.classList.remove("btn-warning");
        selectDataset2.classList.add("btn-success");
        selectDataset1.classList.add("btn-warning");
        selectDataset1.classList.remove("btn-success");
    }

}

selectDataset2.onclick = function () {
    selectedDataSet = 1;
    selectDataset1.innerHTML = "Select Original Dataset";
    selectDataset2.innerHTML = "Filtered Dataset Selected";
    selectDataset1.classList.remove("btn-warning");
    selectDataset1.classList.add("btn-success");
    selectDataset2.classList.add("btn-warning");
    selectDataset2.classList.remove("btn-success");
}

resetAllButton.onclick = function () {
    selectedDataSet = 0;
    yearOptions.innerHTML = "Details";
    yearForm.value = 0;
    techForm.value = "";
    techForm.placeholder = "Tech Name";
    topicForm.value = "";
    topicForm.placeholder = "Topic Name";
    selectDataset2.disabled = true;
    deleteTable();
    rebuildTable(jsonData);
}

yearOpt1.onclick = function () {
    yearOptions.innerHTML = yearOpt1.innerHTML;
}

yearOpt2.onclick = function () {
    yearOptions.innerHTML = yearOpt2.innerHTML;
}

yearOpt3.onclick = function () {
    yearOptions.innerHTML = yearOpt3.innerHTML;
}

//onClick functionality of filter buttons 

yearButton.onclick = function () {

    if (errorCase) {
        errorCase.style.border = "none";
        messageForm.value = "";
    }

    let useDataset;
    if (selectedDataSet == 0) {
        useDataset = jsonData;
    } else {
        useDataset = tempData;
    }

    let yearVal = parseInt(yearForm.value);
    if (yearOptions.innerHTML.toLowerCase() == "details") {
        messageForm.value = "Please select something in deatils";
        errorCase = yearOptions;
        yearOptions.style.border = "5px solid red";
    } else if (yearVal < 0) {
        messageForm.value = "Please enter valid number in year from";
        errorCase = yearForm;
        yearForm.style.border = "5px solid red";
    } else {

        tempData = {};

        if (yearOptions.innerHTML.toLowerCase() == "at least") {

            for (const [key, value] of Object.entries(useDataset)) {
                if (value.years.length >= yearVal) {
                    tempData[key] = value;
                }
            }

            deleteTable();
            rebuildTable(tempData);
        }
        else if (yearOptions.innerHTML.toLowerCase() == "at most") {

            for (const [key, value] of Object.entries(useDataset)) {
                if (value.years.length <= yearVal) {
                    tempData[key] = value;
                }
            }
            deleteTable();
            rebuildTable(tempData);

        } else if (yearOptions.innerHTML.toLowerCase() == "equal to") {

            for (const [key, value] of Object.entries(useDataset)) {
                if (value.years.length == yearVal) {
                    tempData[key] = value;
                }
            }
            deleteTable();
            rebuildTable(tempData);

        }

    }

    if (selectDataset2.disabled) {
        selectDataset2.disabled = false;
    }

    messageForm.value = "Yearly Query Completed and Table Updated";

}

techButton.onclick = function () {

    if (errorCase) {
        errorCase.style.border = "none";
        messageForm.value = "";
    }

    let useDataset;
    if (selectedDataSet == 0) {
        useDataset = jsonData;
    } else {
        useDataset = tempData;
    }

    if (techForm.value == "") {
        messageForm.value = "Enter some technology name in tech from";
        errorCase = techForm;
        techForm.style.border = "5px solid red";
    } else {
        tempData = {};

        for (const [key, value] of Object.entries(useDataset)) {
            for (let i = 0; i < value.years.length; i++) {
                if (parseInt(value.years[i]) >= 2016) {
                    if (value[value.years[i]].tech.includes(techForm.value)) {
                        tempData[key] = value;
                    }
                }
            }
        }

        deleteTable();
        rebuildTable(tempData);

    }


    if (selectDataset2.disabled) {
        selectDataset2.disabled = false;
    }


    messageForm.value = "Tech Query Completed and Table Updated";
}

topicButton.onclick = function () {

    if (errorCase) {
        errorCase.style.border = "none";
        messageForm.value = "";
    }

    let useDataset;
    if (selectedDataSet == 0) {
        useDataset = jsonData;
    } else {
        useDataset = tempData;
    }

    if (topicForm.value == "") {
        messageForm.value = "Enter some topic in topic from";
        errorCase = topicForm;
        topicForm.style.border = "5px solid red";
    } else {
        tempData = {};

        for (const [key, value] of Object.entries(useDataset)) {
            for (let i = 0; i < value.years.length; i++) {
                if (parseInt(value.years[i]) >= 2016) {
                    if (value[value.years[i]].topics.includes(topicForm.value)) {
                        tempData[key] = value;
                    }
                }
            }
        }

        deleteTable();
        rebuildTable(tempData);

    }

    if (selectDataset2.disabled) {
        selectDataset2.disabled = false;
    }

    messageForm.value = "Topic Query Completed and Table Updated";

}

//function to delete the table
function deleteTable() {
    for (let i = 0; i < totalOrg; i++) {
        myTable.deleteRow(1);
    }
}

//function to rebuild the table
function rebuildTable(tempData) {
    rowBuild = 0;
    finalCall(tempData);
}

//build dummy 0th row with metaData
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
                currCell.classList.add("pointerClass");
                currCell.setAttribute("bgcolor", notParticipatedColor);
                currCell.addEventListener('click', changeData);
            } else {
                currCell.innerHTML = " ";
            }
        }
        rowBuild++;
    }
}

//change data in cell according to the click on the year cell
function changeData(e) {
    let useDataset;
    if (selectedDataSet == 0) {
        useDataset = jsonData;
    } else {
        useDataset = tempData;
    }

    const sortedObject = Object.fromEntries(Object.entries(useDataset).sort());

    let targetRow = e.target.parentNode.rowIndex;
    let targetCol = e.target.cellIndex;
    let orgName = Object.keys(sortedObject)[targetRow - 1];
    let activeColcell = activeCol[orgName];
    let orgYear = startYear + targetCol - 1;

    if (startYear + activeColcell - 1 >= 2016) {
        if (useDataset[orgName][startYear + activeColcell - 1]) {
            myTable.rows[targetRow].cells[activeColcell].setAttribute("bgcolor", participatedAndInfoColor);
        } else {
            myTable.rows[targetRow].cells[activeColcell].setAttribute("bgcolor", notParticipatedColor);
        }
    } else {
        if (useDataset[orgName]["years"].includes((startYear + activeColcell - 1).toString())) {
            myTable.rows[targetRow].cells[activeColcell].setAttribute("bgcolor", participatedAndNoInfoColor);
        } else {
            myTable.rows[targetRow].cells[activeColcell].setAttribute("bgcolor", notParticipatedColor);
        }
    }

    activeCol[orgName] = targetCol;

    if (orgYear >= 2016 && jsonData[orgName][orgYear]) {
        myTable.rows[targetRow].cells[targetCol].setAttribute("bgcolor", currentActiveColor);
        myTable.rows[targetRow].cells[endYear - startYear + 1].innerHTML = jsonData[orgName][orgYear].tech;
        myTable.rows[targetRow].cells[endYear - startYear + 2].innerHTML = jsonData[orgName][orgYear].topics;
        myTable.rows[targetRow].cells[endYear - startYear + 3].innerHTML = "<a href=" + jsonData[orgName][orgYear].link + ">"+orgYear+"</a>";
        if (activeState[orgName]) {
            myTable.rows[targetRow].cells[targetCol].innerHTML = orgYear;
            activeState[orgName] = false;
        } else {
            myTable.rows[targetRow].cells[targetCol].innerHTML = "Yes";
            activeState[orgName] = true;
        }
    } else if (jsonData[orgName]["years"].includes(orgYear.toString())) {
        myTable.rows[targetRow].cells[targetCol].setAttribute("bgcolor", currentActiveColor);
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
        myTable.rows[targetRow].cells[targetCol].setAttribute("bgcolor", currentActiveColor);
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
function finalCall(jsonData) {
    totalOrg = Object.keys(jsonData).length;
    const sortedObject = Object.fromEntries(Object.entries(jsonData).sort());
    jsonData = sortedObject;
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
                    myTable.rows[currRow].cells[endYear - startYear + 3].innerHTML = "<a href=" + value[value.years[i]].link + ">"+value.years[i]+"</a>";
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
}

//function to fill the table with data
async function callME() {
    await buildCell();
    await fetch("./websiteFiles/assets/data/allDataCombined.json")
        .then(response => {
            return response.json();
        })
        .then(
            data => {
                jsonData = data;
            }
        );

    finalCall(jsonData);
}

callME();