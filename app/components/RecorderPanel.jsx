import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RecorderPanel() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>123</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: 200,
    width: '100%',
  },
})
