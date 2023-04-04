import { useEffect, useMemo, useReducer, useState } from "react";
import { IFilter } from "../App";
import { LeftOutlined, CaretLeftOutlined } from '@ant-design/icons'
import { Tree } from 'antd'

import "./Sider.css";

type SiderProps = {
    filter: IFilter
    setFilter: (filter: IFilter) => any
};

export default function Sider(props: SiderProps) {

    const [collapsed, setCollapsed] = useState(true);
    const collapsedClass = collapsed ? "translate-x-full" : "translate-x-0";

    const { filter, setFilter } = props;

    const defaultCheckedKeys = useMemo(() => {
        return Object.entries(filter).map(([key, active]) => key).filter((key) => filter[key as keyof IFilter]);
    }, [filter]);
    const treeData = useMemo(() => {
        return Object.entries(filter).map(([key, active]) => {
            {
                return {
                    title: key,
                    key,
                    children: [],
                }
            }
        });
    }, [filter]);

    const onCheck = (keys: string[]) => {
        const newFilter = { ...filter };
        for (const key in newFilter) {
            newFilter[key as keyof IFilter] = false;
        }
        keys.forEach(key => {
            newFilter[key as keyof IFilter] = true;
        })
        // console.log(newFilter);
        setFilter(newFilter);
    }


    return <>
        <div className=" absolute right-0 top-0 -translate-x-2 translate-y-2">
            <div
                className={` ${collapsed ? "rotate-0 translate-x-0" : "rotate-180 -translate-x-40"} duration-300 transition-all z-50 hover:cursor-pointer absolute right-0 top-0 w-5 h-5`}
                onClick={() => setCollapsed((prev) => !prev)}
            >
                <div className=" bg-soft-red w-7 h-7 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className=" absolute left-1/2 top-1/2 -translate-x-[60%] -translate-y-1/2">
                        {/* <LeftOutlined  /> */}
                        <CaretLeftOutlined style={{ color: 'hsl(27, 66%, 92%)', display: 'block' }}/>
                    </div>
                </div>
            </div>
        </div>

        <div
            className={`w-40 bg-white duration-300 rounded-l-lg transition-all h-full absolute right-0 ${collapsedClass}`}>
            <Tree
                checkable
                selectable={false}
                //@ts-ignore
                onCheck={onCheck}
                {...{ treeData, defaultCheckedKeys }}
            />
        </div>
    </>
}