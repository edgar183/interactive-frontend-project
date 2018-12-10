var infoBox = document.getElementById('info-dialog');
var btn = document.getElementById("info-btn");
btn.onclick = function() {
    infoBox.style.display = "block";
};
window.onclick = function(event) {
    if (event.target == infoBox) {
        infoBox.style.display = "none";
    }
};

var contactBox = document.getElementById('contact-dialog');
var btnContact = document.getElementById("contact-form");
btnContact.onclick = function() {
    contactBox.style.display = "block";
};
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    contactBox.style.display = "none";
};
$("button").hover(function(){
    $(this).css("background-color", "#428bca");
    }, function(){
    $(this).css("background-color", "inherit");
});