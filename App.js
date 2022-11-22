import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import StudentDetail from './src/screen/StudentDetail';
import StudentScreen from './src/screen/StudentScreen';
import SubjectDetail from './src/screen/SubjectDetail';
import SubjectScreen from './src/screen/SubjectScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Subject' component={SubjectScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Student' component={StudentScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Student Detail' component={StudentDetail} />
          <Stack.Screen name='Subject Detail' component={SubjectDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
