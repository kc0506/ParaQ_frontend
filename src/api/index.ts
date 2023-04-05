import axios from "axios";

interface IParasite {
    "sientific_name": string,
    "Chinese_name": string,
    "infective_form": string,
    "habitat": string,
    "I.H.": string,
    "P.H.": string,
    "R.H.": string,
    "F.H.": string,
    "A.H.": string,
    "diagnosis": string,
    "therapy": string
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

type GetParasitesType = { parasites: IParasite[], error: boolean }
const getAllParasites = async (): Promise<GetParasitesType> => {
    try {
        const res = await instance.get('/parasites/all')
        // console.log('res get!');
        return res.data as GetParasitesType;
    } catch (e) {
        console.log(e);
        return {
            parasites: [], error: true
        };
    }
}

export { getAllParasites };
export type { IParasite, };