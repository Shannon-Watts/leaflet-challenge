// Creating the map object
var myMap = L.map("map", {
    center: [0,0],
    zoom: 3
  });
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(myMap);

 // control layer 
//  var earthquakes = new L.LayerGroup();

//  var overlays = {
//     "Earthquakes": earthquakes
//  };

//  L
//     .control.layers(overlayMaps)
//     .addTo(myMap);


// All earthquake data from last 7 days 
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Get request using D3
d3.json(url).then(function(data) {
    function styleInfo (feature) {
        return {
            opacity: 0.6,
            fillOpacity: 1,
            fillColor: color(feature.geometry.coordinates[2]),
            // color: color,
            radius: radius(feature.properties.mag),
            stroke: true,
            weight: 0.5
                };
        }

// The colour of the marker based on the depth of the earthquake.
// depth = feature.geometry.coordinates[2]
    function color(depth) {
        switch (true) {
        case depth > 50:
            return "#A50000";
        case depth > 15:
            return "#75150A";
        case depth > 10:
            return "#BC2F1E";
        case depth > 8:
            return "#FE3409";
        case depth > 5:
            return "#FEBE09";
        case depth > 3:
            return "#F9E519";
        case depth > 1:
            return "#EEFE09";
        //default:
            //return "#EEF0DB";
        }
    }

// define the radius of the earthquake marker based on its magnitude.
    function radius(magnitude) {
        if (magnitude === 0) {
        return 1;
        }

    return magnitude * 3;
}

    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        }, 
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place +
            "<br>Depth: " + feature.geometry.coordinates[2]
            );
        },
    }).addTo(myMap);


// Create a control for layers, and add  overlays to it.
L.control.layers(null, null).addTo(myMap);

    // Create a legend to display information about map.

// var legend = L.control({position: 'bottomright'});

// list 
// categories = ['depth > 50','depth > 15','depth > 10','depth > 8','depth > 5', 'depth > 3', 'depth > 1'];
// colorSamples = ["#A50000", "#75150A", "#BC2F1E", "#FE3409", "#FEBE09", "#F9E519", "#EEFE09"]
// function colorLegend(colorSamples) {
//     if (categories == 'depth > 50') {
//         return "#A50000";
//     }

// }

var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'legend');
    labels = ['<strong>Earthquake Depth</strong>'],
    categories = ['depth > 50','depth > 15','depth > 10','depth > 8','depth > 5', 'depth > 3', 'depth > 1'];
    // create a list of colour samples depth criteria
    // shan finish the list 
    colorSamples = ["#A50000", "#75150A", "#BC2F1E", "#FE3409", "#FEBE09", "#F9E519", "#EEFE09"]
    
    for (var i = 0; i < (categories.length); i++) {
            div.innerHTML += 
            labels.push(
                '<i style="background:' + colorSamples[i] + '"></i> ' +
            (categories[i] ? categories[i] : '+'));
//  magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+"
        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    
legend.addTo(myMap);

    // legend.onAdd = function(map) {
    // var div = L.DomUtil.create("div", "legend");
  
//   // When the layer control is added, insert a div with the class of "legend".
//   legend.onAdd = function() {
//     var div = L
//         .DomUtil
//         .create("div", "info legend");

//         var grades = [0, 1, 2, 3, 4, 5];
//         var colors = [
//         "#98ee00",
//         "#d4ee00",
//         "#eecc00",
//         "#ee9c00",
//         "#ea822c",
//         "#ea2c2c"
//         ];


//         for (var i = 0; i < grades.length; i++) {
//         div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
//             grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
//         }
//         return div;;
//   };
//   // Add the info legend to the map.
  //legend.addTo(myMap);  



// // Legend
//     var legend = L.control({
//         position: "bottomright"
//     });
    
//     legend.onAdd = function() {
//         var div = L
//         .DomUtil
//         .create("div", "info legend");

//         var grades = [0, 1, 2, 3, 4, 5];
//         var colors = [
//         "#98ee00",
//         "#d4ee00",
//         "#eecc00",
//         "#ee9c00",
//         "#ea822c",
//         "#ea2c2c"
//         ];


//         for (var i = 0; i < grades.length; i++) {
//         div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
//             grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
//         }
//         return div;
//     };


//     legend.addTo(myMap);

});
