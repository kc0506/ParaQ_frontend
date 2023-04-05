import { Select } from "antd";
import { IFilter } from "../../App";
import { useMemo } from "react";
import { IParasite } from "../../api";

interface IProps {
    filter: IFilter,
    setFilter: (x: React.SetStateAction<IFilter>) => void,
}

export default function AnswerType(props: IProps) {

    const { filter, setFilter } = props;
    const options = useMemo(() => {

        if (!filter)
            return [];
        return Object.keys(filter.keys).map(key => ({ value: key, label: key }));
    }, [filter]);
    // console.log(options);

    const onChange = (keys: string[]) => {
        setFilter(prev => {
            // console.log(keys);
            const newFilter = { ...prev };
            for (const key in newFilter.keys) {
                newFilter.keys[key as keyof IParasite] = false;
            }
            keys.forEach(key => {
                if (key in newFilter.keys)
                    newFilter.keys[key as keyof IParasite] = true;
            })
            // console.log(newFilter)
            return newFilter;
        });
    }

    return <>
        <div className="max-w-full  w-96">
            <Select
                mode="multiple"
                placeholder="Please select"
                defaultValue={Object.keys(filter.keys)}
                onChange={onChange}
                style={{ width: '100%' }}
                options={options}
            />
        </div>
    </>
}