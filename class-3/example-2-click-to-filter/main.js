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
  map.addSource("regional-rail-line-geojson", {
    type: "geojson",
    data: "https://opendata.arcgis.com/datasets/48b0b600abaa4ca1a1bacf917a31c29a_0.geojson",
  });

  // ADD LAYER: this will show the selected RR line
  // by default it's filtered to show no features
  map.addLayer({
    id: "selected-rr-line",
    type: "line",
    source: "regional-rail-line-geojson",
    paint: {
      "line-opacity": 1,
      "line-width": 50,
      "line-color": "yellow",
    },
    filter: ["==", "Route_Name", "none"],
  });

  // ADD LAYER: add regional rail layer as a line
  map.addLayer({
    id: "rr-lines",
    type: "line",
    source: "regional-rail-line-geojson",
    paint: {
      "line-opacity": 0.7,
      "line-width": {
        property: "Annual_Revenue",
        stops: [
          [100000, 1],
          [1000000, 2],
          [5000000, 4],
          [10000000, 8],
          [15000000, 15],
          [30000000, 30],
        ],
      },
    },
  });

  // Add a popup to the map when the user mouses over a RR line
  map.on("mouseenter", "rr-lines", (e) => {
    // get the attributes for the specific feature under the mouse
    let properties = e.features[0].properties;
    let routename = properties["Route_Name"];
    let boards = properties["Total_Weekday_Boards"];
    let alights = properties["Total_Weekday_Leaves"];

    // build a HTML template with the values for this feature
    let message = `
      <h3>${routename}</h3>
      <ul>
        <li>Total weekday boards: ${boards}</li>
        <li>Total weekday alights: ${alights}</li>
      </ul
    `;

    // create the popup and add it to the map
    let popup = new mapboxgl.Popup({
      closeButton: false,
      className: "popup-style",
    });

    popup.setLngLat(e.lngLat).setHTML(message).addTo(map);
  });

  // Remove popup from the map when the user's mouse is no longer
  // hovering over a RR line
  map.on("mouseleave", "rr-lines", (e) => {
    // get all HTML elements with the class name 'popup-style'
    let popup = document.getElementsByClassName("popup-style");

    // remove all elements with this class name
    if (popup.length) {
      popup[0].remove();
    }
  });

  // When the user clicks on a RR line, filter the 'selected'
  // layer to show all features with that specific 'Route_Name'
  // and also update the floating text box
  map.on("click", "rr-lines", (e) => {
    // filter map layer
    let clicked_routename = e.features[0].properties["Route_Name"];
    map.setFilter("selected-rr-line", ["==", "Route_Name", clicked_routename]);

    let div = document.getElementById("user-feedback");
    div.innerText = "You clicked on " + clicked_routename;
  });
});
