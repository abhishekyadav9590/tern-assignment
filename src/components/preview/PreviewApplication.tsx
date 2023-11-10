import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {ReactNode, useEffect, useState} from "react";
import jobDetailCSS from '../jobDetails/jobDetail.module.css'
import {sanitize} from "dompurify";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import {Box, Button, Card, CardContent, Tab, Tabs} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";


interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export const PreviewApplication = () => {
    const {data} = useSelector((state: any) => state.appliedJob);
    const navigate = useNavigate()
    const [value, setValue] = useState(0);

    const [expanded, setExpanded] = React.useState<string | false>(false);

    console.log('inside preview', data)

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!data.length) {
            navigate('/')
        }
    }, []);

    return (
        <div className={jobDetailCSS.jobDetail}>
            <Button variant={"contained"} onClick={() => navigate(-1)}>
                <ArrowBack/>
                Back
            </Button>
            <div className={jobDetailCSS.jobDescription}>
                {
                    data.map((application: any, index: number) => {
                        return (
                            <div key={index} style={{marginBottom:15}}>
                                <Card sx={{minWidth: 275}}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {application.job.name}
                                        </Typography>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            Candidate Details
                                        </Typography>
                                        <Typography sx={{mb: 1.5}} variant="body2">
                                            {application.candidate.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {application.candidate.email}
                                        </Typography>
                                    </CardContent>
                                </Card>

                                <Accordion expanded={expanded === `panel-attachment-${index}`} onChange={handleChange(`panel-attachment-${index}`)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel4bh-content"
                                        id="panel4bh-header"
                                    >
                                        <Typography sx={{width: '33%', flexShrink: 0}}>
                                            <b>Attachments</b>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                                            <Tab label="Resume" {...a11yProps(0)} />
                                            <Tab label="Cover Letter" {...a11yProps(1)} />

                                        </Tabs>
                                        <CustomTabPanel value={value} index={0}>
                                            <Typography>
                                                {
                                                    // @ts-ignore
                                                    <iframe src={application.candidate.resume} type="application/pdf"
                                                            title={`${application.candidate.name}'s Resume`}
                                                            width="100%" height="100%" style={{minHeight: '400px'}}/>
                                                }

                                            </Typography>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={1}>
                                            <Typography>
                                                {
                                                    // @ts-ignore
                                                    <iframe src={application.candidate.cover} type="application/pdf"
                                                            title={`${application.candidate.name}'s Cover Letter`}
                                                            width="100%" height="100%" style={{minHeight: '400px'}}/>
                                                }

                                            </Typography>
                                        </CustomTabPanel>


                                    </AccordionDetails>
                                </Accordion>

                                <Accordion expanded={expanded === `panel-description-${index}`} onChange={handleChange(`panel-description-${index}`)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel4bh-content"
                                        id="panel4bh-header"
                                    >
                                        <Typography sx={{width: '33%', flexShrink: 0}}>
                                            <b>Job Description</b>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <article
                                                dangerouslySetInnerHTML={{__html: sanitize(application.job.contents)}}></article>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );

}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
