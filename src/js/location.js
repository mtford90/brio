/**
 * Location utilies.
 */


function getLocation() {
  return window.location.hash.slice(1);
}

function pathSelected(path) {
  var location = getLocation();
  path = path.split('/');
  location = location.split('/');
  for (var i=0;i<path.length;i++) {
    if (path[i] == location[i]) {
      continue;
    }
    return false;
  }
  return true;
}

module.exports = {
  getLocation: getLocation,
  pathSelected: pathSelected
};