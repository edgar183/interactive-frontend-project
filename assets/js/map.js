var origin = { lat: 53.3310561, lng: -7.6921 };

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: origin
    });
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    var markers = [];
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            }
            else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
    var clickHandler = new ClickEventHandler(map, origin);
}
/**
 * @constructor
 */

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
