import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Box } from '@mui/material'
import { Header } from './components/common/Header'
import { PopulatedTable } from './components/PopulatedTable'

const queryClient = new QueryClient()

export const App = () => {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Header title='Exoticca Fe Assignment' />
      <Box 
        display="flex"
        width="100%" 
        justifyContent="center" 
        alignItems="center"
        sx={{backgroundColor: '#12161E', color: 'white'}}
      >
        <Box width="90%" padding="10px 20px">
          <PopulatedTable />
        </Box>
      </Box>
    </QueryClientProvider>
  )
}

