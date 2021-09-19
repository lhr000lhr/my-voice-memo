import React from 'react'
import renderer from 'react-test-renderer'
import TextPreview from './TextPreview'

jest.mock('react-redux', () => ({
  connect: () => Component => Component,
}))

const props = {
  textPreview: {
    recording: {},
    loading: false,
  },
}

describe('TextPreview', () => {
  it('renders correctly with textPreview', () => {
    expect(renderer.create(<TextPreview {...props} />)).toMatchSnapshot()
  })
})
