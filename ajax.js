/*function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //cb(JSON.parse(this.responseText));
            document.getElementById("data").innerHTML = this.responseText;
        }
    };

    xhr.open("GET", "https://ecomfe.github.io/echarts-examples/public/data-gl/asset/data/flights.json");
    xhr.send();
}*/
function setup() {
    loadJSON("flights.json", gotData);
}

function gotData(data) {
   println(data);
}
