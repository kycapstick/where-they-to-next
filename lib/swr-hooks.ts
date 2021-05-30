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

export function useEntry(slug: string, route: string) {
    const { data, error } = useSWR(`/api/${route}/single?slug=${slug}`, fetcher);
    return {
        entry: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export function getFollowing(entry_id: string | number, user_id: string | number, route: string) {
    const { data } = useSWR(`/api/${route}/following?id=${entry_id}&user_id=${user_id}`, fetcher);
    return {
        following: data && data[0] ? data[0].id : false
    };
}

export function getCount(user_id: string | number, route: string) {
    const {data : { count }} = useSWR(`/api/${route}/count?user_id=${user_id}`, fetcher);
    return count;
}