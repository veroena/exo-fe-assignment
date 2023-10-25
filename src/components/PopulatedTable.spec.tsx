import { render, screen } from '@testing-library/react'
import * as useGetData from '../hooks/useGetData'
import { PopulatedTable, ListProps, DataStatus } from './PopulatedTable'

const mockedData: Array<ListProps> = [
  {
    title: 'fakeTitle1',
    body: 'fakeBody1',
    id: 1,
    userId: 1
  },
  {
    title: 'fakeTitle2',
    body: 'fakeBody2',
    id: 2,
    userId: 2
  }
]

const setup = (status: DataStatus) => {
  jest.spyOn(useGetData, 'useGetData').mockReturnValue({data: mockedData, status: status, error: null})

  render(<PopulatedTable />)
}

describe('PopulatedTable', () => {
  describe('when the request succeeds', () => {
    it('should display rows with the provided data', () => {
      setup('success')
      const firstRow = screen.getAllByRole('row')[1]
      const secondRow = screen.getAllByRole('row')[2]
    
      expect(firstRow).toHaveTextContent('fakeTitle1')
      expect(secondRow).toHaveTextContent('fakeTitle2')
    })

    it('should show a message when the filter by title does not produce results', () => {
      jest.spyOn(useGetData, 'useGetData').mockReturnValue({data: [], status: 'success', error: null})

      render(<PopulatedTable />)

      expect(screen.getByText('No results match your search')).toBeVisible()
    })

    it('should show titles in italics when the id is a prime number', () => {
      setup('success')

      expect(screen.getByText('fakeTitle1')).toHaveStyle('font-style: normal')
      expect(screen.getByText('fakeTitle2')).toHaveStyle('font-style: italic')
    })
  })

  it('should display loader component when the request status is loading', () => {
    setup('pending')
    expect(screen.getByRole('progressbar')).toBeVisible()
  })

  it('should display error message when the request fails', () => {
    setup('error')
    expect(screen.getByText('An error has occurred:')).toBeVisible()
  })
})
