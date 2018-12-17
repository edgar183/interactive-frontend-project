var origin = { lat: 53.423956, lng: -7.941006 };
var marker;

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: origin,
        streetViewControl: false,
        gestureHandling: 'cooperative'
    });
    var markerIcon = {
        url: 'assets/icons/location.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(7, 24),
        scaledSize: new google.maps.Size(28, 28)
    };
    //place marker on map
    marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: origin,
        map: map,
        title: 'Your are here',
        icon: markerIcon
    });
    //create search box
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    //place change event on search box
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
        //bound
        var bounds = new google.maps.LatLngBounds();
        var i, place;
        for (i = 0; place = places[i]; i++) {
            bounds.extend(place.geometry.location);
            marker.setPosition(place.geometry.location);
        }
        map.fitBounds(bounds);
        map.setZoom(18); //set zoom after pan t new location
    });
    /* var infowindow = new google.maps.InfoWindow({
         content: document.getElementById('infowindow-content')
     });

     google.maps.event.addEventListener(marker, 'click', function() {
         infowindow.open(map, marker);
     });*/
    marker.addListener('click', toggleBounce);

    //var clickHandler = new ClickEventHandler(map, origin);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    }
    else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}




/*var infowindow = new google.maps.InfoWindow();
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}*/

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });


    var ClickEventHandler = function(map, origin) {
        this.origin = origin;
        this.map = map;
        this.placesService = new google.maps.places.PlacesService(map);
        this.infowindow = new google.maps.InfoWindow;
        this.infowindowContent = document.getElementById('infowindow-content');
        this.infowindow.setContent(this.infowindowContent);
        // Listen for clicks on the map.
        this.map.addListener('click', this.handleClick.bind(this));
    };
    ClickEventHandler.prototype.handleClick = function(event) {
        console.log('You clicked on: ' + event.latLng);
        // If the event has a placeId, use it.
        if (event.placeId) {
            console.log('You clicked on place:' + event.placeId);
            event.stop();
            this.getPlaceInformation(event.placeId);
        }
    };
    ClickEventHandler.prototype.getPlaceInformation = function(placeId) {
        var me = this;
        this.placesService.getDetails({ placeId: placeId }, function(place, status) {
            if (status === 'OK') {
                me.infowindow.close();
                me.infowindow.setPosition(place.geometry.location);
                me.infowindowContent.children['place-icon'].src = place.icon;
                me.infowindowContent.children['place-name'].textContent = place.name;
                me.infowindowContent.children['place-address'].textContent = place.formatted_address;
                me.infowindow.open(me.map);
            }
        });
    };
}
