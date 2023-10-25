import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchInput } from './SearchInput'

const mockedOnChange = jest.fn()

const setup = () => {
  render(<SearchInput onChangeCallback={mockedOnChange} label={'fakeLabel'} />)
}

describe('SearchInput', () => {

  it('should display the provided label in the input', () => {
    setup()
    expect(screen.getByLabelText('fakeLabel')).toBeVisible()

  })

  it('should call the provided function when typing in the input', async () => {
    setup()
    await act(() => userEvent.type(screen.getByLabelText('fakeLabel'), 't'))
    
    expect(mockedOnChange).toHaveBeenCalledWith('t')
  })
})