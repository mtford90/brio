/**
 * Location utilies.
 */


function getLocation() {
  return window.location.hash.slice(1);
}

function pathSelected(path) {
  var location = getLocation();
  if (!Array.isArray(path))
    path = path.split('/');
  location = location.split('/');
  for (var i = 0; i < path.length; i++) {
    var path1 = path[i];
    var path2 = location[i];
    if (path1 == path2) {
      continue;
    }
    return false;
  }
  return true;
}

function pathSelectedExactly(path) {
  var location = getLocation();
  if (!Array.isArray(path))
    path = path.split('/');
  location = location.split('/');
  if (path.length == location.length) {
    return pathSelected(path);
  }
  return false;
}

module.exports = {
  getLocation: getLocation,
  pathSelected: pathSelected,
  pathSelectedExactly: pathSelectedExactly,
};