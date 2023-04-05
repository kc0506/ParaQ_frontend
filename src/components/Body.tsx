import { useState } from "react";
import { QuizType } from "../hooks/useQuiz";
import { Progress, Drawer, Menu, Input } from "antd";
import { MenuOutlined } from '@ant-design/icons'
import { IFilter } from "../App";
import Quiz from "./Quiz";
import Settings from "./Settings/Settings";


type BodyProps = {
	loading: boolean,
	error: boolean,
	quiz: QuizType,
	curIndex: number,
	total: number,
	filter: IFilter,
	setFilter: (filter: React.SetStateAction<IFilter>) => void,
	nextQuiz: () => any,
};
const Body = (props: BodyProps) => {

	const { filter, setFilter, curIndex, total, nextQuiz, quiz, error, loading } = props;

	const [settingsOpen, setSettingsOpen] = useState(false);

	return <>
		<div className='relative flex flex-col items-center justify-center w-full h-full max-w-2xl p-4 bg-white md:bg-transparent md:h-2/3'>
			<div className="relative w-full overflow-hidden bg-white h-1/2 md:h-full md:drop-shadow-md rounded-xl">
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
				<div className="absolute top-0 right-0 z-50 p-5 ">
					<div className={
						"transition-all hover:cursor-pointer hover:scale-105 opacity-70 hover:opacity-100 "
						+ `${settingsOpen && ' -rotate-90 -translate-x-3'}`
					}
						onClick={() => { setSettingsOpen(prev => !prev) }}>
						<MenuOutlined style={{ fontSize: '20px', color: 'grey', display: 'block' }} />
					</div>
				</div>
				<Settings {...{ setSettingsOpen, settingsOpen, filter, setFilter }} />
			</div>
			<div className="flex flex-col items-center justify-center w-full px-0 py-1 mt-2">
				<Progress percent={curIndex / total * 100} showInfo={false} strokeColor={'hsl(10, 79%, 65%)'} />
				<span className="text-sm text-slate-500">
					{curIndex + 1}/{total}
				</span>
			</div>
			{/* <Sider {...{ filter, setFilter }} /> */}
		</div>
	</>
}

export default Body;