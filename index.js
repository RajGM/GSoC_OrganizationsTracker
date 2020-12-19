console.log("Index.js running");
let jsonData;
let startYear = 2009;
let endYear = 2021;
let totalOrg;
fetch("./data.json")
    .then(response => {
        return response.json();
    })
    .then(
        data => {
            jsonData = data;
        }
    );

for (let i = 0; i < 300; i++) {
    document.getElementById("orgData").innerHTML += `<div class="orgName"></div>`;
    for (let j = 0; j < endYear - startYear; j++) {
        document.getElementById("orgData").innerHTML += `<div class="boxClass">${j}</div>`;
    }
    document.getElementById("orgData").innerHTML += `<br>`;
}

/*
setTimeout(() => {
    for (const [key, value] of Object.entries(jsonData)) {
        document.getElementById("orgData").innerHTML += `${key}: ${value} <br>`;
    }
    totalOrg = Object.keys(jsonData).length
    console.log(totalOrg);
}, 2000);
*/