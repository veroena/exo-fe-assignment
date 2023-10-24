import { useQuery } from "@tanstack/react-query"

export const useGetData =() => {
  const { error, data, status } = useQuery({
    queryKey: ['listData'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then(
        (res) => res.json(),
      ),
  })

  return {data, status, error}
}
