import { Tree } from "antd";
import { IFilter } from "../../App";
import { useEffect, useMemo, useState } from "react";

interface IProps {
    filterNames: Record<string, boolean>,
    setFilter: (value: React.SetStateAction<IFilter>) => void,
}

export default function ParasiteRange(props: IProps) {

    const { filterNames, setFilter } = props;

    const allParasites = Object.entries(filterNames).map(([key, active]) => {
        // console.log(key in filterNames);
        return {
            title: key,
            key,
            children: [],
        }
    });
    const treeData = [
        {
            title: 'All',
            key: 'All',
            children: allParasites
        }
    ];


    const onCheck = (keys: string[]) => {
        setFilter(prev => {
            const newFilter = { ...prev };
            for (const key in newFilter.names) {
                newFilter.names[key] = false;
            }
            keys.forEach(key => {
                if (key in newFilter.names)
                    newFilter.names[key] = true;
            })
            return newFilter;
        });
    }


    return <>
        <Tree
            checkable
            selectable={false}
            //@ts-ignore
            onCheck={onCheck}
            defaultCheckedKeys={[...Object.keys(filterNames), 'All']}
            {...{ treeData, }}
        />
    </>
}