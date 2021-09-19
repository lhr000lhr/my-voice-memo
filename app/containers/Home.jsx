import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Button } from 'react-native-elements'

import RecorderPanel from '../components/RecorderPanel'
import VoiceMemoItem from '../components/VoiceMemoItem'

import { createAction } from '../utils'

function Home({ records, dispatch, navigation }) {
  return (
    <View style={styles.container}>
      <SwipeListView
        style={styles.listStyle}
        contentContainerStyle={styles.containerStyle}
        data={records.data}
        keyExtractor={(_, i) => `${i}`}
        renderHiddenItem={({ item: recording, index }, rowMap) => (
          <Button
            title="Delete"
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{
              height: '100%',
              width: 100,
              alignSelf: 'flex-end',
              backgroundColor: 'red',
            }}
            onPress={() => {
              rowMap[index].closeRow()
              dispatch(createAction('records/del')({ recording }))
            }}
          />
        )}
        recalculateHiddenLayout
        rightOpenValue={-100}
        renderItem={({ item: recording, index }) => (
          <VoiceMemoItem
            key={index}
            recording={recording}
            onPress={() => {
              navigation.push('player', { title: '__TITLE__', filepath: recording.uri })
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
