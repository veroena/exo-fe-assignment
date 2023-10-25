import { useEffect, useState } from 'react'
import { Alert, CircularProgress, TableCell, TableRow } from '@mui/material'
import { useGetData } from '../hooks/useGetData'
import { SearchInput } from './common/SearchInput'
import { CustomTable } from './common/CustomTable'

export interface ListProps {
  title: string
  body: string
  id: number
  userId: number
}

export type DataStatus = 'pending' | 'error' | 'success'

const TableData = ({list}: {list: Array<ListProps>}) => {

  const isPrimeNumber = (number: number) => {
    if(number > 1) {
      for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
      }
      return true;
    }
  }

  return(
    <>
      {list?.map((item) => {
        return (
          <TableRow key={item.id}>
            <TableCell sx={{color: 'white', fontStyle: isPrimeNumber(item.id) ? 'italic' : 'normal'}}>{item.title}</TableCell>
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
      return list?.length === 0 ?
        <TableRow><TableCell colSpan={4} sx={{color: 'white'}}>No results match your search</TableCell></TableRow>
        :
        <TableData list={list} />
  }
}

export const PopulatedTable = () => {
  const [filteredData, setFilteredData] = useState<Array<ListProps>>([])

  const {data, status, error} = useGetData()
  
  useEffect(() => {
    setFilteredData(data)
  }, [data])

  const handleInputChange = (searchTerm: string) => { 
    const filteredItems = data.filter((item: ListProps) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(filteredItems)
  }
  

  return(
    <>
      <SearchInput onChangeCallback={handleInputChange} label="Filter by title here" />
      <CustomTable headers={['title', 'body', 'id', 'userId']}>
        {tableContent({status: status, error: error, list: filteredData})}
      </CustomTable>
    </>
  )
}