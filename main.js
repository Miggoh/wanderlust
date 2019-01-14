// Foursquare API Info
const clientId = 'P3QOPHSAED4XA2VZ4NWJMPLLV3GCBMAHXWG4GQP0KPBLV5JO';
const clientSecret = '0KV52GXSPKGKFYN1OUI0OYGCM1TDBDCQSJNEGEVM0QBYZH2I';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';
const photoUrl = 'https://api.foursquare.com/v2/venues/';

// APIXU Info
const apiKey = '59c06c1bf4c54eb4b6b235130190901';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// AJAX functions here:
//Fetching venue info from Foursquare:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=3&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(parameter => parameter.venue);
	  //For debugging the venue data in console:
	  //console.log(venues);
      return venues;
  } else {
      throw new Error('Request failed!');
  }
}
  catch(error) {
    console.log(error.message);
  }
};

//Fetching venue photos from Foursquare (must be done in a separate request):
const getPhotos = async (venueId) => {
const photoUrlToFetch = `${photoUrl}${venueId}/photos?limit=1&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
  try {
  const response = await fetch(photoUrlToFetch);
  if(response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const photo = jsonResponse.response.photos.items[0];
    const venuePhotoSrc = `${photo.prefix}300x300${photo.suffix}`;
    //For debugging the photo data in console.
	//console.log(venuePhotoSrc);
    return await venuePhotoSrc;
  }
  else {
    throw new error('Request failed!');
  }
} catch(error) {
  console.log(error.message);
}}
/*Error 429 for the getPhotos url means you are over the daily free limit.
Foursquare Sandbox Account allows 50 "Premium calls" daily, which includes images.*/


//Fetching forecast from APIXU:
const getForecast = async () => {
  const urlToFetch = `${forecastUrl}${apiKey}&q=${$input.val()}&days=4&hour=11`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const days = jsonResponse.forecast.forecastday;
      return days;
  } else {
      throw new Error('Request failed!');
  }
}
  catch (error) {
    console.log(error.message);
  } 
};


// Render functions
//Venues:
const renderVenues = (venues) => {
  $venueDivs.forEach(async ($venue, index) => {
    const venue = venues[index];
	const venueId = venue.id;
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
	const venuePhotoSrc = await getPhotos(venueId);
//For createVenueHTML check helpers.js
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc, venuePhotoSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

//Forecast:
const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    const currentDay = days[index];
//For createWeatherHTML check helpers.js
    let weatherContent = createWeatherHTML(currentDay);
    $day.append(weatherContent);
  });
};

//Clearing previous info and starting a new search:
const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
};

$submit.click(executeSearch);