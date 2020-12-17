console.log("Index.js running");
let jsonData;

fetch("./data.json")
    .then(response => {
        return response.json();
    })
    .then(
        data => {
            jsonData = data;
        }
    );

setTimeout(() => {
    //console.log(jsonData);

    for (const [key, value] of Object.entries(jsonData)) {
        document.body.innerHTML += `${key}: ${value} <br>`;
        //console.log(`${key}: ${value}`);
    }

}, 2000);