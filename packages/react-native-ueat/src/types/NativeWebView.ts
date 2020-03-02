export default interface NativeWebView {
  reload: () => void;
  injectJavaScript: (data: string) => void;
}
