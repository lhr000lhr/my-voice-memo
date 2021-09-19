import React from 'react'
import renderer from 'react-test-renderer'
import Home from './Home'

jest.mock('react-redux', () => ({
  connect: () => Component => Component,
}))

const props = {
  records: {
    data: [],
  },
}

describe('Home', () => {
  it('renders correctly with Home screen empty', () => {
    expect(renderer.create(<Home {...props} />)).toMatchSnapshot()
  })
})
