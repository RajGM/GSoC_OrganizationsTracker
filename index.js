console.log("Index.js running");
let jsonData;

fetch("./data.json")
.then(response => { 
    return response.json();
})
.then(
    data => console.log(data));
