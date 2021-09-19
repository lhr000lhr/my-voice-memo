import React from 'react'
import renderer from 'react-test-renderer'
import RecorderPanel from './RecorderPanel'

jest.mock('expo-av', () => 'Audio')
jest.mock('react-redux', () => ({
  connect: () => Component => Component,
}))

describe('RecorderPanel', () => {
  it('renders correctly with RecorderPanel', () => {
    expect(renderer.create(<RecorderPanel />)).toMatchSnapshot()
  })
})
