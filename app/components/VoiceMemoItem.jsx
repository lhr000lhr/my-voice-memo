import React from 'react'
import { ListItem, Button } from 'react-native-elements'
import Moment from 'moment'

function VoiceMemoItem({ recording, onPress, onPressConvertToText }) {
  return (
    <ListItem onPress={onPress} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{recording?.name}</ListItem.Title>
        <ListItem.Subtitle>{Moment(recording?.createdAt).calendar()}</ListItem.Subtitle>
      </ListItem.Content>
      {recording?.content?.RecognitionStatus === 'Success' ? (
        <Button
          title="preview content"
          onPress={onPressConvertToText}
          buttonStyle={{ backgroundColor: 'green' }}
        />
      ) : (
        <Button title="convert to text" onPress={onPressConvertToText} />
      )}

      <ListItem.Chevron />
    </ListItem>
  )
}

export default VoiceMemoItem
