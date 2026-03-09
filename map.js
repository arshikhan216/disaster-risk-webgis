// Create the map centered on India
var map = L.map('map').setView([22.5937, 78.9629], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Load disaster GeoJSON data
fetch("disaster_data.geojson")
.then(response => response.json())
.then(data => {

    L.geoJSON(data, {

        pointToLayer: function(feature, latlng) {

            var color = "blue";

            if(feature.properties.risk === "High"){
                color = "red";
            }
            else if(feature.properties.risk === "Medium"){
                color = "orange";
            }
            else if(feature.properties.risk === "Low"){
                color = "blue";
            }

            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: color,
                color: "#000",
                weight: 1,
                fillOpacity: 0.8
            });

        },

        onEachFeature: function(feature, layer){

            layer.bindPopup(
                "<b>Disaster:</b> " + feature.properties.type +
                "<br><b>Location:</b> " + feature.properties.location +
                "<br><b>Risk:</b> " + feature.properties.risk
            );

        }

    }).addTo(map);

});

// Last updated time
const now = new Date();
document.getElementById("updateTime").innerHTML =
"Last Updated: " + now.toLocaleString();