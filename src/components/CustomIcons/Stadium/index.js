import L from 'leaflet';

const stadiumIcon = new L.Icon({
  iconUrl: require('../../../assets/soccer-field.svg'),
  iconRetinaUrl: require('../../../assets/soccer-field.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [45, 55],
  shadowUrl: '../../../assets/soccer-field.svg',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

export default stadiumIcon;
