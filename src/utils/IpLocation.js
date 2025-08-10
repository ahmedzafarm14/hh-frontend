export const getUserLocationFromIP = async () => {
  const loc = await fetch(import.meta.env.VITE_IP_LOCATION_API);
  const data = await loc.json();
  const [lat, lng] = data.loc.split(",").map(Number);
  const location = {
    type: "Point",
    coordinates: [lng, lat], // GeoJSON expects [longitude, latitude]
  };

  return location;
};
