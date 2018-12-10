function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
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
