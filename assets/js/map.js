var map, input, poiIcon, places, infowindow, autocomplete, selectedTypes, search;
var markers = [];
var ireland = { lat: 53.423956, lng: -7.941006 };

function initAutocomplete() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: ireland,
        streetViewControl: false,
        gestureHandling: 'cooperative',
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        minZoom: 5,
        maxZoom: 18
    });
    //place radio button group on map control
    var radioButtons = document.getElementById('custom-controls');
    map.controls[google.maps.ControlPosition.RIGHT].push(radioButtons);
    // Create the autocomplete box
    input = document.getElementById('pac-input');
    autocomplete = new google.maps.places.Autocomplete((input), {
        types: ['(cities)']
    });
    //add search box on top center in map navigation
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    autocomplete.addListener('place-changed', onPlaceChanged);

    infowindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });
    places = new google.maps.places.PlacesService(map);
}
//change place on map when user enters destination and selects it from list
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
}
function renderMap() {
    //get selected type from user input from radio buttons
    selectedTypes = '';
    clearMarkers();
    markers = [];
    $('.types').each(function() {
        if ($(this).is(':checked')) {
            selectedTypes = ($(this).val());
        }
    });
    search = {
        bounds: map.getBounds(),
        types: [selectedTypes]
    };
    places.nearbySearch(search, callback);
}
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
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
            markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: {
                    url: poiIcon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(7, 24),
                    scaledSize: new google.maps.Size(28, 28)
                }
            });
            markers[i].placeResult = results[i];
            google.maps.event.addListener(markers[i], 'click', showInfoWindow);
            setTimeout(dropMarker(i), i * 100);
        }
    }
}
//clear Markers from the map before placing new ones
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}
//drop markers on map with time out
function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}
// Get the place details for each POI. Show the information in an info window,
// anchored on the marker for the place that the user selected.
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
    document.getElementById('iw-name').innerHTML = '<b>' + place.name + '</b>';
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
