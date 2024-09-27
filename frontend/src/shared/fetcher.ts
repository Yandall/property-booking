export function fetcher(url: string, options?: any) {
  if (url !== "") {
    const newUrl = url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
    return fetch(newUrl, options)
      .then(async (res) => {
        return res.json();
      })
      .then((res) => {
        if (res.error) throw res;
        return res;
      });
  }
  return new Promise<any>((resolve) => resolve(undefined));
}
