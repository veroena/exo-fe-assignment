import { render, screen } from '@testing-library/react'
import { Header } from './Header'

const setup = () => {
  render(<Header title={'fakeTitle'}  />)
}

describe('Header', () => {

  it('should display the provided title', () => {
    setup()
    
    expect(screen.getByText('fakeTitle')).toBeVisible()
  })
})
