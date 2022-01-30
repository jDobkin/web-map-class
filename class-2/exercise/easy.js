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
  // LOAD DATA: add geojson layer from SEPTA's open data portal
  map.addSource("freight-centers-geojson", {
    type: "geojson",
    data: "https://opendata.arcgis.com/datasets/3166ff9e33fd42829b9fc900fdc8b67d_0.geojson",
  });

  // ADD LAYER: add regional rail layer as a line
  map.addLayer({
    id: "freight-centers",
    type: "fill",
    source: "freight-centers-geojson",
    paint: {
        "fill-opacity": {
            property: "frght_est",
            stops: [
                [1, 0.1],
                [5, 0.2],
                [10, 0.3],
                [20, 0.4],
                [40, 0.5],
                [50, 0.6],
                [100, 0.8],
            ]
        },
        "fill-color": [
            "case",
            ["==",["get", "types"], "Heavy Industrial"],
            "green",
            ["==",["get", "types"], "Local Manufacturing and Distribution"],
            "blue",
            ["==",["get", "types"], "Distribution and Logistics"],
            "green",
            ["==",["get", "types"], "High Tech Manufacturing"],
            "purple",
            ["==",["get", "types"], "International Gateway"],
            "gray",
            "magenta",
        ],
    },
  });
});

map.on("mouseover", (e) => {
    const features = map.queryRenderedFeatures(e.point);
    const displayProperties = [
        'types',
        'frght_est'
    ];

    const displayFeatures = features.map((feat) => {
        const displayFeat = {};
        displayProperties.forEach((prop) => {
            displayFeat[prop] = feat[prop];
        });
        return displayFeat;
    });

    document.getElementById('features').innerHTML = JSON.stringify(
        displayFeatures,
        null,
        2
    );
});
