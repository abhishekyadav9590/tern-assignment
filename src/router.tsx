import React from "react";

import {Routes,Route} from "react-router-dom";
import {Home} from "./components/home/home.";
import {JobDetail} from "./components/jobDetails/JobDetail";
import {PreviewApplication} from "./components/preview/PreviewApplication";

export const Routing = () =>{
    return(
        <>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/show-job/:id'} element={<JobDetail/>}/>
                <Route path={'/applied-jobs'} element={<PreviewApplication/>}/>
            </Routes>
        </>
    )
}