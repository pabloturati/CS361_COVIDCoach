// Map Stuff:

// Array of pins
const markers = [{
        coords: {
            lat: 40.710255,
            lng: -74.005058
        },
        content: 'NewYork Presbyterian Hospital - 170 William St, New York, NY 10038 - (212) 312-5000'
    },
    {
        coords: {
            lat: 45.4993,
            lng: -122.6849
        },
        content: 'OHSU Hospital - 3181 SW Sam Jackson Park Rd, Portland, OR 97239 - (503) 494-8311'
    },
    {
        coords: {
            lat: 37.7631,
            lng: -122.4578
        },
        content: 'UCSF Medical Center - 505 Parnassus Ave, San Francisco, CA 94143 - (415) 476-1000'
    },
    {
        coords: {
            lat: 29.7107,
            lng: -95.3996
        },
        content: 'Houston Methodist Hospital - 6565 Fannin St, Houston, TX 77030 - (713) 790-3311'
    }
]


function initMap() {

    // Map options
    const options = {
        zoom: 12,
        center: {
            lat: 45.5051,
            lng: -122.6750
        }
    }

    // New map
    map = new google.maps.Map(document.getElementById('map'), options)

    const addMarker = (props) => {
        // Add marker
        const marker = new google.maps.Marker({
            position: props.coords,
            map: map
        })

        // Check to see if there is
        if (props.content) {

            // Displays a popup when a pin is clicked
            const infoWindow = new google.maps.InfoWindow({
                content: props.content
            })

            // Displays a pin on the map
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            })
        }
    }


    // Event listners to switch between the different markers
    google.maps.event.addDomListener(document.getElementById('map-newyork'), 'click', () => {
        // window.alert('Button clickerd');
        map.setCenter(markers[0].coords)
    });
    google.maps.event.addDomListener(document.getElementById('map-oregon'), 'click', () => {
        // window.alert('Button clickerd');
        map.setCenter(markers[1].coords)
    });
    google.maps.event.addDomListener(document.getElementById('map-sanfran'), 'click', () => {
        // window.alert('Button clickerd');
        map.setCenter(markers[2].coords)
    });
    google.maps.event.addDomListener(document.getElementById('map-houston'), 'click', () => {
        // window.alert('Button clickerd');
        map.setCenter(markers[3].coords)
    });


    // For each pin, we add it to the map
    markers.forEach((marker) => {
        addMarker(marker)
    })
}