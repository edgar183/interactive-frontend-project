function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        mapTypeId: 'roadmap',
        center: {
            lat: 53.3310561,
            lng: -7.6921
        }
    });
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
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


    map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/google.json');
    map.data.setStyle({
        icon: '//example.com/path/to/image.png',
        fillColor: 'green'
    });
    map.data.addListener('mouseover', function(event) {
        map.data.overrideStyle(event.feature, { fillColor: 'red' });
    });
    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
    });
}
