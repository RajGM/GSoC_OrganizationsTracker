let jsonData;
let startYear = 2009;
let endYear = 2021;
let totalOrg;
let myTable = document.getElementById("myTable");
let row1 = document.getElementById("row1");
let rowBuild = 0;
let activeCol = [];

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
        //console.log(currRow);
        for (let j = 0; j <= endYear - startYear + 3; j++) {
            let currCell = currRow.insertCell(j);
            if (j == 0) {
                currCell.innerHTML = "Organization";
            } else if (j >= 1 && j <= endYear - startYear) {
                currCell.innerHTML = "No";
                //myTable.rows[currRow].cells[value.years[i] - startYear + 1].addEventListener('click',changeData);
                currCell.addEventListener('click', changeData);
            } else {
                currCell.innerHTML = " ";
            }
        }
        rowBuild++;
    }
}

function changeData(e) {
    //console.log(e.target);
    //console.log(e.target.cellIndex);
    //console.log(e.target.parentNode.rowIndex);
}

//place value "Yes" in cell where appropriate
function finalCall() {
    totalOrg = Object.keys(jsonData).length;
    console.log("Total Organization:" + totalOrg);
    activeCol = new Array(totalOrg);
    const sortedObject = Object.fromEntries(Object.entries(jsonData).sort());
    testBuild(totalOrg);
    let currRow = 1;
    //console.log(sortedObject)
    for (const [key, value] of Object.entries(sortedObject)) {
        myTable.rows[currRow].cells[0].innerHTML = key;
        for (let i = 0; i < value.years.length; i++) {
            myTable.rows[currRow].cells[value.years[i] - startYear + 1].innerHTML = "Yes";
           // if(i == value.years.length-1){
             //   myTable.rows[currRow].cells[value.years[i] - startYear + 1].setAttribute("bgcolor","red");
               // myTable.rows[currRow].cells[value.years[i] - startYear + 1].style.back = "Yes"
               var parsedInt = parseInt(value.years[i]);
            //console.log("Type value.years[i]:"+typeof value.years[i]);
            //console.log("Type parsedInt:"+typeof parsedInt);
            //console.log("Type 2016:"+typeof 2016);
            console.log( parsedInt >= 2016 );
            if (parsedInt >= 2016) {
                //toString
                console.log("Inside True");
                myTable.rows[currRow].cells[endYear - startYear + 1].innerHTML = value[value.years[i]].tech;
                myTable.rows[currRow].cells[endYear - startYear + 2].innerHTML = value[value.years[i]].topics;
                myTable.rows[currRow].cells[endYear - startYear + 3].innerHTML = "<a href=" + value[value.years[i]].link + ">Link</a>";
            } else {
                myTable.rows[currRow].cells[endYear - startYear + 1].innerHTML = "--";
                myTable.rows[currRow].cells[endYear - startYear + 2].innerHTML = "--";
                myTable.rows[currRow].cells[endYear - startYear + 3].innerHTML = "--"
            }
            //}
            

        }
        currRow++;
    }
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