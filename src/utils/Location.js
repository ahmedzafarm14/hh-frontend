export default async function getLocation() {
  const position = await new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );

  const { latitude, longitude } = position.coords;
  const apiKey = import.meta.env.VITE_MAPS_API_KEY;

  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return {
      city: "",
      district: "",
      postalCode: "",
      addressDetails: "",
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    };
  }

  const components = data.results[0].components;

  const district = components.district || "";

  return {
    city: components.subdistrict || "",
    district: district,
    postalCode: components.postcode || "",
    addressDetails: data.results[0].formatted || "",
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  };
}
