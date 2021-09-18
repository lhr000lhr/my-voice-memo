import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { ListItem, Button } from 'react-native-elements'

function VoiceMemoItem({ recording, onPress, onDelete }) {
  return (
    <ListItem.Swipeable
      onPress={onPress}
      bottomDivider
      rightContent={
        <Button
          title="Delete"
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          onPress={() => {
            onDelete()
          }}
        />
      }
    >
      <ListItem.Content>
        <Text>{recording?.uri}</Text>
      </ListItem.Content>
    </ListItem.Swipeable>
  )
}

export default connect()(VoiceMemoItem)
