import React from 'react'
import { AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import { registerRootComponent } from 'expo'

import dva from './utils/dva'
import Router from './router'
import { registerModels } from './models'

const app = dva({
  initialState: {},
  models: [],
  extraEnhancers: [autoRehydrate()],
  onError(e) {
    console.log('onError', e)
  },
})

registerModels(app)

const App = app.start(<Router />)
persistStore(app.getStore(), {
  storage: AsyncStorage,
  blacklist: [],
})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App)
