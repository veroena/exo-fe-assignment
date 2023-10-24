import { useEffect, useState } from "react"
import { Alert, CircularProgress, TableCell, TableRow } from "@mui/material"
import { useGetData } from "./useGetData"
import { CustomTable } from "./components/CustomTable"

export interface ListProps {
  title: string
  body: string
  id: number
  userId: number
}

export type DataStatus = 'pending' | 'error' | 'success'

const TableData = ({list}: {list: Array<ListProps>}) => {

  return(
    <>
      {list?.map((item) => {
        return (
          <TableRow key={item.id}>
            <TableCell sx={{color: 'white'}}>{item.title}</TableCell>
            <TableCell sx={{color: 'white'}}>{item.body}</TableCell>
            <TableCell sx={{color: 'white'}}>{item.id}</TableCell>
            <TableCell sx={{color: 'white'}}>{item.userId}</TableCell>
          </TableRow>
        )
        }
      )}
    </>
  )
}

const tableContent = ({status, error, list} : {status: DataStatus, error: Error | null, list: Array<ListProps>}) => {
  switch (status) {
    case 'pending':
      return (
        <TableRow>
          <TableCell colSpan={4}>
            <CircularProgress />
          </TableCell>
        </TableRow>
      )

    case 'error':
      return (
        <TableRow>
          <TableCell colSpan={4}>
            <Alert severity="error">An error has occurred: {error?.message}</Alert>
          </TableCell>
        </TableRow>
      )
    case 'success':
      return <TableData list={list} />
  }
}

export const PopulatedTable = () => {
  const [filteredData, setFilteredData] = useState<Array<ListProps>>([])

  const {data, status, error} = useGetData()
  
  useEffect(() => {
    setFilteredData(data)
  }, [data])
  

  return(
    <CustomTable headers={['title', 'body', 'id', 'userId']}>
      {tableContent({status: status, error: error, list: filteredData})}
    </CustomTable>
  )
}