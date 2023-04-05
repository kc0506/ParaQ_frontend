import { useEffect, useState } from "react";
import { IParasite, getAllParasites } from "../api/index";


type Type = {
    parasites: IParasite[],
    error: boolean,
    loading: boolean,
}
export default function useParasites(): Type {

    const [parasites, setParasites] = useState<IParasite[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let signal = false;
        getAllParasites().then(({ parasites: newParasites, error: newError }) => {
            // console.log(signal)
            // console.log(newParasites);

            if (signal)
                return;

            setParasites(newParasites);
            setError(newError);
            setLoading(false);
        });

        return () => {
            signal = true;
        }
    }, []);


    return {
        parasites,
        error,
        loading
    }
}