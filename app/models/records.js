import _ from 'lodash'
import Moment from 'moment'
import * as FileSystem from 'expo-file-system'
import { createAction } from '../utils'

const token = `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiIyMThmNGYyZjQ4MTA0OWIyODQyMzJjNzAyY2IzOTNmZCIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy9iOGFlYjMyZi0wZjkzLTRmNmEtYjU1MC05YWFkOWMxY2M0ZjkvcmVzb3VyY2VHcm91cHMvdGVzdC9wcm92aWRlcnMvTWljcm9zb2Z0LkNvZ25pdGl2ZVNlcnZpY2VzL2FjY291bnRzL3Rlc3QtdGVzdCIsInNjb3BlIjoic3BlZWNoc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoc2VydmljZXMuZWFzdHVzIiwiZXhwIjoxNjMyMDMyMjk4LCJpc3MiOiJ1cm46bXMuY29nbml0aXZlc2VydmljZXMifQ.G2oPjXypMDS-NGbsIIq7j_nsJbLKUq5j2kFeu4JoC9I`
const endPoint = `https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`

export default {
  namespace: 'records',
  state: {
    data: [],
  },
  reducers: {
    add(state, { payload }) {
      const { recording } = payload
      const { uri } = recording

      const { data } = state
      data.unshift({
        uri,
        name: `New Recording ${data.length + 1}`,
        createdAt: Moment()
          .toDate()
          .getTime(),
      })
      return { ...state, data }
    },
    del(state, { payload }) {
      const { recording } = payload
      const { data } = state
      const filteredData = _.filter(data, o => !_.isEqual(o, recording))

      return { ...state, data: filteredData }
    },
    update(state, { payload }) {
      const { recording, content } = payload
      const { data } = state
      const filteredData = _.map(data, o => {
        if (_.isEqual(o, recording)) {
          return { ...recording, content }
        }
        return o
      })

      return { ...state, data: filteredData }
    },
  },
  effects: {
    *queryText({ payload }, { call, put }) {
      const { recording } = payload
      if (recording?.content?.RecognitionStatus === 'Success') {
        return
      }

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

      yield put(
        createAction('update')({
          recording,
          content,
        })
      )
    },
  },
  subscriptions: {},
}
