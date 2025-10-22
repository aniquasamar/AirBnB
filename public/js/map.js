// Get the coordinates from the listing object
const coordinates = listing.geometry.coordinates;

// Get the location string for the popup
const listingLocation = listing.location;

// Flip the coordinates
// Mapbox/GeoJSON stores as [longitude, latitude]
// Leaflet needs them as [latitude, longitude]
const latLng = [coordinates[1], coordinates[0]];

// 1. Initialize the Leaflet map
// It will be placed in the <div> with the id "map"
const map = L.map('map').setView(latLng, 10); // Center on listing, zoom 10

// 2. Add the map's tile layer (the map image)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 3. Add the marker ("markup") to the map
const marker = L.marker(latLng)
  .addTo(map)
  .bindPopup(`<b>${listingLocation}</b><br>Exact location will be shown after booking for this listing.`)
  .openPopup();
// const map = L.map('map').setView([22.5744, 88.3629], 13); // [lat, lng], zoom level

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([22.5744, 88.3629]).addTo(map)
//     .bindPopup('Hello from Wanderlust!') // Add a popup
//     .openPopup(); // Open the popup by default
