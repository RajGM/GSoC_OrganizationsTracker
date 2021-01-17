let jsonData;
let startYear = 2009;
let endYear = 2021;
let totalOrg;
let myTable = document.getElementById("myTable");
let row1 = document.getElementById("row1");
let rowBuild = 0;

//build dummy 0th row
function buildCell() {
    for (let i = 1; i <= endYear - startYear; i++) {
        let currCell = row1.insertCell(i);
        currCell.innerHTML = startYear + i - 1;
    }
}

//build total dummay rows equal to number of organization
function testBuild(totalOrg) {
    for (let i = 0; i < totalOrg; i++) {
        let currRow = myTable.insertRow(rowBuild + 1);
        /*
        if(i%2==0){
            currRow.style.backgroundColor = "#A5EBFB";
        }else{
            currRow.style.backgroundColor = "#696969";
        }
        */
        console.log(currRow);
        for (let j = 0; j <= endYear - startYear; j++) {
            let currCell = currRow.insertCell(j);
            if (startYear + j - 1 == "2008") {
                currCell.innerHTML = "Organization";
            } else {
                currCell.innerHTML = "No";
            }
        }
        rowBuild++;
    }
}

//place value "Yes" in cell where appropriate
function finalCall() {
    totalOrg = Object.keys(jsonData).length;
    const sortedObject = Object.fromEntries(Object.entries(jsonData).sort());
    testBuild(totalOrg);
    let currRow = 1;
    for (const [key, value] of Object.entries(sortedObject)) {
        myTable.rows[currRow].cells[0].innerHTML = key;
        for (let i = 0; i < value.length; i++) {
            myTable.rows[currRow].cells[value[i] - startYear + 1].innerHTML = "Yes";
        }
        currRow++;
    }
}

async function callME() {
    await fetch("./newData.json")
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