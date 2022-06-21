//const campground = require("../../models/campground");
mapboxgl.accessToken ='pk.eyJ1IjoiZHJ1dmFrdW1hciIsImEiOiJjbDQ1OTkzaWEwN21zM2NzMHNzcmRhNnFjIn0.HBsiq-Rg2yQvIhFeEqz1-g'
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});


map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)
