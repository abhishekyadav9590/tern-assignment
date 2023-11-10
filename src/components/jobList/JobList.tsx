import React, {useEffect, useState} from "react";
import joblistStyles from "./jobList.module.css"
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import {Visibility} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import Pagination from "@mui/material/Pagination";
import {fetchJobsAsync} from "../../store/JobSlice";
import {Divider} from "@mui/material";

export const JobList = (props: any) => {
    const {data} = useSelector((state: any) => state.jobs);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    };

    const fetchData = async () => {
        try {
            // @ts-ignore
            dispatch(fetchJobsAsync({searched: props.searched, page}))
        } catch (e) {
            console.error('Something went wrong', e);
        }
    }

    useEffect(() => {
        if (page > 0) {
            fetchData();
        }
    }, [page])

    return (
        <>
            {
                data?.results?.length && <>
                    <Divider/>
                    <ul className={joblistStyles.jobListContainer}>
                        {
                            data?.results?.map((item: any) => {
                                return (
                                    <li key={item.id} className={joblistStyles.jobCard}>
                                        <div style={{flex: 1}}>
                                            <h4>
                                                {item.name}
                                            </h4>
                                            <div>
                                                Company: {item.company.name}
                                            </div>
                                            <div>
                                                Level: {item.levels.length && item.levels[0].name}
                                            </div>
                                            <div>
                                                Locations: {item.locations.length && item.locations[0].name}
                                            </div>
                                        </div>
                                        <div>
                                            <NavLink to={`show-job/${item.id}`}>
                                                <Button variant="outlined" startIcon={<Visibility/>}>
                                                    View Job
                                                </Button>
                                            </NavLink>
                                        </div>
                                    </li>

                                )
                            })
                        }
                    </ul>
                    <div style={{maxWidth: '800px', margin: '0 auto 40px'}}>
                        <Pagination count={data.page_count} page={page + 1} onChange={handlePageChange}/>
                    </div>
                </>
            }
        </>)
}