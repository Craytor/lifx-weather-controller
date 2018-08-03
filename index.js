var config = require('./config')
var axios = require('axios')

var lifxUrl = 'https://api.lifx.com/v1/lights'

var determineEvent = null
var updateRequired = false


axios.defaults.headers.common['Authorization'] = 'Bearer ' + config.token;


getWeatherAlerts();
setInterval(function() {getWeatherAlerts() }, config.refreshRate * 1000)

function getWeatherAlerts() {
  axios.get('https://api.weather.gov/alerts?active=true&point=' + config.lat + ',' + config.lon).then(function(response) {
    var alerts = response.data.features;

    for(var i=0; i < alerts.length;  i++) {

      computeAlertEvent(alerts[i].properties.event)

      if(i == (alerts.length - 1)) {
        callLifxApi()
      }

    }

  })
}

function computeAlertEvent(event) {
  if(event == 'Tornado Warning') {
    determineEvent = 'tor'
    updateRequired = true;
  } else if (event == 'Severe Thunderstorm Warning') {
    if(determineEvent !== 'tor') {
      determineEvent = 'tstrm'
      updateRequired = true
    }
  } else if (event == 'Flash Flood Warning') {
    if(determineEvent !== 'tstrm') {
      determineEvent = 'ffw'
      updateRequired = true
    }
  } else {
    determineEvent = null
  }
}

function callLifxApi() {
  console.log('calling')
  if(determineEvent == null) {
    if(updateRequired) {
      setLightsToDefaultState()
      updateRequired = false;
    }
  } else {
    console.log('updating lights')
    axios.put(lifxUrl + '/all/state', {
      power: 'on',
      fast: true,
      color: config.colors.alerts[determineEvent],
      brightness: config.colors.default.brightness,
    }).catch(function(response)  {
      // error turing lights to default state
      console.log(response)
    })
  }

}

function setLightsToDefaultState() {
  console.log('setting to default')
  axios.put(lifxUrl + '/all/state', {
    power: 'on',
    fast: true,
    color: config.colors.default.color,
    brightness: config.colors.default.brightness,
  }).catch(function(response)  {
    // error turing lights to default state
    console.log(response)
  })
}
