const PI = Math.PI;
const RADIUS_OF_EARTH = 6371e3;

const greatCircleDistance = (
  source: Coordinates,
  destination: Coordinates,
): number => {
  const { latitude: sourceLatitude, longitude: sourceLongitude } = source;
  const { latitude: destinationLatitude, longitude: destinationLongitude } =
    destination;

  // const dLat = getRadians(lat2) - getRadians(lat1);
  // const dLng = getRadians(lng2) - getRadians(lng1);

  const φ1 = getRadians(sourceLatitude);
  const φ2 = getRadians(destinationLatitude);
  const Δφ = getRadians(destinationLatitude - sourceLatitude);
  const Δλ = getRadians(destinationLongitude - sourceLongitude);

  /**
   * Havershine's formula
   *
   */

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = RADIUS_OF_EARTH * c;

  // distance in kms.
  return d / 1000;
};

const getRadians = (coordinate: number): number => {
  return (coordinate * PI) / 180;
};

export default greatCircleDistance;
