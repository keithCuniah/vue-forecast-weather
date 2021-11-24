import weatherConditions from '../IconComponent/weatherConditions';

const getIconByWeatherId = (weatherId) => {
  console.log('getIcon', weatherId);
  // This method return the corresponding icon depending on weather id
  console.log('shared', weatherConditions.correspondingWeather);
  // get corresponding weather from id
  const currentWeather = Object.keys(weatherConditions.correspondingWeather).find((key) =>
    weatherConditions.correspondingWeather[key].includes(weatherId)
  );

  // get corresponging icon
  const currentIcon = weatherConditions.correspondingIcon[currentWeather];
  return currentIcon;
};

export default { getIconByWeatherId };