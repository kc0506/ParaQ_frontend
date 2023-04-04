import axios from "axios";

interface IParasite {
    "學名": string,
    "中文名": string,
    "感染型": string,
    "寄生部位": string,
    "I.H.": string,
    "P.H.": string,
    "R.H.": string,
    "F.H.": string,
    "偶然宿主": string,
    "檢查方法": string,
    "治療": string,
}


const instance = axios.create({
    baseURL: 'https://paraq-server.onrender.com/',
});

type GetParasitesType = { parasites: IParasite[], error: boolean }
const getAllParasites = async (): Promise<GetParasitesType> => {
    try {
        const res = await instance.get('/parasites/all')
        console.log('res get!');
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