import React from 'react';
import LocationForm from './LocationForm'


class LocationControl extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        error: null,
        isGifLoaded: false,
        isWeatherLoaded: false,
        weatherData: {},
        giphyData: {},
        location: null
      };
  }

makeWeatherApiCall = (query) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
  .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          this.setState({
            isWeatherLoaded: true,
            weatherData: jsonifiedResponse
          });
        })
        .catch((error) => {
          this.setState({
            isWeatherLoaded: true,
            error
          });
        })
}

makeGiphyApiCall = (query) => {
  let actualQuery = query 
  fetch(`https://api.giphy.com/v1/gifs/search?q=${actualQuery}&limit=1&api_key=${process.env.REACT_APP_GIPHY_API_KEY}`)
  .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          this.setState({
            isGifLoaded: true,
            giphyData: jsonifiedResponse.data[0].images.original.url
          });
        })
        .catch((error) => {
          this.setState({
            isGifLoaded: true,
            error
          });
        })
}

handleSubmission = (location) => {
  this.setState({ location });
  this.makeWeatherApiCall(location)
  this.makeGiphyApiCall(location)
}
// new Date(unixDate).toLocaleString('en-US', {options here})
// d.toLocaleString('en-US', { timeZone: 'America/New_York' })

handleSunConverter = (unix, zone) => {

var d = new Date(unix * 1000)
var localTime = d.getTime()
var localOffset = d.getTimezoneOffset() * 60000
var utc = localTime + localOffset
var city = utc + (1000 * zone)
var date = new Date(city)
// console.log(nd)
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  // var date = new Date((unix * 1000));
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  
  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  
  return formattedTime
}
  render() {
    let results = null;
    if (this.state.location != null && this.state.isGifLoaded && this.state.isWeatherLoaded) {
      results = 
      <React.Fragment>
        <img src={this.state.giphyData} alt="sun pics"/>
        <p>Sunrise time in {this.state.location}: {this.handleSunConverter(this.state.weatherData.sys.sunrise, this.state.weatherData.timezone)}</p>
        <p>Sunset time in {this.state.location}: {this.handleSunConverter(this.state.weatherData.sys.sunset, this.state.weatherData.timezone)}</p>
      </React.Fragment>
    }
        return (
          <React.Fragment>
            <LocationForm onLocationSubmit={this.handleSubmission} />
            {results}
          </React.Fragment>
        )
      }
}

export default LocationControl