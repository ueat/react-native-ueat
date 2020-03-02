import { RestaurantConfig, NativeWebView } from '../types';

export default abstract class BaseService {
  protected webview: NativeWebView;

  constructor(webview: NativeWebView) {
    this.webview = webview;
  }

  public abstract async execute(
    data: any,
    config: RestaurantConfig
  ): Promise<void>;

  public send(data: any) {
    if (data) {
      const { eventName, ...rest } = data;
      const jsCall = `
        receivedMessageFromReactNative({eventName: "${eventName}", value: ${JSON.stringify(
        rest
      )}});
        true;
      `;
      this.webview.injectJavaScript(jsCall);
    }
  }
}
