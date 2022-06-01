import { styled, Modal, Box, Button, Card, CardActions, CardContent, Checkbox, Typography } from '@mui/material';
import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../components/Iconify';

import { fetchStudentGroupAsync, proposalDocsSubmissionAsync, sdsDocsSubmissionAsync, sourceCodeSubmissionAsync, srsDocsSubmissionAsync } from '../../Redux/StudentAction';


const style = {
    margin: 'auto',
    width: '80%',
    maxWidth: 700,
    bgcolor: 'background.paper',
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

const Input = styled('input')({
    display: 'none',
});

const SubmitModal = ({ title, submissionType, acceptType, imageIcon}) => {
    const [docs, setDocs] = useState([]); 
    const [error, setError] = useState('');
    const [open, setOpen] = useState(true);
    
    const dispatch = useDispatch();
    const { group, fetchStudentGroupSuccess } = useSelector((data) => data.student);

    
    useEffect(() => {
        dispatch(fetchStudentGroupAsync());
    }, [dispatch]);
    
    
    const handleChange = (e) => {
        console.log(e.target.files[0]);
        setDocs(e.target.files[0]);
        setError('');
    }
    const handleUpload = (e) => {
        console.log('Upload is here', docs, fetchStudentGroupSuccess);
        if(docs !== [] && fetchStudentGroupSuccess){
            setError('');
            const formData = new FormData();
            formData.append("group", group[0].id);
            formData.append("submissionType", submissionType);
            formData.append("file", docs);
            // TODO: Dispatch To an API backend
            switch(submissionType){
                case "Proposal":
                    dispatch(proposalDocsSubmissionAsync(formData));
                    break;
                case "SRS":
                    dispatch(srsDocsSubmissionAsync(formData));
                    break;
                case "SDS":
                    dispatch(sdsDocsSubmissionAsync(formData));
                    break;
                case "CODE":
                    dispatch(sourceCodeSubmissionAsync(formData));
                    break;
                default:
                    break
            }
            handleClose();
        }else if(docs.length === 0){
            setError('Please select a file to submit...');
        }else if(docs.length > 1){
            setError('Please select a single file only...');
        }
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{display: 'flex', justifyContent: 'center'}}
        >
            <Box sx={style}>
                <Typography variant="h6" sx={{marginBottom: '2em'}}>{title}</Typography>
                <label htmlFor="browse-file" >
                    <Input accept={acceptType} id='browse-file' type="file" onChange={handleChange} />
                    {   docs.length === 0 ?
                        <Button 
                            variant="contained" 
                            component="span"
                            sx={{marginBottom: '1em', width: '50%'}}
                            >Browse
                        </Button> :
                        <>
                            <Iconify icon={imageIcon} sx={{width: 60, height: 60}} />
                            <Typography variant="h6" sx={{marginBottom: '1em'}}>{docs.name}</Typography>
                            <Button
                                variant="contained"
                                sx={{marginBottom: '1em', width: '50%'}}
                                onClick={handleUpload}
                            >Upload
                            </Button>
                        </>
                    }
                </label>
                {error && <Typography  variant="h6" color="error">{error}</Typography>}
            </Box>
        </Modal>
    );
}

const SubmissionCard = ({id, projectTitle, isDisabled, isDone, title, acceptType, submissionType, imageIcon}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if(id === 1){
        navigate('/student/project-title-submission');
    }else{
        setOpen(!open);
    }      
  };

  const handleClose = () => {
      setOpen(!open);
  }

  return (
    <div>
        <Card variant="outlined" sx={{marginBottom: '1em'}}>
            <CardContent>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h5">
                        {projectTitle}
                    </Typography>
                    <Checkbox disabled checked={isDone} />
                </div>
            </CardContent>
            <CardActions sx={{justifyContent: "right", padding: "1em"}}>
                <Button 
                    variant="contained" 
                    sx={{padding: "0.75em 1em"}} 
                    disabled={isDisabled}
                    onClick={handleClick}
                >Submit Docs
                </Button>
            </CardActions>
        </Card>
        {open && <SubmitModal title={title} open={open} handleClose={handleClose} acceptType={acceptType} submissionType={submissionType} imageIcon={imageIcon} />}
    </div>
  );
};

export default SubmissionCard;