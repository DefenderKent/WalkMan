import {ILocation} from '../store/types';

export function getAddressFromCoordinates(item: ILocation) {
  const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${'dCAzXdYVbQG82Be5FNHo17JRSaM2EcxsT_9Mhk5500U'}&mode=retrieveAddresses&prox=${
    item.latitude
  },${item.longitude}`;
  return fetch(url);
}
