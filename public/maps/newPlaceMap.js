mapboxgl.accessToken = mapBoxToken;
const map = new mapboxgl.Map({
  container: "new-place-map",
  projection: "globe",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [11.351032, 49.624946],
  attributionControl: false,
  zoom: 8,
});

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  })
);

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

const searchBar = document.querySelector(".mapboxgl-ctrl-geocoder--input");
const locationInput = document.querySelector("#location");

searchBar.addEventListener("change", function () {
  locationInput.value = searchBar.value;
});
