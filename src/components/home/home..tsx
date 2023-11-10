import React, {ChangeEvent, FormEvent, useState} from "react";
import css from "./home.module.css"
import {JobList} from "../jobList/JobList";
import Button from '@mui/material/Button';
import {Search} from '@mui/icons-material';
import {useDispatch} from "react-redux";
import {fetchJobsAsync} from "../../store/JobSlice";
import {NavLink} from "react-router-dom";


export interface IJobData {
    page_count: number,
    results: Array<object>,
    total: number
}

export const Home = () => {
    const dispatch = useDispatch();
    const [searched, setSearched] = useState("Software Engineering");
    const [loading, setLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setSearched(value);
    }
    const fetchData = async () => {
        try {
            // @ts-ignore
            dispatch(fetchJobsAsync({searched, page: 0}))
        } catch (e) {
            console.error('Something went wrong', e);
        }
    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        await fetchData();
        setLoading(false);
    }


    return (
        <div className={css.home}>
            <NavLink to={'/applied-jobs'}>
                <Button variant={"contained"}>Applied Jobs</Button>
            </NavLink>
            <form action="" className={css.welcomePage} onSubmit={handleSubmit}>
                <h3>Job Search Portal</h3>
                <div className="form-group">
                    <input type="text"
                           disabled={loading}
                           value={searched}
                           onChange={handleChange}
                           placeholder={`Job Title, Keywords`} className={"form-control"}/>
                </div>
                <div className="text-right">
                    <Button type={"submit"} variant="contained" disabled={loading}>
                        <Search/>
                        Search
                    </Button>
                </div>
            </form>
            <JobList searched={searched}/>
        </div>)
}