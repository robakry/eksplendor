mapboxgl.accessToken = mapBoxToken;
const map = new mapboxgl.Map({
  container: "show-page-map",
  projection: "equalEarth",
  style: "mapbox://styles/mapbox/outdoors-v12",
  center: placeMap.geometry.coordinates,
  zoom: 7,
  attributionControl: false,
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

const marker = new mapboxgl.Marker()
  .setLngLat(placeMap.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${placeMap.name}</h3><p>${placeMap.location}</p>`
    )
  )
  .addTo(map);
