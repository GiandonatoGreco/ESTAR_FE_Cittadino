import * as L from 'leaflet';

const baseUrl = '/assets/img/markers/';

const defaultIconOptions: {
  iconSize?: L.PointExpression;
  shadowSize?: L.PointExpression;
  iconAnchor?: L.PointExpression;
  popupAnchor?: L.PointExpression;
  tooltipAnchor?: L.PointExpression;
} = {
  iconSize: [25, 41],
  shadowSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
};

export const currentPositionIcon = L.icon({
  iconUrl: `${baseUrl}currentPosition.svg`,
  ...defaultIconOptions,
  iconAnchor: [12, 12],
});

export const availableIcon = L.icon({
  ...defaultIconOptions,
  iconUrl: `${baseUrl}available.svg`,
});

export const availableActiveIcon = L.icon({
  ...defaultIconOptions,
  iconUrl: `${baseUrl}availableActive.svg`,
});

export const deskIcon = L.icon({
  ...defaultIconOptions,
  iconUrl: `${baseUrl}desk.svg`,
});

export const deskActiveIcon = L.icon({
  ...defaultIconOptions,
  iconUrl: `${baseUrl}deskActive.svg`,
});

export const notAvailableIcon = L.icon({
  ...defaultIconOptions,
  iconUrl: `${baseUrl}notAvailable.svg`,
});

export const notAvailableActiveIcon = L.icon({
  ...defaultIconOptions,
  iconUrl: `${baseUrl}notAvailableActive.svg`,
});

export const getIconType = (
  status?: 'yes' | 'no' | 'only_desk',
  isActive = false
) => {
  if (status === 'no')
    return isActive ? notAvailableActiveIcon : notAvailableIcon;
  if (status === 'only_desk') return isActive ? deskActiveIcon : deskIcon;
  return isActive ? availableActiveIcon : availableIcon;
};
