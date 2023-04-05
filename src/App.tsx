import { useEffect, useState } from 'react'
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

type IFilter = {
	names: Record<string, boolean>,
	keys: Record<keyof IParasite, boolean>
};


const initialFilter: IFilter = {
	names: {},
	keys: {
		"sientific_name": true,
		"Chinese_name": true,
		"infective_form": true,
		"habitat": true,
		"I.H.": true,
		"P.H.": true,
		"R.H.": true,
		"F.H.": true,
		"A.H.": true,
		"diagnosis": true,
		"therapy": true
	}
}



function App() {

	const [filter, setFilter] = useState<IFilter>(initialFilter);
	const { error, loading, parasites } = useParasites();
	const { curIndex, total, quiz, nextQuiz } = useQuiz({ filter, parasites });


	useEffect(() => {
		setFilter(prev => {
			const newFilter = { ...prev };
			parasites.forEach(parasite => {
				newFilter.names[parasite.sientific_name] = true;
			})

			return newFilter;
		})
	}, [parasites]);

	return (
		<>
			<div className='flex items-center justify-center h-screen bg-neutral-100'>
				<Body {...{ filter, setFilter, curIndex, total, nextQuiz, error, loading, quiz }} />
			</div>
		</>
	)
}

export type { IFilter };
export default App
