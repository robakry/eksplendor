const ACCESS_TOKEN =
  "pk.eyJ1Ijoicm9iYWtyeSIsImEiOiJjbGl5bWRmMTMwamsxM2NwaHhpNHlhM2dpIn0._UNTQY4WU2L5oe0r6BHAXA";

const script = document.getElementById("search-js");
script.onload = () => {
  const elements = document.querySelectorAll("mapbox-address-autofill");
  for (const autofill of elements) {
    autofill.accessToken = ACCESS_TOKEN;
  }
};
