import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, FlatList } from 'react-native'

import RecorderPanel from '../components/RecorderPanel'
import VoiceMemoItem from '../components/VoiceMemoItem'

import { createAction } from '../utils'

function Home({ records, dispatch, navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listStyle}
        contentContainerStyle={styles.containerStyle}
        data={records.data}
        keyExtractor={(_, i) => `${i}`}
        renderItem={({ item: recording, index }) => (
          <VoiceMemoItem
            key={index}
            recording={recording}
            onPress={() => {
              navigation.push('player', { title: '__TITLE__', filepath: recording.uri })
            }}
            onDelete={() => {
              dispatch(createAction('records/del')({ recording }))
            }}
          />
        )}
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
  containerStyle: {},
})

export default connect(({ records }) => ({ records }))(Home)
