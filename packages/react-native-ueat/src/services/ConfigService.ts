import AsyncStorage from '@react-native-community/async-storage';
import BaseService from './BaseService';
import { RestaurantConfig } from '../types';
import NativeServiceFactory from './NativeServiceFactory';

export default class ConfigService extends BaseService {
  public async execute(data: any, config: RestaurantConfig): Promise<void> {
    if (data.eventName === 'load-config') {
      await this.load(config.apiKey);
    } else {
      await this.save(config.apiKey, data.value);
    }
  }

  private async load(apiKey: string) {
    const config = (await AsyncStorage.getItem(`ueat-${apiKey}`)) || '{}';
    this.send({ eventName: 'saved-config', config });
  }

  private async save(apiKey: string, config: any) {
    AsyncStorage.setItem(`ueat-${apiKey}`, JSON.stringify(config));
  }
}

NativeServiceFactory.register('load-config', ConfigService);
NativeServiceFactory.register('save-config', ConfigService);
