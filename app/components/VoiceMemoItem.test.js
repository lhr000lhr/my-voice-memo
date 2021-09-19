import React from 'react'
import renderer from 'react-test-renderer'
import VoiceMemoItem from './VoiceMemoItem'

describe('VoiceMemoItem', () => {
  it('renders correctly with VoiceMemoItem', () => {
    expect(renderer.create(<VoiceMemoItem />)).toMatchSnapshot()
  })
})
