# LIFX Weather Controller
A quick and effective way to update your LIFX lights to display alerts by the
National Weather Service. Currently the only supported feature from the NWS are
issued alerts. This application calls the National Weather Service every 20
seconds (by default).

Currently, the application will only change lights for the following alerts:
* Tornado Warning
* Severe Thunderstorm Warning
* Flash Flood Warning

### Installation
1. `npm install` in this directory
2. `cp config.dev.js config.js` in this directory
3. Edit the contents of `config.js`.
    * You can request a token here: https://cloud.lifx.com/settings
    * You can edit the colors array to your liking
    * Edit the `refreshRate` to your liking. This is how many seconds you want
  to check the NWS's API to see if there are alerts for your location. The lower
  the value, the less latency.
4. Run `node index.js` and the application will start.

If you find that you want to keep this running for a while, it may not hurt to
place it on a VPS (or also run it using forever in the background of your
computer).


### Creator's Notes
If you find any issues please open an issue. If you want to contribute to the
project, feel free and open a pull request. Thanks!
