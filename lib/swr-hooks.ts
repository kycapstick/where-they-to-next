import useSWR from 'swr'

function fetcher(url: string) {
    return window.fetch(url).then((res) => res.json())
}

export function usePerformers() {
    const { data, error } = useSWR(`/api/performers`, fetcher)

    return {
        entries: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export function useEntry(id: string) {
    return useSWR(`/api/get-entry?id=${id}`, fetcher)
}
