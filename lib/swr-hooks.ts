import useSWR from 'swr'

function fetcher(url: string) {
    return window.fetch(url).then((res) => res.json())
}

export function useEntries(route: string) {
    const { data, error } = useSWR(`/api/${route}`, fetcher)

    return {
        entries: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export function useEntry(id: string, route: string) {
    const { data, error } = useSWR(`/api/${route}/single?id=${id}`, fetcher);
    return {
        entry: data,
        isLoading: !error && !data,
        isError: error,
    }
}
