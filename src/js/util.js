export function homePageSelected() {
  return window.location.hash == '' || window.location.hash == '/';
}

export function homePageExists() {
  return !!$('.home-page').length;
}