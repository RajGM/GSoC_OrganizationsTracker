//console.log("Index.js running");
let jsonData;
let startYear = 2009;
let endYear = 2021;
let totalOrg;
let myTable = document.getElementById("myTable");
let row1 = document.getElementById("row1");
let rowBuild = 0;
fetch("./newData.json")
    .then(response => {
        return response.json();
    })
    .then(
        data => {
            jsonData = data;
        }
    );

function buildCell(){
    for(let i=1;i<=endYear-startYear;i++){
        let currCell = row1.insertCell(i);
        currCell.innerHTML = startYear+i-1;
    }
}

buildCell();

function testBuild(totalOrg){
    //console.log("totalOrg:"+totalOrg);
    for(let i=0;i<totalOrg;i++){
        let currRow = myTable.insertRow(rowBuild+1);
        for(let j=0;j<=endYear-startYear;j++){
            let currCell = currRow.insertCell(j);
            if(startYear+j-1 == "2008"){
            currCell.innerHTML = "Organization Organization";
            }else{
            currCell.innerHTML = "No";
            }
        }
    }
}

setTimeout(() => {
    totalOrg = Object.keys(jsonData).length
    //console.log(totalOrg);
    testBuild(totalOrg);
    //console.log(typeof jsonData);
    //console.log(Object.keys(jsonData));
    console.log(jsonData);
    let currRow = 1;
    for (const [key, value] of Object.entries(jsonData)) {
        //document.getElementById("orgData").innerHTML += `${key}: ${value} <br>`;
        myTable.rows[currRow].cells[0].innerHTML = key;
        for(let i=0;i<value.length;i++){
            //introduce some formula here to solve it
            myTable.rows[currRow].cells[value[i]-startYear+1].innerHTML = "Yes";
        }
        currRow++;
    }
}, 2000);
