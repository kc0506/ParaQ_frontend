import React, { ReactNode, useEffect, useState } from "react";
import QuestionType from "./QuestionType";
import { IFilter } from "../../App";
import ParasiteRange from "./ParasiteRange";
import AnswerType from "./AnswerType";

type IProps = {
    settingsOpen: boolean
    setSettingsOpen: (value: boolean) => any,
    filter: IFilter,
    setFilter: (value: React.SetStateAction<IFilter>) => void,
};

const MyDivider = () => {
    return <div className="w-full h-1 py-1 ">
        <div className="w-full border-b border-b-slate-200"></div>
    </div>
}

const MyContainer = ({ title, children }: { title: string, children: ReactNode }) => {
    return <div className="flex flex-col items-start justify-center w-full gap-2 ">
        <p className="ml-1 text-xs text-slate-500">
            {title}
        </p>
        {children}
    </div>
}

export default function Settings(props: IProps) {

    const { settingsOpen, filter, setFilter } = props;


    return <>
        <div className={`absolute top-0 left-0 z-20 w-full h-full transition-all ${!settingsOpen && ' translate-x-full'} `}>
            <div className={` overflow-y-scroll flex flex-col items-start justify-start gap-5 p-5 w-full h-full bg-white `}>
                <MyContainer title="Questions type">
                    <QuestionType />
                </MyContainer>
                <MyDivider />
                <MyContainer title="Choose parasites">
                    <ParasiteRange
                        filterNames={filter.names}
                        setFilter={setFilter}
                    />
                </MyContainer>
                <MyDivider />
                <MyContainer title="Answers type">
                    <AnswerType
                        filter={filter}
                        setFilter={setFilter}
                    />
                </MyContainer>
                <MyDivider />
            </div>
        </div>
    </>
}