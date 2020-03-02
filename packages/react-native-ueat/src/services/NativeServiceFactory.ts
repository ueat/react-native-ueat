import BaseService from './BaseService';
import { NativeWebView } from '../types';

export default class NativeServiceFactory {
  private static events: {
    [name: string]: { new (webview: NativeWebView): BaseService };
  } = {};

  public static register(
    name: string,
    service: { new (webview: NativeWebView): BaseService }
  ) {
    NativeServiceFactory.events[name] = service;
  }

  public static create(
    data: any,
    webview: NativeWebView
  ): BaseService | undefined {
    if (!data.eventName || !NativeServiceFactory.events[data.eventName]) {
      return;
    }

    return new NativeServiceFactory.events[data.eventName](webview);
  }
}
