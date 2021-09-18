import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import RecorderPanel from '../components/RecorderPanel'
import VoiceMemoItem from '../components/VoiceMemoItem'

export default function Home() {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listStyle}
        contentContainerStyle={styles.containerStyle}
        data={[1, 1, 1]}
        keyExtractor={(_, i) => `${i}`}
        renderItem={({ index }) => <VoiceMemoItem key={index} />}
      />
      <RecorderPanel />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listStyle: {
    width: '100%',
  },
  containerStyle: {
    backgroundColor: 'red',
  },
})
