import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import {UEATRestaurant} from 'react-native-ueat';

const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default App;
