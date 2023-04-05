import { Radio, RadioChangeEvent } from "antd";
import { ReactNode, useState } from "react";

const questionTypeOptions: { label: ReactNode, value: string, disabled: boolean }[] = [

    {
        label: 'Short answer',
        value: 'Short answer',
        disabled: false
    },
    {
        label: 'Developing...',
        value: 'Developing...',
        disabled: true,
    }
]


export default function QuestionType() {

    const [option, setOption] = useState();
    const onChange = ({ target: { value } }: RadioChangeEvent) => {
        setOption(value);
    }

    return <Radio.Group
        optionType="button"
        // buttonStyle="solid"
        options={questionTypeOptions}
        value={option}
        onChange={onChange}
    />
}