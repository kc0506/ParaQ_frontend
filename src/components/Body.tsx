import { useState } from "react";
import { QuizType } from "../hooks/useQuiz";
import { Progress, Drawer, Menu } from "antd";
import Sider from "./Sider";
import { IFilter } from "../App";


type QuizProps = {
	curIndex: number,
	total: number,
	quiz: QuizType
	nextQuiz: () => any,
};
const Quiz = (props: QuizProps) => {
	const { nextQuiz, quiz, curIndex, total } = props;
	const [showAns, setShowAns] = useState(false);

	return <>

		<div className=' text-dark-brown'>
			What is/are the <span className=' font-bold'>{quiz.key}</span> of <span className=' italic'>{quiz.name}</span>
		</div>
		<div
			className=' flex flex-col items-center justify-center p-10 h-1/3 gap-3'
		>
			<div className={`${!showAns && 'invisible'}`}>
				The answer is <span className=' font-bold'>{quiz.answer}</span>
			</div>
			{!showAns
				? <button className='text-sm bg-soft-red text-pale-orange px-2 py-1 rounded-xl'
					onClick={() => {
						setShowAns(true);
					}}
				>
					Show Answer
				</button>
				: <button className=' text-sm bg-soft-red text-pale-orange px-2 py-1 rounded-xl'
					onClick={() => {
						setShowAns(false);
						nextQuiz();
					}}
				>
					Next quiz
				</button>
			}
		</div>
		<div className=" w-full flex items-center flex-col">
			<span className="">
				{curIndex + 1}/{total}
			</span>
			<Progress percent={curIndex / total * 100} showInfo={false} strokeColor={'hsl(10, 79%, 65%)'} />
		</div>
	</>
}

type BodyProps = {
	loading: boolean,
	error: boolean,
	quiz: QuizType,
	curIndex: number,
	total: number,
	filter: IFilter,
	setFilter: (filter: IFilter) => any,
	nextQuiz: () => any,
};
const Body = (props: BodyProps) => {

	const { filter, setFilter, curIndex, total, nextQuiz, quiz, error, loading } = props;
	const [showAns, setShowAns] = useState(false);

	const [collapsed, setCollapsed] = useState(true);

	if (error)
		return <></>


	return <>
		<div className=' overflow-hidden p-5 relative h-3/5 max-w-2xl w-full bg-pale-orange flex flex-col gap-10 items-center justify-center'>
			{error
				? <>There is something wrong......</>
				: loading
					? <>Still loading......</>
					: curIndex == total
						? <>All quizes completed!</>
						: !quiz
							? <>Still loading......</>
							: <Quiz {...{ curIndex, total, quiz, nextQuiz }} />
			}
			<Sider {...{ filter, setFilter }} />
		</div>
	</>
}

export default Body;