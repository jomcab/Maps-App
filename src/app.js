"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var form = document.querySelector("form");
var addressInput = document.getElementById("address");
var GOOGLE_API_KEY = "AIzaSyCr9C85BOxxjFJtSosJ7Jt-NvZ3PQTthK4";
function searchAddressHandler(event) {
    event.preventDefault();
    var enteredAddress = addressInput.value;
    axios_1["default"]
        .get("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(enteredAddress) + "&key=" + GOOGLE_API_KEY)
        .then(function (response) {
        if (response.data.status !== "OK") {
            throw new Error("Could not fetch location!");
        }
        var coordinates = response.data.results[0].geometry.location;
        var map = new google.maps.Map(document.getElementById("map"), {
            center: coordinates,
            zoom: 16
        });
        new google.maps.Marker({ position: coordinates, map: map });
    })["catch"](function (err) {
        alert(err.message);
        console.log(err);
    });
}
form.addEventListener("submit", searchAddressHandler);
