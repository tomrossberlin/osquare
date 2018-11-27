import {AsyncStorage} from 'react-native';
import {action, observable} from "mobx";
import {api, client_id, client_secret, lat, lng, limit, lunchableCategories, v} from '../config/config';
import {getDistance} from '../utils/geo';

class VenueStore {
  @observable venues = [];
  @observable selectedId = '';

  search = `${api}?client_id=${client_id}&client_secret=${client_secret}&v=${v}&radius=250&limit=${limit}`;
  // lunchSearch = `${this.search}&categoryId=${lunchableCategories}`;

  recalculateDistances = (venues) => {
    return venues.map(venue => {
      const {location: {lat: lat2, lng: lng2}} = venue;
      venue.location.distance = getDistance(lat, lng, lat2, lng2);
      return venue;
    });
  };

  fetchVenuesForCoordinates = async (lat, lng) => {
    const response = await fetch(`${this.search}&ll=${lat},${lng}`);
    const responseJSON = await response.json();
    const {meta: {code, errorDetail}, response: {venues}} = responseJSON;
    if (code !== 200) {
      throw code ? `${code}: ${errorDetail}` : 'no response'
    }
    return venues;
  };

  @action fetchVenues = async () => {
    const north = 0.001124;
    const south = -north;
    const east = north * 1.643;
    const west = -east;

    let venues = [];
    venues.push(...(await this.fetchVenuesForCoordinates(lat, lng)));
    venues.push(...(await this.fetchVenuesForCoordinates(lat + north, lng + east)));
    venues.push(...(await this.fetchVenuesForCoordinates(lat + north, lng + west)));
    venues.push(...(await this.fetchVenuesForCoordinates(lat + south, lng + east)));
    venues.push(...(await this.fetchVenuesForCoordinates(lat + south, lng + west)));

    const uniqueIds = new Set();
    venues = venues.filter(venue => {
      const hasVenue = uniqueIds.has(venue.id);
      uniqueIds.add(venue.id);
      return !hasVenue;
    });

    venues = this.recalculateDistances(venues);
    venues.sort((a, b) => (a.location.distance > b.location.distance) ? 1 : -1);
    this.venues = venues;
  };

  @action setSelectedId = (id) => {
    this.selectedId = id;
  };

  @action saveAppState = async () => {
    const appState = {
      venues: this.venues,
      selectedId: this.selectedId,
    };
    await AsyncStorage.setItem('appState', JSON.stringify(appState));
  };

  @action loadAppState = async () => {
    const appState = JSON.parse(await AsyncStorage.getItem('appState'));
    this.venues = appState.venues;
    this.selectedId = appState.selectedId;
  };
}

export default new VenueStore();
