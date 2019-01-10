// Foursquare API Info
const clientId = 'P3QOPHSAED4XA2VZ4NWJMPLLV3GCBMAHXWG4GQP0KPBLV5JO';
const clientSecret = '0KV52GXSPKGKFYN1OUI0OYGCM1TDBDCQSJNEGEVM0QBYZH2I';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = '59c06c1bf4c54eb4b6b235130190901';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// AJAX functions here:
const getVenues = () => {

}

const getForecast = () => {

}