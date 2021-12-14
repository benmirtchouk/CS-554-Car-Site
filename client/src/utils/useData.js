import { useEffect, useState } from "react";

const useData = (fn) => {
    const [state, setState] = useState({ data: null, loading: true });

    useEffect(() => {


        async function getData() {
            try {
                const { data } = await fn();
                setState({ data, loading: false });
            } catch (e) {
                console.log("errro in useAxios")
                setState({ data: null, loading: false });
            }
        }
        getData();
    }, [fn, setState]);

    return state;
};

export default useData;