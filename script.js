function loco(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
el: document.querySelector("#main"),
smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
scrollTop(value) {
  return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
}, // we don't have to define a scrollLeft because we're only scrolling vertically.
getBoundingClientRect() {
  return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
},
// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
// loco()




const pickupInput = document.getElementById("pickup");
const dropInput = document.getElementById("drop");
const pickupBox = document.getElementById("pickup-suggestions");
const dropBox = document.getElementById("drop-suggestions");

const map = L.map("map").setView([28.6139, 77.2090], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let pickupMarker, dropMarker;

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
          if (markerType === "pickup") {
            pickupInput.value = div.textContent;
            const [lng, lat] = feature.geometry.coordinates;
            if (pickupMarker) map.removeLayer(pickupMarker);
            pickupMarker = L.marker([lat, lng]).addTo(map).bindPopup("Pickup: " + name).openPopup();
            map.setView([lat, lng], 14);
          } else {
            dropInput.value = div.textContent;
            const [lng, lat] = feature.geometry.coordinates;
            if (dropMarker) map.removeLayer(dropMarker);
            dropMarker = L.marker([lat, lng]).addTo(map).bindPopup("Drop: " + name).openPopup();
            map.setView([lat, lng], 14);
          }
        };
        box.appendChild(div);
      });
    });
}

// Event listeners
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





