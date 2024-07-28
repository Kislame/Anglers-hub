import { LatLngLiteral } from 'leaflet';
export async function getHumanReadableAddress(lat: number, lng: number) {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.GEOCODE_API_KEY}`
    );
    if (!response.ok) {
      return undefined;
    }
    const data = await response.json();
    if (data && data.results && data.results.length > 0) {
      return data.results[0].formatted;
    }

    throw new Error('No address found');
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Failed to get address');
  }
}

export async function getLocationByAdress(address: string | undefined) {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=103f1fb2a5ff4bddb15ee964ffe68be9`
    );
    if (!response.ok) {
      return undefined;
    }
    const data = await response.json();
    if (data && data.results && data.results.length > 0) {
      return data.results[0].geometry;
    }
    throw new Error('No address found');
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Failed to get address');
  }
}
