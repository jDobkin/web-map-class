// from: https://docs.mapbox.com/help/tutorials/add-points-pt-3/

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";
const map = new mapboxgl.Map ({
  container: "map",
  style: "mapbox://styles/mapbox/outdoors-v11",
  center: [-75.16362, 39.95238],
  zoom: 9.5,
});

map.on("load", function(){
  map.addSource("pev",{
    type: "vector",
    url: "https://tiles.dvrpc.org/data/dvrpc-municipal.json"
  })

  map.addLayer({
    id: "pev",
    type: "fill",
    source: "SUM_CurPEV",
    "source-layer": "pev",
    paint: {
      "fill-opacity": 0.5,
      "fill-color": "green"
    }
  });
});