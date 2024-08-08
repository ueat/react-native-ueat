import React, { useEffect, useRef, useCallback, useState } from 'react';
import { WebView } from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';

import { generateRestaurantURL } from './utils/uri';
import NativeService from './services/NativeService';
import { NativeWebView } from './types';
import { StyleSheet, View } from 'react-native';
import LoadingService from './services/LoadingService';
import LeaveService from './services/LeaveService';

interface Props {
  apiKey: string;
  culture: string;
  isMarketplace: boolean;
  renderLoading?: React.ReactNode;
  renderError?: (retry: () => void) => React.ReactNode;
  onLeave?: () => void;
}

let deviceUserAgent = 'Unknown';
DeviceInfo.getUserAgent()
  .then(userAgent => (deviceUserAgent = userAgent))
  .catch(() => (deviceUserAgent = 'Unknown'));

function UEATRestaurant({
  apiKey,
  culture,
  isMarketplace,
  renderError,
  renderLoading,
  onLeave
}: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webviewRef = useRef<NativeWebView | undefined>();
  const nativeServiceRef = useRef<NativeService>(new NativeService());

  const setWebviewRef = useCallback(ref => {
    webviewRef.current = ref as NativeWebView;
    nativeServiceRef.current!.webview = webviewRef.current;
  }, []);

  useEffect(() => {
    LoadingService.updateCallback(setLoading);
  }, []);

  useEffect(() => {
    LeaveService.updateCallback(onLeave);
  }, [onLeave]);

  const retry = useCallback(() => {
    setLoading(true);
    setError(false);
    webviewRef.current!.reload();
  }, []);

  const onErrorInner = useCallback(() => {
    setError(true);
    setLoading(false);
  }, []);

  const onMessageInner = useCallback(
    (e: any) => {
      nativeServiceRef.current!.onMessage(e, {
        apiKey,
        culture,
        isMarketplace
      });
    },
    [nativeServiceRef.current, apiKey, culture]
  );

  const uri = generateRestaurantURL({ apiKey, culture, isMarketplace });

  return (
    <View style={styles.container}>
      <WebView
        userAgent={`${deviceUserAgent} - UEAT Native App - ${DeviceInfo.getBundleId()} - ${DeviceInfo.getVersion()}`}
        bounces={false}
        originWhitelist={['*']}
        source={{ uri }}
        renderError={() => <></>}
        renderLoading={() => <></>}
        onError={onErrorInner}
        onMessage={onMessageInner}
        ref={setWebviewRef}
      />
      {loading && !!renderLoading && (
        <View style={styles.spinner}>{renderLoading}</View>
      )}
      {error && !!renderError && (
        <View style={styles.spinner}>{renderError(retry)}</View>
      )}
    </View>
  );
}

UEATRestaurant.defaultProps = {
  isMarketplace: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default UEATRestaurant;
