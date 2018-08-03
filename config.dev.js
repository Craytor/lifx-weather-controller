module.exports = {
  token: null,
  lights: [
    null
  ],
  lat: 37.4260,
  lon: -79.1577,
  colors: {
    alerts: {
      ffw: 'green',
      tor: 'red',
      tstrm: 'orange'
    },
    default: {
      color: 'kelvin:9000',
      brightness: 1.0
    }
  },
  // how often to see if there are new alerts for your location in seconds.
  refreshRate: 20,
}
