import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Button, View } from 'react-native'
import { Audio } from 'expo-av'

import { createAction } from '../utils'

function RecorderPanel({ dispatch }) {
  const [recording, setRecording] = React.useState()
  const [soundUrl, setSoundUrl] = React.useState()
  const [sound, setSound] = React.useState()
  const [pause, setPause] = React.useState(false)

  async function startRecording() {
    try {
      console.log('Requesting permissions..')
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      console.log('Starting recording..')
      const player = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
      setRecording(player.recording)
      console.log('Recording started')
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..')
    setRecording(undefined)
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    setSoundUrl(uri)

    dispatch(createAction('records/add')({ recording: { uri } }))
    console.log('Recording stopped and stored at', uri)
  }

  async function pauseRecording() {
    console.log('Pausing recording..')
    await recording.pauseAsync()
    setPause(true)
  }

  async function resumeRecording() {
    console.log('Pausing recording..')
    await recording.startAsync()
    setPause(false)
  }

  async function playSound() {
    console.log('Loading Sound')
    const player = await Audio.Sound.createAsync({ uri: soundUrl })
    setSound(player.sound)

    console.log('Playing Sound')
    await player.sound.playAsync()
  }

  React.useEffect(
    () =>
      sound
        ? () => {
            console.log('Unloading Sound')
            sound.unloadAsync()
          }
        : undefined,
    [sound]
  )

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button
        title={pause ? 'Pause' : 'resume'}
        onPress={pause ? resumeRecording : pauseRecording}
      />

      <Button
        title="Play Sound"
        onPress={() => {
          playSound()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: 200,
    width: '100%',
  },
})

export default connect()(RecorderPanel)
