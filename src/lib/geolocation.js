function geolocation () {
  if ('geolocation' in navigator) {
    // check if geolocation is supported/enabled on current browser
    return navigator.geolocation.getCurrentPosition(
      function success (position) {
        // for when getting location is a success
        return position
      },
      function error (errorMessage) {
        // for when getting location results in an error
        return errorMessage
      }
    )
  } else {
    // geolocation is not supported
    // get your location some other way
    return 'geolocation is not enabled on this browser'
  }
}

module.exports = geolocation
