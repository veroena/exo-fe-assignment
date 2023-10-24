import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"

export const CustomTable = ({headers, children} : {headers: Array<string>, children: React.ReactElement}) => {
  return (
    <Table>
      <TableHead sx={{backgroundColor: '#242D39'}}>
        <TableRow>
          {headers.map((header) => {
            return (
              <TableCell key={header} sx={{color: 'white'}}>
                {header}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody sx={{backgroundColor: '#171E2B'}}>
        {children}
      </TableBody>
    </Table>
  )
}
