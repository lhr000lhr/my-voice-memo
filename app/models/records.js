import _ from 'lodash'

export default {
  namespace: 'records',
  state: {
    data: [],
  },
  reducers: {
    add(state, { payload }) {
      const { recording } = payload
      const { data } = state
      data.unshift(recording)
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
