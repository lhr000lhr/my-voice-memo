import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Button } from 'react-native'
import { Audio } from 'expo-av'
import { SafeAreaView } from 'react-native-safe-area-context'

import { createAction } from '../utils'

function RecorderPanel({ dispatch }) {
  const [recording, setRecording] = React.useState()
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

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {recording && (
        <Button
          title={pause ? 'resume' : 'Pause'}
          onPress={pause ? resumeRecording : pauseRecording}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    width: '100%',
  },
})

export default connect()(RecorderPanel)
