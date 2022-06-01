import { Button } from '@mui/material';
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProposalAsync, fetchSdsAsync, fetchSourceCodeAsync, fetchSrsAsync, fetchStudentGroupAsync, fetchTitleAsync } from '../Redux/StudentAction';
import NoGroupsFormed from './studentComponent/NoGroupsFormed';
import SubmissionCard from './studentComponent/SubmissionCard';

const Submissions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { group, titles, proposal, srs, sds, source_code } = useSelector((data) => data.student);
  
  const [title, setTitle] = useState({isDisabled: false, isDone: false});
  const [proposalDocs, setProposalDocs] = useState({isDisabled: false, isDone: false});
  const [srsDocs, setSrsDocs] = useState({isDisabled: false, isDone: false});
  const [sdsDocs, setSdsDocs] = useState({isDisabled: false, isDone: false});
  const [sourceCode, setSourceCode] = useState({isDisabled: false, isDone: false});
  
  useEffect(() => {
    dispatch(fetchStudentGroupAsync());
  }, [dispatch]);

  useEffect(() => {
    if(group.length > 0){
      dispatch(fetchTitleAsync(group[0].id));
      dispatch(fetchProposalAsync(group[0].id));
      dispatch(fetchSrsAsync(group[0].id));
      dispatch(fetchSdsAsync(group[0].id));
      dispatch(fetchSourceCodeAsync(group[0].id));
    }
  }, [dispatch, group]);

  useEffect(() => {
    if(titles.length >= 3){
      setTitle({isDisabled: true, isDone: true});
    }
    if(proposal.length > 0){
      setProposalDocs({isDisabled: true, isDone: true});
    }
    if(srs.length > 0){
      setSrsDocs({isDisabled: true, isDone: true});
    }
    if(sds.length > 0){
      setSdsDocs({isDisabled: true, isDone: true});
    }
    if(source_code.length > 0){
      setSourceCode({isDisabled: true, isDone: true});
    }
  }, [titles, proposal, srs, sds, source_code]);

  const handleClick = () => {
    navigate('../groups')
  };
  return (
    <div style={{margin: "1em"}}>
        { group.length > 0 
          ? (
            <div>
              <SubmissionCard id={1} projectTitle="Project Title Submission" isDisabled={title.isDisabled} isDone={title.isDone}/>
              <SubmissionCard id={2} projectTitle="Project Proposal Submission" isDisabled={proposalDocs.isDisabled} isDone={proposalDocs.isDone} title="Project Proposal Submission" acceptType="application/pdf" submissionType="Proposal" imageIcon="ant-design:file-pdf-outlined" />
              <SubmissionCard id={2} projectTitle="SRS Documentation Submisson" isDisabled={srsDocs.isDisabled} isDone={srsDocs.isDone} title="SRS Docs Submission" acceptType="application/pdf" submissionType="SRS" imageIcon="ant-design:file-pdf-outlined" />
              <SubmissionCard id={3} projectTitle="SDS Documentation Submisson" isDisabled={sdsDocs.isDisabled} isDone={sdsDocs.isDone} title="SDS Docs Submission" acceptType="application/pdf" submissionType="SDS" imageIcon="ant-design:file-pdf-outlined" />
              <SubmissionCard id={4} projectTitle="Code Submission" isDisabled={sourceCode.isDisabled} isDone={sourceCode.isDone} title="Code Submission" acceptType="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed" submissionType="Code" imageIcon="ant-design:file-zip-filled" />
            </div>  
          )
          : <div style={{textAlign: 'center'}}>
              <NoGroupsFormed />
              <Button variant="contained" onClick={handleClick}>create group</Button> 
            </div>
        }
    </div>
  );
};

export default Submissions;