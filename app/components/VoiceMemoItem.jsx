import React from 'react'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import Moment from 'moment'

function VoiceMemoItem({ recording, onPress }) {
  return (
    <ListItem onPress={onPress} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{recording.name}</ListItem.Title>
        <ListItem.Subtitle>{Moment(recording.createdAt).calendar()}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )
}

export default connect()(VoiceMemoItem)
