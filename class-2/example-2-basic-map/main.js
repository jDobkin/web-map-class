// from: https://docs.mapbox.com/help/tutorials/add-points-pt-3/

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/examples/cjgiiz9ck002j2ss5zur1vjji",
  center: [-87.661557, 41.893748],
  zoom: 10.7,
});
