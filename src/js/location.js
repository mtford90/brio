/**
 * Location utilies.
 */


function getLocation() {
  return window.location.hash.slice(1);
}

function pathSelected(path) {
  var location = getLocation();
  return location.startsWith(path);
}

module.exports = {
  getLocation: getLocation,
  pathSelected: pathSelected
};