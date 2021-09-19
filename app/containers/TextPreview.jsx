import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-elements'
import { createAction } from '../utils'

function TextPreview({ dispatch, route, textPreview }) {
  useEffect(() => {
    dispatch(createAction('textPreview/queryText')({ recording: route.params.recording }))
  }, [])

  const { loading, recording } = textPreview
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <Text>{recording?.content?.DisplayText}</Text>
      )}
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

export default connect(({ textPreview }) => ({ textPreview }))(TextPreview)
