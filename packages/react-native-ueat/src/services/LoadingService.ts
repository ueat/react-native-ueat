import BaseService from './BaseService';
import NativeServiceFactory from './NativeServiceFactory';

export default class LoadingService extends BaseService {
  private static callback: ((value: boolean) => void) | undefined;

  public async execute(data: any): Promise<void> {
    if (LoadingService.callback) {
      if (data.eventName === 'set-loading-begin') {
        LoadingService.show();
      } else {
        LoadingService.hide();
      }
    }
  }

  static updateCallback(callback: (value: boolean) => void) {
    this.callback = callback;
  }

  static show() {
    LoadingService.callback && LoadingService.callback(true);
  }

  static hide() {
    LoadingService.callback && LoadingService.callback(false);
  }
}

NativeServiceFactory.register('set-loading-begin', LoadingService);
NativeServiceFactory.register('loading-end', LoadingService);
