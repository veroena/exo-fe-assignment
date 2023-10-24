import { render, screen } from "@testing-library/react"
import { CustomTable } from "./CustomTable"
import { TableCell, TableRow } from "@mui/material"

const setup = () => {
  render(<CustomTable headers={['fakeHeader1', 'fakeHeader2']} children={<TableRow><TableCell>this is a fake element</TableCell></TableRow>} />)
}

describe('CustomTable', () => {
  it('should show provided headers', () => {
    setup()
    const columnHeaders = screen.getAllByRole('columnheader')

    expect(columnHeaders).toHaveLength(2)
    expect(columnHeaders[0]).toHaveTextContent('fakeHeader1')
    expect(columnHeaders[1]).toHaveTextContent('fakeHeader2')
  })

  it('should render the provided children element', () => {
    setup()

    expect(screen.getByText('this is a fake element')).toBeVisible()
  })
})
