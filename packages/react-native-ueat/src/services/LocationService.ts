import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import BaseService from './BaseService';
import NativeServiceFactory from './NativeServiceFactory';

interface GpsPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export default class LocationService extends BaseService {
  public async execute(): Promise<void> {
    const hasPermission = await this.askLocationPermission();
    if (!hasPermission) {
      this.send({
        eventName: 'get-location-failure',
        error: 'Permission denied'
      });
    }

    Geolocation.getCurrentPosition(
      (position: GpsPosition) => {
        this.send({
          eventName: 'get-location-success',
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      () => {
        this.send({
          eventName: 'get-location-failure',
          error: 'Cannot get location'
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  private async askLocationPermission() {
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    } else {
      return true;
    }
  }
}

NativeServiceFactory.register('get-location', LocationService);
