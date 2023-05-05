export function getElo(score) {
  if (2000 < score && score <= 2199) {
    return 'EN';
  } else if (2200 < score && score <= 2299) {
    return 'MI';
  } else if (2300 <= score && score <= 2499) {
    return 'MF';
  } else if (2500 <= score && score <= 2599) {
    return 'GM';
  } else if (2600 <= score && score <= 2799) {
    return 'SGM';
  } else if (2800 <= score ) {
    return 'CM';
  } else {
    return null;
  }
}
