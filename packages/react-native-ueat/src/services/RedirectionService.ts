import { Linking } from 'react-native';
import BaseService from './BaseService';
import NativeServiceFactory from './NativeServiceFactory';

export default class RedirectionService extends BaseService {
  public async execute(data: any): Promise<void> {
    const url = data.value.url;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      return Linking.openURL(url);
    } else {
      throw Error(`Can't handle url: ${url}`);
    }
  }
}

NativeServiceFactory.register('redirection', RedirectionService);
