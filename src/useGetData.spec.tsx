import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import { useGetData } from "./useGetData"

const queryClient = new QueryClient()

const wrapper = ({children}: { children: React.ReactElement }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('useGetData', () => {
  it('should perform the petition and return success', async () => {
    const { result } = renderHook(() => useGetData(), { wrapper })
    
    await waitFor(() => expect(result.current.status).toBe('success'))
  })
})
