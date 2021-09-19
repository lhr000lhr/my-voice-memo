import React from 'react'
import renderer from 'react-test-renderer'
import VoiceMemoItem from './VoiceMemoItem'

jest.mock('moment', () => () => jest.requireActual('moment')('2020-01-01T00:00:00.000Z'))

describe('VoiceMemoItem', () => {
  it('renders correctly with VoiceMemoItem', () => {
    expect(renderer.create(<VoiceMemoItem />)).toMatchSnapshot()
  })
})
