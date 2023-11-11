import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ChangeEvent, useState} from "react";
import {IconButton, Paper, Snackbar, styled, Tooltip} from "@mui/material";
import {Delete, FileUpload, PictureAsPdf} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {addApplied} from "../../../store/AppliedJobSlice";
import {convertFileToBlobUrl} from "../../../utlis/convertor";
import {useNavigate} from "react-router-dom";


export const ApplyForm = (props: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [candidateData, setCandidateData] = useState({
        name: '',
        email: ''
    });
    const [resume, setResume] = useState<File | null>(null);
    const [cover, setCover] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;
        console.log('event:', event.target.value)
        console.log('name:', event.target.name)
        setCandidateData({
            ...candidateData,
            [name]: value
        });
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();

        // convert file to base64
        const resumeURL = resume ? convertFileToBlobUrl(resume) : null;
        const coverURL = cover ? convertFileToBlobUrl(cover) : null;

        try {
            setLoading(true);
            // @ts-ignore
            dispatch(addApplied({
                candidate: {
                    ...candidateData,
                    resume: resumeURL,
                    cover: coverURL
                },
                job: props.data
            }))
            setTimeout(() => {
                setLoading(false);
                navigate('/applied-jobs');
            }, 3000);

        } catch (e) {
            setLoading(false);
        }
    }
    const handleCover = (e: any) => {
        const files = e.target.files;
        if (files.length) {
            setCover(files[0])
        } else {
            setCover(null)
        }

    }
    const handleResume = (e: any) => {
        const files = e.target.files;
        if (files.length) {
            setResume(files[0])
        } else {
            setResume(null)
        }

    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: "right"}}
                open={loading}
                autoHideDuration={6000}
                message="Job Applied Successfully."
            />

            <Button variant="contained" onClick={handleClickOpen}>
                Apply on the job
            </Button>
            <Dialog
                disableEscapeKeyDown={true}
                open={open}
                fullWidth={true}
                onClose={handleClose}
                maxWidth={'sm'}
            >
                <DialogTitle>Apply</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.data.name}
                    </DialogContentText>

                    <Item>
                        <TextField
                            onChange={handleChange}
                            value={candidateData.name}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            name="name"
                            fullWidth
                            placeholder="Name"
                            variant="outlined"
                            required={true}
                        />
                    </Item>

                    <Item>
                        <TextField
                            onChange={handleChange}
                            value={candidateData.email}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            name="email"
                            fullWidth
                            placeholder="Email"
                            variant="outlined"
                            required={true}
                        />
                    </Item>

                    <Item>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button component="label" variant="contained" startIcon={<FileUpload/>}>
                                Cover Letter
                                <VisuallyHiddenInput type="file" accept={'application/pdf'} onChange={handleCover}/>
                            </Button>
                            {
                                cover && <Tooltip title="Delete">
                                    <IconButton onClick={() => setCover(null)}>
                                        <Delete/>
                                    </IconButton>
                                </Tooltip>
                            }

                        </div>

                    </Item>
                    <Item>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button component="label" variant="contained" startIcon={<PictureAsPdf/>}>
                                Resume
                                <VisuallyHiddenInput type="file" accept={'application/pdf'} onChange={handleResume}/>
                            </Button>
                            {
                                resume && <Tooltip title="Delete">
                                    <IconButton onClick={() => setResume(null)}>
                                        <Delete/>
                                    </IconButton>
                                </Tooltip>
                            }
                        </div>
                    </Item>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant={'outlined'} type={'reset'} disabled={loading}>Cancel</Button>
                    <Button variant={'contained'} onClick={handleSubmit} type={'submit'}
                            disabled={loading || !candidateData.name || !candidateData.email || !resume || !cover}>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginBottom: '15px',
    color: theme.palette.text.secondary,
}));