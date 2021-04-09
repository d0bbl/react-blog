import {useState, useEffect} from 'react';

const useFetch = (url) => {
  // eslint-disable-next-line
   const [info, setInfo] = useState(null);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    (async() => {
    try {
      const res = await fetch(url, { signal: abortCont.signal });
      if(!res.ok) {
        throw new Error( `failed to fetch blogs` );
      }
      const data = await res.json();
      setError(false);
      setIsPending(false);
      setInfo(data);

    } catch (err) {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        }
        setError(err.message);
        setIsPending(false);
      }
    })();
    return () => abortCont.abort();
  }, [url]);

    return {info,
      isPending,
      error};

}

export default useFetch;
