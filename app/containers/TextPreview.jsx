import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { createAction } from '../utils'

function TextPreview({ dispatch, route }) {
  const { recording } = route.params
  useEffect(() => {
    dispatch(createAction('records/queryText')({ recording }))
  }, [])

  return (
    <View style={styles.container}>
      <Text>{recording.content.DisplayText}</Text>
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
  buttonStyle: {
    height: '100%',
    width: 100,
    alignSelf: 'flex-end',
    backgroundColor: 'red',
  },
})

export default connect(({ records }) => ({ records }))(TextPreview)
