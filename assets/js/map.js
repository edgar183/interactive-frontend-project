var map, input, poiIcon, places, infowindow, newLocation, autocomplete, selectedTypes, search;
var markers = [];
var ireland = { lat: 53.423956, lng: -7.941006 };

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

    //add search box on top left in map navigation
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
    autocomplete.addListener('place_changed', onPlaceChanged);
    infowindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });
    infowindow = new google.maps.InfoWindow();
    places = new google.maps.places.PlacesService(map);
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
    //get selected type from user
    selectedTypes = '';
    clearMarkers();
    markers = [];
    $('.types').each(function() {
        if ($(this).is(':checked')) {
            selectedTypes = ($(this).val());
            //clearMarkers();
            // markers = [];
        }
    });
    search = {
        location: newLocation,
        radius: 3000,
        types: [selectedTypes]
    };
    places.nearbySearch(search, callback);
}

function callback(results, status) {
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
            dropMarker(results[i], i * 100);

            console.log(results.placeId);
            showInfoWindow(results[i]);
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
//drop markers on map with time out
function dropMarker(position, timeout) {
    window.setTimeout(function() {
        //create marker for each result and place on map
        markers.push(new google.maps.Marker({
            map: map,
            position: position.geometry.location,
            animation: google.maps.Animation.DROP,
            icon: {
                url: poiIcon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(7, 24),
                scaledSize: new google.maps.Size(28, 28)
            }
        }));
    }, timeout);
    console.log(markers);
    //console.log(position.place_id);
    //console.log(position.name);
    //console.log(position.vicinity);
    // google.maps.event.addListener(position, 'click', showInfoWindow(position));
}
// Get the place details for each POI. Show the information in an info window,
// anchored on the marker for the place that the user selected.
function showInfoWindow(results) {
    console.log('the show info window function');
    places.getDetails(results, function(place, status) {
        console.log(status);
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }
        google.maps.event.addListener(results, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong></div>');
            infowindow.open(map, this);
        });
        //buildIWContent(place);
        console.log(place.placeId);
    });
    
}
// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
    console.log('call buildIWContent');
    document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
        'src="' + place.icon + '"/>';
    document.getElementById('iw-address').textContent = place.vicinity;
    console.log(place.vicinity);
    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
    }
    else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }
}
