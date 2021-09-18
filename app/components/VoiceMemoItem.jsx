import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { ListItem } from 'react-native-elements'

function VoiceMemoItem({ recording, onPress }) {
  return (
    <ListItem onPress={onPress} bottomDivider>
      <ListItem.Content>
        <Text>{recording?.uri}</Text>
      </ListItem.Content>
    </ListItem>
  )
}

export default connect()(VoiceMemoItem)
