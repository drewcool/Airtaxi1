

// const pickupInput = document.getElementById("pickup");
// const dropInput = document.getElementById("drop");
// const pickupBox = document.getElementById("pickup-suggestions");
// const dropBox = document.getElementById("drop-suggestions");

// const map = L.map("map").setView([28.6139, 77.2090], 13);
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: "&copy; OpenStreetMap contributors"
// }).addTo(map);

// let pickupMarker, dropMarker;
// let pickupCoords = null;
// let dropCoords = null;

// // Fetch suggestions from Photon
// function fetchSuggestions(query, box, markerType) {
//   fetch(`https://photon.komoot.io/api/?q=${query}&limit=5`)
//     .then((res) => res.json())
//     .then((data) => {
//       box.innerHTML = "";
//       data.features.forEach((feature) => {
//         const div = document.createElement("div");
//         const name = feature.properties.name || "Unknown";
//         const city = feature.properties.city || "";
//         div.textContent = `${name} - ${city}`;
//         div.onclick = () => {
//           box.innerHTML = "";
//           const [lng, lat] = feature.geometry.coordinates;
//           if (markerType === "pickup") {
//             pickupInput.value = div.textContent;
//             pickupCoords = [lat, lng];
//             if (pickupMarker) map.removeLayer(pickupMarker);
//             pickupMarker = L.marker([lat, lng]).addTo(map).bindPopup("Pickup: " + name).openPopup();
//             map.setView([lat, lng], 14);
//           } else {
//             dropInput.value = div.textContent;
//             dropCoords = [lat, lng];
//             if (dropMarker) map.removeLayer(dropMarker);
//             dropMarker = L.marker([lat, lng]).addTo(map).bindPopup("Drop: " + name).openPopup();
//             map.setView([lat, lng], 14);
//           }
//         };
//         box.appendChild(div);
//       });
//     });
// }









// // Event listeners
// pickupInput.addEventListener("input", () => {
//   if (pickupInput.value.length > 2) {
//     fetchSuggestions(pickupInput.value, pickupBox, "pickup");
//   }
// });

// dropInput.addEventListener("input", () => {
//   if (dropInput.value.length > 2) {
//     fetchSuggestions(dropInput.value, dropBox, "drop");
//   }
// });

// // Add taxi icons
// const taxiLocations = [
//   { lat: 28.614, lng: 77.205 },
//   { lat: 28.616, lng: 77.215 },
//   { lat: 28.610, lng: 77.210 }
// ];

// const taxiIcon = L.icon({
//   iconUrl: './drone.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32]
// });

// taxiLocations.forEach(loc => {
//   L.marker([loc.lat, loc.lng], { icon: taxiIcon })
//     .addTo(map)
//     .bindPopup("Available AirTaxi");
// });

// // Show Price Button Handler
// document.getElementById("showPriceBtn").addEventListener("click", () => {
//   if (!pickupCoords || !dropCoords) {
//     alert("Please select both pickup and drop points.");
//     return;
//   }

//   // Remove existing route (optional)
//   if (window.routeControl) {
//     map.removeControl(window.routeControl);
//   }

//   window.routeControl = L.Routing.control({
//     waypoints: [
//       L.latLng(pickupCoords[0], pickupCoords[1]),
//       L.latLng(dropCoords[0], dropCoords[1])
//     ],
//     router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
//     createMarker: () => null,
//     addWaypoints: false,
//     routeWhileDragging: false,
//     lineOptions: {
//       styles: [{ color: 'blue', weight: 5 }]
//     }
//   })
//     .on('routesfound', function (e) {
//       const route = e.routes[0];
//       const distanceInKm = route.summary.totalDistance / 1000;
//       const estimatedPrice = calculatePrice(distanceInKm);
//       document.getElementById("priceDisplay").innerText =
//         `Distance: ${distanceInKm.toFixed(2)} km | Estimated Price: ₹${estimatedPrice}`;
//     })
//     .addTo(map);
// });


// function calculatePrice(distanceKm) {
//   const baseFare = 50;
//   const perKmRate = 40;
//   return Math.round(baseFare + (distanceKm * perKmRate));
// }



// const todayBtn = document.getElementById("todayBtn");
// const calendarSection = document.getElementById("calendarSection");

// todayBtn.addEventListener("click", () => {
//   calendarSection.style.display = 
//     calendarSection.style.display === "none" ? "block" : "none";
// });


// const nowBtn = document.getElementById("nowBtn");
// const timeSection = document.getElementById("timeSection");

// nowBtn.addEventListener("click", () => {
//   timeSection.style.display = timeSection.style.display === "none" ? "block" : "none";
// });





const weatherAPIKey = 'fa617ab16995b11f80fd36b5ffc430ed'; // OpenWeatherMap API Key
const pickupInput = document.getElementById("pickup");
const dropInput = document.getElementById("drop");
const pickupBox = document.getElementById("pickup-suggestions");
const dropBox = document.getElementById("drop-suggestions");

const map = L.map("map").setView([28.6139, 77.2090], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let pickupMarker, dropMarker;
let pickupCoords = null;
let dropCoords = null;

// Fetch suggestions from Photon
function fetchSuggestions(query, box, markerType) {
  fetch(`https://photon.komoot.io/api/?q=${query}&limit=5`)
    .then((res) => res.json())
    .then((data) => {
      box.innerHTML = "";
      data.features.forEach((feature) => {
        const div = document.createElement("div");
        const name = feature.properties.name || "Unknown";
        const city = feature.properties.city || "";
        div.textContent = `${name} - ${city}`;
        div.onclick = () => {
          box.innerHTML = "";
          const [lng, lat] = feature.geometry.coordinates;
          if (markerType === "pickup") {
            pickupInput.value = div.textContent;
            pickupCoords = [lat, lng];
            if (pickupMarker) map.removeLayer(pickupMarker);
            pickupMarker = L.marker([lat, lng]).addTo(map).bindPopup("Pickup: " + name).openPopup();
            map.setView([lat, lng], 14);
          } else {
            dropInput.value = div.textContent;
            dropCoords = [lat, lng];
            if (dropMarker) map.removeLayer(dropMarker);
            dropMarker = L.marker([lat, lng]).addTo(map).bindPopup("Drop: " + name).openPopup();
            map.setView([lat, lng], 14);
          }
        };
        box.appendChild(div);
      });
    });
}

// Fetch Weather Data from OpenWeatherMap
async function getWeather(lat, lon) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`);
  const data = await response.json();
  return data.weather[0].main;  // Return weather condition (e.g., Rain, Clear)
}

// Check weather for both pickup and drop-off
async function checkWeatherAndDisplayRoute() {
  if (!pickupCoords || !dropCoords) return; // Ensure both points are selected

  const pickupWeather = await getWeather(pickupCoords[0], pickupCoords[1]);
  const dropWeather = await getWeather(dropCoords[0], dropCoords[1]);
  
  const routeWeather = pickupWeather === 'Rain' || dropWeather === 'Rain' ? 'Rain' : 'Clear';
  const routeColor = routeWeather === 'Rain' ? 'red' : 'green';

  // Draw route with appropriate color
  const route = [
    [pickupCoords[0], pickupCoords[1]],
    [dropCoords[0], dropCoords[1]]
  ];

  L.polyline(route, { color: routeColor, weight: 5 }).addTo(map);

  // Add weather warning at pickup and drop-off points
  if (routeWeather === 'Rain') {
    L.marker(pickupCoords).addTo(map)
      .bindPopup("Warning: Rainy conditions, be cautious!")
      .openPopup();

    L.marker(dropCoords).addTo(map)
      .bindPopup("Warning: Rainy conditions, be cautious!")
      .openPopup();
  }
}

// Event listeners for pickup and drop point inputs
pickupInput.addEventListener("input", () => {
  if (pickupInput.value.length > 2) {
    fetchSuggestions(pickupInput.value, pickupBox, "pickup");
  }
});

dropInput.addEventListener("input", () => {
  if (dropInput.value.length > 2) {
    fetchSuggestions(dropInput.value, dropBox, "drop");
  }
});

// Add taxi icons
const taxiLocations = [
  { lat: 28.614, lng: 77.205 },
  { lat: 28.616, lng: 77.215 },
  { lat: 28.610, lng: 77.210 }
];

const taxiIcon = L.icon({
  iconUrl: './drone.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

taxiLocations.forEach(loc => {
  L.marker([loc.lat, loc.lng], { icon: taxiIcon })
    .addTo(map)
    .bindPopup("Available AirTaxi");
});

// Show Price Button Handler
document.getElementById("showPriceBtn").addEventListener("click", async () => {
  if (!pickupCoords || !dropCoords) {
    alert("Please select both pickup and drop points.");
    return;
  }

  // Remove existing route (optional)
  if (window.routeControl) {
    map.removeControl(window.routeControl);
  }

  window.routeControl = L.Routing.control({
    waypoints: [
      L.latLng(pickupCoords[0], pickupCoords[1]),
      L.latLng(dropCoords[0], dropCoords[1])
    ],
    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
    createMarker: () => null,
    addWaypoints: false,
    routeWhileDragging: false,
    lineOptions: {
      styles: [{ color: 'blue', weight: 5 }]
    }
  })
    .on('routesfound', function (e) {
      const route = e.routes[0];
      const distanceInKm = route.summary.totalDistance / 1000;
      const estimatedPrice = calculatePrice(distanceInKm);
      document.getElementById("priceDisplay").innerText =
        `Distance: ${distanceInKm.toFixed(2)} km | Estimated Price: ₹${estimatedPrice}`;
    })
    .addTo(map);

  // Check weather and display route
  await checkWeatherAndDisplayRoute();
});

// Price Calculation Function
function calculatePrice(distanceKm) {
  const baseFare = 50;
  const perKmRate = 40;
  return Math.round(baseFare + (distanceKm * perKmRate));
}

const todayBtn = document.getElementById("todayBtn");
const calendarSection = document.getElementById("calendarSection");

todayBtn.addEventListener("click", () => {
  calendarSection.style.display = 
    calendarSection.style.display === "none" ? "block" : "none";
});

const nowBtn = document.getElementById("nowBtn");
const timeSection = document.getElementById("timeSection");

nowBtn.addEventListener("click", () => {
  timeSection.style.display = timeSection.style.display === "none" ? "block" : "none";
});

