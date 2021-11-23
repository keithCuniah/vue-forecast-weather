const getFullCountryName = function (unicodeFlag) {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return regionNames.of(unicodeFlag).toUpperCase();
};

module.exports = {
  getFullCountryName,
};
