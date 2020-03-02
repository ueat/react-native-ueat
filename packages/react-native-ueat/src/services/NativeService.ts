import NativeServiceFactory from './NativeServiceFactory';
import { NativeWebView, RestaurantConfig } from '../types';

export default class NativeService {
  public webview: NativeWebView | undefined;

  onMessage(e: any, config: RestaurantConfig) {
    if (!this.webview) {
      return;
    }

    const data = JSON.parse(e.nativeEvent.data);
    if (!data.eventName) {
      return;
    }

    const service = NativeServiceFactory.create(data, this.webview);
    if (service) {
      service.execute(data, config);
    }
  }
}
