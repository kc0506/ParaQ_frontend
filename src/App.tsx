import { useState } from 'react'
import useParasites from './hooks/useParasites'
import { IParasite } from './api';
import useQuiz, { QuizType } from './hooks/useQuiz';
import Body from './components/Body';

// const colors = {
// 	'soft-red': 'hsl(10, 79%, 65%)',
// 	'cyan': 'hsl(186, 34%, 60%)',
// 	'dark-brown': 'hsl(25, 47%, 15%)',
// 	'medium-brown': 'hsl(28, 10%, 53%)',
// 	'cream': 'hsl(27, 66%, 92%)',
// 	'pale-orange': 'hsl(33, 100%, 98%)'
// }

type IFilter = Record<keyof IParasite, boolean>;

const initialFilter: IFilter = {
	"學名": true,
	"中文名": true,
	"感染型": true,
	"寄生部位": true,
	"I.H.": true,
	"P.H.": true,
	"R.H.": true,
	"F.H.": true,
	"偶然宿主": true,
	"檢查方法": true,
	"治療": true,
}

function App() {

	const [filter, setFilter] = useState<IFilter>(initialFilter);
	const { error, loading, parasites } = useParasites();
	const { curIndex, total, quiz, nextQuiz } = useQuiz({ filter, parasites });

	return (
		<>
			<div className=' h-screen bg-cream flex items-center justify-center'>
				<Body {...{ filter, setFilter, curIndex, total, nextQuiz, error, loading, quiz }} />
			</div>
		</>
	)
}

export type { IFilter };
export default App
