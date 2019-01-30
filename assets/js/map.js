var map, input, poiIcon;
var infowindow
var newLocation;
var autocomplete;
var markers = [];
var selectedTypes;
var ireland = { lat: 53.423956, lng: -7.941006 };
var MARKER_ICON = 'assets/icons/bar.png';

function initAutocomplete() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: ireland,
        streetViewControl: false,
        gestureHandling: 'cooperative',
        fullscreenControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        minZoom: 5,
        maxZoom: 18
    });
    //place radio button group on map control
    var radioButtons = document.getElementById('custom-controls');
    map.controls[google.maps.ControlPosition.RIGHT].push(radioButtons);

    // Create the autocomplete box
    input = document.getElementById('pac-input');
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    //add search box on top left in map navigation
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();
    var markerLocation = {
        url: 'assets/icons/location.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(7, 24),
        scaledSize: new google.maps.Size(28, 28)
    };
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(13);
        markers.push(new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            map: map,
            icon: markerLocation,
            title: 'Your are here',
            position: place.geometry.location
        }));
    }
    newLocation = place.geometry.location;

}

function renderMap() {
    console.log('the position of marker:' + newLocation);
    console.log('1 is: ' + selectedTypes);
    //get selected type
    selectedTypes = '';
    clearMarkers();
    markers = [];
    $('.types').each(function() {
        if ($(this).is(':checked')) {
            selectedTypes = ($(this).val());
            clearMarkers();
            markers = [];
        }
    });

    let search = {
        location: newLocation,
        radius: 3000,
        types: [selectedTypes]
    };
    console.log(selectedTypes);
    infowindow = new google.maps.InfoWindow();
    var places = new google.maps.places.PlacesService(map);
    places.nearbySearch(search, callback);
}

function callback(results, status) {
    console.log('callback function: ' + selectedTypes);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        clearResults();
        clearMarkers();
        for (var i = 0; i < results.length; i++) {
            //check the type of poi and asigne the corect icon image
            if (selectedTypes == 'museum') {
                poiIcon = 'assets/icons/camera.png';
            }
            else if (selectedTypes == 'lodging') {
                poiIcon = 'assets/icons/hotel.png';
            }
            else if (selectedTypes == 'bar') {
                poiIcon = 'assets/icons/bar.png';
            }
            else if (selectedTypes == 'restaurant') {
                poiIcon = 'assets/icons/restaurant.png';
            }
            //creat new marker for POI
            var markerIcon = {
                url: poiIcon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(7, 24),
                scaledSize: new google.maps.Size(28, 28)
            };
            markers[i] = new google.maps.Marker({
                map: map,
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
            });
            google.maps.event.addListener(markers[i], 'click', function() {
                infowindow.setContent(place.name + '<br>' + place.vicinity);
                //var infowindowContent = document.getElementById('info-content');
                //infowindow.setContent(infowindowContent);
                infowindow.open(map, this);
            });
        }
    }
}
//clear Markers from map
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}
//clear markers from map after change of location
function clearResults(marker) {
    for (var m in marker) {
        marker[m].setMap(null)
    }
    marker = []
}
/*
function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}

function addResult(result, i) {
    var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_ICON + markerLetter + '.png';

    var tr = document.createElement('tr');
    tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
    tr.onclick = function() {
        google.maps.event.trigger(markers[i], 'click');
    };

    var iconTd = document.createElement('td');
    var nameTd = document.createElement('td');
    var icon = document.createElement('img');
    icon.src = markerIcon;
    icon.setAttribute('class', 'placeIcon');
    icon.setAttribute('className', 'placeIcon');
    var name = document.createTextNode(result.name);
    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
}




// add info window to markers
function showInfoWindow() {
    var marker = this;
    places.getDetails({ placeId: marker.placeResult.place_id },
        function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            infowindow.open(map, marker);
            buildIWContent(place);
        });
}
// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
        'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
        '">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity;

    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
    }
    else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }
}
*/
