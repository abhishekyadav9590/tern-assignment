import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../utlis/axiosInterceptor";
import {sanitize} from 'dompurify';
import jobDetail from "./jobDetail.module.css"
import {Divider} from "@mui/material";
import {Button, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom"
import {Loop, ArrowBack} from "@mui/icons-material";
import {format} from 'date-fns'
import {ApplyForm} from "./ApplyForm/ApplyForm";

export const JobDetail = (props: any) => {
    let {id} = useParams();
    const navigate = useNavigate()
    const [jobData, setjobData] = useState({
        contents: 'Loading...',
        name: '',
        company: {name: ''},
        locations: [{
            name: ''
        }],
        publication_date: ''
    });
    const [loaded, setLoaded] = useState(false);
    const api = 'https://www.themuse.com/api/public/jobs/' + id
    const fetchData = async (api: string) => {
        try {
            const result = await axiosInstance.get(api);
            // @ts-ignore
            setjobData(result.data);
            console.log(result);
            setLoaded(true);
        } catch (e) {
            console.error('Something went wrong', e);
        }
    }

    useEffect(() => {
        fetchData(api);
    }, [id]);
    return (
        <div className={jobDetail.jobDetail}>
            {
                loaded ?
                    <>
                        <Button variant={"contained"} onClick={() => navigate(-1)}>
                            <ArrowBack/>
                            Back
                        </Button>
                        <div className={jobDetail.jobDescription}>
                            <div style={{marginBottom: 15}}>

                                <Stack spacing={{xs: 1, sm: 2}}>
                                    <div>
                                        <h4>
                                            {jobData.name}
                                        </h4>

                                        <div>
                                            Company: {jobData.company.name}
                                        </div>

                                        <div>
                                            Posted:&nbsp;
                                            {
                                                format((new Date(jobData.publication_date)), 'MM-dd-yyyy')
                                            }
                                        </div>

                                        <div>
                                            Locations: {
                                            jobData.locations.map((location, index) => (
                                                <label key={index}>{location?.name}</label>
                                            ))
                                        }
                                        </div>
                                    </div>
                                    <ApplyForm data={jobData}/>
                                </Stack>
                            </div>
                            <Divider/>

                            <h3>Job Description</h3>
                            <article dangerouslySetInnerHTML={{__html: sanitize(jobData.contents)}}></article>
                        </div>
                    </>

                    :
                    <div className={'flex'}>
                        <Loop/>
                        Loading ...
                    </div>

            }

        </div>
    )
}