export const formatDate = date => {
  const currentMonth = date.getMonth();
  const monthString =
    currentMonth >= 10 ? currentMonth + 1 : `0${currentMonth + 1}`;
  const currentDate = date.getDate();
  
  return `${date.getFullYear()}-${monthString}-${currentDate}`;
};

export const getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
