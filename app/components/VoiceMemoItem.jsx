import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { ListItem, Button } from 'react-native-elements'

import { createAction } from '../utils'

function VoiceMemoItem({ recording, dispatch }) {
  return (
    <ListItem.Swipeable
      bottomDivider
      rightContent={
        <Button
          title="Delete"
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          onPress={() => {
            dispatch(createAction('records/del')({ recording }))
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
