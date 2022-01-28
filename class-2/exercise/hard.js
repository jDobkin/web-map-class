// going to add vector layer
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
  // LOAD DATA: add geojson layer from SEPTA's open data portal
  map.addSource("sidewalk-priorities", {
    type: "vector",
    data: "https://tiles.dvrpc.org/data/sidewalk-priorities.json",
  });

  // ADD LAYER: add regional rail layer as a line
  map.addLayer({
    id: "sidewalk-priorities",
    type: "line",
    source: "sidewalk-priorities",
    paint: {
      "line-opacity": 0.7,
      "line-width": {
        property: "count",
        stops: [
          [1, 1],
          [100, 2],
          [500, 4],
          [1000, 8],
        ],
      },
    },
  });
});