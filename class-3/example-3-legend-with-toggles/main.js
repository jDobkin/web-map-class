// Step 1: create the "map" object
// -------------------------------
mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v10",
  center: [-75.16362, 39.95238],
  zoom: 9.5,
});

// Step 2: add data sources and layers to the map after initial load
// -----------------------------------------------------------------

map.on("load", () => {
  // LOAD DATA: add geojson layers from SEPTA's open data portal
  map.addSource("regional-rail-line-geojson", {
    type: "geojson",
    data: "https://opendata.arcgis.com/datasets/48b0b600abaa4ca1a1bacf917a31c29a_0.geojson",
  });
  map.addSource("regional-rail-stop-geojson", {
    type: "geojson",
    data: "https://opendata.arcgis.com/datasets/64eaa4539cf4429095c2c7bf25c629a2_0.geojson",
  });

  // ADD LAYERS: regional rail stops and points
  map.addLayer({
    id: "rr-line",
    type: "line",
    source: "regional-rail-line-geojson",
    paint: {
      "line-opacity": 1,
      "line-width": 5,
      "line-color": "black",
    },
  });
  map.addLayer({
    id: "rr-stop",
    type: "circle",
    source: "regional-rail-stop-geojson",
    paint: {
      "circle-opacity": 1,
      "circle-radius": 5,
      "circle-color": "red",
    },
  });
});

// Step 3: define what happens when the legend form is clicked on

let form = document.getElementById("legend-form");
form.addEventListener("change", function () {
  let stations = form.elements["stations"];

  if (stations.checked) {
    map.setLayoutProperty("rr-stop", "visibility", "visible");
  } else {
    map.setLayoutProperty("rr-stop", "visibility", "none");
  }

  let routes = form.elements["routes"];
  if (routes.checked) {
    map.setLayoutProperty("rr-line", "visibility", "visible");
  } else {
    map.setLayoutProperty("rr-line", "visibility", "none");
  }
});
