import { expect } from 'chai'

import textPreview from './textPreview'

describe('text Preview Model test', () => {
  const state = {
    recording: {},
    loading: false,
  }

  it('loading should start', () => {
    const { loadingStart } = textPreview.reducers
    const payload = {
      recording: {},
    }
    const resultStage = loadingStart(state, { payload })
    expect(resultStage).to.deep.equal({
      ...state,
      recording: payload.recording,
      loading: true,
    })
  })

  it('loading should stop', () => {
    const { loadingStart, loadingEnd } = textPreview.reducers
    const payload = {
      recording: {},
    }
    loadingStart(state, { payload })
    const resultStage = loadingEnd(state)
    expect(resultStage).to.deep.equal({
      ...state,
      recording: payload.recording,
      loading: false,
    })
  })
})
