import * as FileSystem from 'expo-file-system'
import { createAction } from '../utils'

const token = `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiIyMThmNGYyZjQ4MTA0OWIyODQyMzJjNzAyY2IzOTNmZCIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy9iOGFlYjMyZi0wZjkzLTRmNmEtYjU1MC05YWFkOWMxY2M0ZjkvcmVzb3VyY2VHcm91cHMvdGVzdC9wcm92aWRlcnMvTWljcm9zb2Z0LkNvZ25pdGl2ZVNlcnZpY2VzL2FjY291bnRzL3Rlc3QtdGVzdCIsInNjb3BlIjoic3BlZWNoc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoc2VydmljZXMuZWFzdHVzIiwiZXhwIjoxNjMyMDMyMjk4LCJpc3MiOiJ1cm46bXMuY29nbml0aXZlc2VydmljZXMifQ.G2oPjXypMDS-NGbsIIq7j_nsJbLKUq5j2kFeu4JoC9I`
const endPoint = `https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`

export default {
  namespace: 'textPreview',
  state: {
    recording: {},
    loading: false,
  },
  reducers: {
    loadingStart(state) {
      return { ...state, loading: true }
    },
    loadingEnd(state) {
      return { ...state, loading: false }
    },
    update(state, { payload }) {
      const { content } = payload
      const { recording } = state
      return { ...state, recording: { ...recording, content } }
    },
  },
  effects: {
    *queryText({ payload }, { call, put }) {
      const { recording } = payload
      if (recording?.content?.RecognitionStatus === 'Success') {
        yield put(createAction('update')({ content: recording?.content }))
        return
      }

      yield put(createAction('loadingStart')())

      const options = {
        headers: {
          'Content-type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
          'Ocp-Apim-Subscription-Key': '0bef28ae7f444d5eab9a8ff3bd71b6a9',
          Accept: 'application/json',
          Authorization: token,
        },
      }
      const { body } = yield call(FileSystem.uploadAsync, endPoint, recording.uri, options)
      const content = JSON.parse(body)

      yield put(createAction('update')({ content }))
      yield put(createAction('records/update')({ recording, content }))

      yield put(createAction('loadingEnd')())
    },
  },
  subscriptions: {},
}
