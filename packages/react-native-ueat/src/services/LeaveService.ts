import BaseService from './BaseService';
import NativeServiceFactory from './NativeServiceFactory';

export default class LeaveService extends BaseService {
  private static callback: (() => void) | undefined;

  public async execute(): Promise<void> {
    if (LeaveService.callback) {
      LeaveService.callback();
    }
  }

  static updateCallback(callback?: () => void) {
    this.callback = callback;
  }
}

NativeServiceFactory.register('back-home', LeaveService);
