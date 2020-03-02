# react-native-ueat

## Installation

Install UEAT and it's dependencies:

```sh
yarn add react-native-ueat

yarn add @react-native-community/async-storage
react-native link @react-native-community/async-storage

yarn add react-native-device-info
react-native link react-native-device-info

yarn add react-native-webview
react-native link react-native-webview

yarn add react-native-geolocation-service
```

Follow the instructions to install [https://www.npmjs.com/package/react-native-geolocation-service](react-native-geolocation-service README)

## Usage

### `<UEATRestaurant />

Props:

- apiKey: Your restaurant API key
- culture (string): Your user culture (possible values: fr-CA, en-CA, en-US, en-UK, es-ES)
- renderLoading (ReactNode): Display a loading spinner while the page is loading
- renderError ((retry) => ReactNode): Display an error message and a button to retry
- onLeave (function): Go back to the application

## Example

```jsx
import React from 'react';
import {
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
import { UEATRestaurant } from 'react-native-ueat';

const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <UEATRestaurant
        apiKey="489eece4-2b9d-45a7-8da4-219e7bc59d68"
        culture="fr-CA"
        renderLoading={<ActivityIndicator size="large" color="#000000" />}
        renderError={retry => (
          <React.Fragment>
            <Text>An error has occured while loading</Text>
            <TouchableHighlight style={styles.button} onPress={retry}>
              <Text>Retry</Text>
            </TouchableHighlight>
          </React.Fragment>
        )}
        onLeave={() => console.warn('GO BACK TO APP')}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});

export default App;
```

[Go see the full example](https://github.com/UEAT/react-native-ueat/tree/master/examples/MrBurger).
