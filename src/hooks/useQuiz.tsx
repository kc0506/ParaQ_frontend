import { useEffect, useState } from "react";
import { IParasite } from "../api";
import { IFilter } from "../App";


type QuizType = {
    key: string,
    name: string,
    answer: string,
};
type Type = {
    quiz: QuizType,
    curIndex: number,
    total: number
    nextQuiz: () => any,
};


interface IProps {
    parasites: IParasite[],
    filter: IFilter,
};

function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default function useQuiz(props: IProps): Type {

    const { parasites, filter } = props;

    const [queue, setQueue] = useState<QuizType[]>([]);
    const quiz = queue[0];

    const [curIndex, setCurIndex] = useState(0);
    const [total, setTotal] = useState(0);

    const nextQuiz = () => {
        setQueue(prev => {
            prev.shift();
            return prev;
        });
        setCurIndex(prev => prev + 1);
    };

    useEffect(() => {

        console.log('filter updated!')

        const newQueue: QuizType[] = [];
        parasites.forEach(parasite => {
            let key: keyof IParasite;
            for (key in parasite) {
                if (filter[key]) {
                    if (key == '學名')
                        newQueue.push({
                            name: parasite.中文名,
                            key,
                            answer: parasite[key],
                        })
                    else
                        newQueue.push({
                            name: parasite.學名,
                            key,
                            answer: parasite[key],
                        })
                }
            }
        });
        shuffle(newQueue);

        setTotal(newQueue.length);
        setCurIndex(0);
        setQueue(newQueue);
    }, [parasites, filter]);

    return {
        quiz,
        curIndex,
        total,
        nextQuiz,
    };
}

export type { QuizType };