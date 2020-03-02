import BaseService from './BaseService';
import LoadingService from './LoadingService';
import NativeServiceFactory from './NativeServiceFactory';

export default class ReloadService extends BaseService {
  public async execute(): Promise<void> {
    LoadingService.show();
    this.webview.reload();
  }
}

NativeServiceFactory.register('reload-webview', LoadingService);
