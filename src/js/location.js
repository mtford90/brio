/**
 * Location utilies.
 */


function getLocation() {
  return window.location.hash.slice(1);
}

function pathSelected(path) {
  var location = getLocation();
  console.log('location', location);
  return location.startsWith(path);
}

module.exports = {
  getLocation: getLocation,
  pathSelected: pathSelected
};