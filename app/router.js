import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import PlayerScreen from 'react-native-sound-playerview'

import Home from './containers/Home'
import TextPreview from './containers/TextPreview'

const Stack = createStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => ({
            gestureEnabled: true,
          })}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TextPreview" component={TextPreview} />
          <Stack.Screen name="player" component={PlayerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
