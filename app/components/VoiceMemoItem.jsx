import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function VoiceMemoItem() {
  return (
    <View style={styles.container}>
      <Text>123</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
