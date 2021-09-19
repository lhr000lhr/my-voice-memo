import _ from 'lodash'
import Moment from 'moment'

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
  },
  effects: {},
  subscriptions: {},
}
