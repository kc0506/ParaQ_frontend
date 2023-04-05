import { LeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { QuizType } from '../hooks/useQuiz';
import { KeyboardEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { ChangeEvent } from 'react';

type QuizProps = {
    curIndex: number,
    total: number,
    quiz: QuizType
    nextQuiz: () => any,
};
const Quiz = (props: QuizProps) => {
    const { nextQuiz, quiz, curIndex, total } = props;
    const [showAns, setShowAns] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const onKeyDown: KeyboardEventHandler = (e) => {
        if (e.key === 'Enter') {
            setShowAns(true);
        }
    }

    const onBtnClick: MouseEventHandler = () => {
        if (showAns) {
            nextQuiz();
        }
        setShowAns(!showAns);
    };

    useEffect(() => {
        setInputValue('');
    }, [quiz]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && showAns) {
                console.log(e)
                nextQuiz();
            }
        };
        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        }
    }, []);

    return <>

        <div className='flex items-center justify-start px-5 py-5 mr-10 text-2xl border-b text-dark-brown border-slate-200'>
            <div>
                What is/are the <span className='font-bold text-soft-red'>{quiz.key.replaceAll('_', ' ')}</span> of <span className='italic font-bold text-soft-red'>{quiz.name}?</span>
            </div>
        </div>
        <div
            className='flex flex-col items-center justify-center gap-3 p-5 my-5 h-3/5'

        >
            <div
                className={` overflow-hidden relative flex flex-col items-start w-full `}
            >
                <p className='text-sm text-slate-400'>Your Answer</p>
                <div className='relative w-full h-10 '>
                    <div
                        className={`absolute bottom-0 right-0 transition-all 
                          -translate-y-2 rounded-full first:absolute hover:cursor-pointer bg-soft-red w-7 h-7 `}
                        onClick={onBtnClick}
                    >
                        <div className=" absolute left-1/2 top-1/2 -translate-x-[60%] -translate-y-1/2">
                            <ArrowRightOutlined style={{ display: 'block', color: 'white' }} />
                        </div>
                    </div>
                    <input
                        className="w-full h-10 text-lg transition-colors border-b-2 disabled:bg-transparent focus:border-b-cyan focus:outline-0 border-slate-300"
                        value={inputValue}
                        onChange={onInputChange}
                        onKeyDown={onKeyDown}
                        disabled={showAns}
                    />
                </div>

                <div className={`mt-3  text-sm text-slate-500 ${!showAns && 'invisible'}`}>
                    The answer is <span className='font-bold text-cyan'>{quiz.answer}</span>
                </div>
            </div>
        </div>

    </>
}

export default Quiz;