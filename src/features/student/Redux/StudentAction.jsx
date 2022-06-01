import { STUDENTACTIONTYPE } from "./StudentType";
import StudentDataService from "../services/studentServices";
import successToast, { errorToast, progressToast } from "src/utils/toastMsg";
// import http from '../../../common/api';
import axios from 'axios';
/**
 * STUDENT FETCH ACTION
 * @returns ACTION
 */
export const fetchStudentStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_START
});
export const fetchStudentSuccess = (students) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SUCCESS,
    payload: { students }
});
export const fetchStudentFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_FAILURE,
    payload: { error }
});

/**
 * STUDENT GROUP CREATE ACTION
 * @returns ACTION
 */
export const createStudentGroupStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_START
});
export const createStudentGroupSuccess = (group) => ({
    type: STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_SUCCESS,
    payload: { group }
});
export const createStudentGroupFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_FAILURE,
    payload: { error }
});

/**
 * STUDENT GROUP FETCH ACTION
 * @returns ACTION
 */
 export const fetchStudentGroupStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_START
});
export const fetchStudentGroupSuccess = (group) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_SUCCESS,
    payload: { group }
});
export const fetchStudentGroupFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_FAILURE,
    payload: { error }
});
/**
 * STUDENT TITLE FETCH
 * @returns ACTION
 */
export const fetchTitleStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_TITLE_START,
});
export const fetchTitleSuccess = (titles) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_TITLE_SUCCESS,
    payload: { titles },
});
export const fetchTitleFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_TITLE_FAILURE,
    payload: { error }
});
/**
 * STUDENT TITLE SUBMISSION
 * @returns ACTION
 */
export const titleSubmissionStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_TITLE_SUBMISSION_START,
});
export const titleSubmissionSuccess = (title) => ({
    type: STUDENTACTIONTYPE.STUDENT_TITLE_SUBMISSION_SUCCESS,
    payload: { title }
});
export const titleSubmissionFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_TITLE_SUBMISSION_FAILURE,
    payload: { error }
});
/**
 * STUDENT PROPOSAL FETCH
 * @returns ACTION
 */
 export const fetchProposalStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_PROPOSAL_DOCS_START,
});
export const fetchProposalSuccess = (proposal) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_PROPOSAL_DOCS_SUCCESS,
    payload: { proposal },
});
export const fetchProposalFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_PROPOSAL_DOCS_FAILURE,
    payload: { error }
});
/**
/**
 * STUDENT PROJECT PROPOSAL SUBMISSION
 * @returns ACTION
 */
 export const proposalDocsSubmissionStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_PROPOSAL_DOCS_SUBMISSION_START,
});
export const proposalDocsSubmissionSuccess = () => ({
    type: STUDENTACTIONTYPE.STUDENT_PROPOSAL_DOCS_SUBMISSION_SUCCESS,
});
export const proposalDocsSubmissionFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_PROPOSAL_DOCS_SUBMISSION_FAILURE,
    payload: { error },
});
/**
 * STUDENT SRS DOCS FETCH
 * @returns ACTION
 */
 export const fetchSrsStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SRS_DOCS_START,
});
export const fetchSrsSuccess = (srs) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SRS_DOCS_SUCCESS,
    payload: { srs },
});
export const fetchSrsFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SRS_DOCS_FAILURE,
    payload: { error }
});
/**
 * STUDENT SRS DOCS SUBMISSION
 * @returns ACTION
 */
export const srsDocsSubmissionStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_SRS_DOCS_SUBMISSION_START,
});
export const srsDocsSubmissionSuccess = () => ({
    type: STUDENTACTIONTYPE.STUDENT_SRS_DOCS_SUBMISSION_SUCCESS,
});
export const srsDocsSubmissionFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_SRS_DOCS_SUBMISSION_FAILURE,
    payload: { error },
});
/**
 * STUDENT SDS DOCS FETCH
 * @returns ACTION
 */
 export const fetchSdsStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SDS_DOCS_START,
});
export const fetchSdsSuccess = (sds) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SDS_DOCS_SUCCESS,
    payload: { sds },
});
export const fetchSdsFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SDS_DOCS_FAILURE,
    payload: { error }
});
/**
 * STUDENT SDS DOCS SUBMISSION
 * @returns ACTION
 */
export const sdsDocsSubmissionStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_SDS_DOCS_SUBMISSION_START,
});
export const sdsDocsSubmissionSuccess = () => ({
    type: STUDENTACTIONTYPE.STUDENT_SDS_DOCS_SUBMISSION_SUCCESS,
});
export const sdsDocsSubmissionFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_SDS_DOCS_SUBMISSION_FAILURE,
    payload: { error },
});
/**
 * STUDENT SOURCE CODE FETCH
 * @returns ACTION
 */
 export const fetchSourceCodeStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SOURCE_CODE_START,
});
export const fetchSourceCodeSuccess = (source_code) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SOURCE_CODE_SUCCESS,
    payload: { source_code },
});
export const fetchSourceCodeFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_FETCH_SOURCE_CODE_FAILURE,
    payload: { error }
});
/**
 * STUDENT SOURCE CODE SUBMISSION
 * @returns ACTION
 */
export const sourceCodeSubmissionStart = () => ({
    type: STUDENTACTIONTYPE.STUDENT_SOURCE_CODE_SUBMISSION_START,
});
export const sourceCodeSubmissionSuccess = () => ({
    type: STUDENTACTIONTYPE.STUDENT_SOURCE_CODE_SUBMISSION_SUCCESS,
});
export const sourceCodeSubmissionFailure = (error) => ({
    type: STUDENTACTIONTYPE.STUDENT_SOURCE_CODE_SUBMISSION_FAILURE,
    payload: { error },
});

/**
 * STUDENT FETCH ASYNC ACTION TYPES
 */

export const fetchStudentAsync = () => {
    return async (dispatch) => {
        try{
            dispatch(fetchStudentStart());
            // progressToast('Student Fetch Loading...');
            const response = await StudentDataService.getAllStudents();
            dispatch(fetchStudentSuccess(response.data));
            // successToast('Student Fetch Success...');
        }catch(err){
            dispatch(fetchStudentFailure());
            // errorToast('Student Fetch Failed...');
        }
    }
}

/**
 * STUDENT GROUP CREATE ASYNC ACTION TYPES
 */

 export const createStudentGroupAsync = (Group) => {
    return async (dispatch) => {
        try{
            dispatch(createStudentGroupStart());
            // progressToast('Creating Group...')
            const response = await StudentDataService.createStudentGroup(Group);
            dispatch(createStudentGroupSuccess(response.data));
            // successToast('Successfully Created Group')
        }catch(err){
            dispatch(createStudentGroupFailure(err.message));
            // errorToast('Group Creation Failed');
        }
    }
}

/**
 * STUDENT GROUP FETCH ASYNC ACTION TYPES
 */

export const fetchStudentGroupAsync = () => {
    return async (dispatch) => {
        try{
            dispatch(fetchStudentGroupStart());
            const response = await StudentDataService.fetchStudentGroup();
            dispatch(fetchStudentGroupSuccess(response.data));
            // successToast('Group Fetch Success...');
        }catch(err){
            dispatch(fetchStudentGroupFailure(err.message));
            // errorToast('Group Fetching Failed...');
        }
    }
}
/** 
 * STUDENT TITLE FETCH
 */
export const fetchTitleAsync = (group_id) => {
    return async (dispatch) => {
        try{
            dispatch(fetchTitleStart());
            const response = await StudentDataService.fetchTitle(group_id);
            dispatch(fetchTitleSuccess(response.data));
        }catch(err){
            dispatch(fetchTitleFailure(err.message));
        }
    }
}; 
/**
 * STUDENT TITLE SUBMISSION
 */
export const titleSubmissionAsync = (group_id, title) => {
    return async (dispatch) => {
        try{
            dispatch(titleSubmissionStart())
            const response = await StudentDataService.submitTitle(group_id, title);
            dispatch(titleSubmissionSuccess());
        }catch(err){
            dispatch(titleSubmissionFailure(err.message));
        }
    }
}
/** 
 * STUDENT PROPOSAL FETCH
 */
 export const fetchProposalAsync = (group_id) => {
    return async (dispatch) => {
        try{
            dispatch(fetchProposalStart());
            const response = await StudentDataService.fetchProposal(group_id);
            dispatch(fetchProposalSuccess(response.data.results));
        }catch(err){
            dispatch(fetchProposalFailure(err.message));
        }
    }
};
/**
 * STUDENT PROPOSAL SUBMISSION
 */
 export const proposalDocsSubmissionAsync = (docs) => {
    return async (dispatch) => {
        try{
            dispatch(proposalDocsSubmissionStart())
            const response = await StudentDataService.submitProposal(docs);
            dispatch(proposalDocsSubmissionSuccess());
        }catch(err){
            dispatch(proposalDocsSubmissionFailure(err.message));
        }
    }
}
/** 
 * STUDENT SRS FETCH
 */
 export const fetchSrsAsync = (group_id) => {
    return async (dispatch) => {
        try{
            dispatch(fetchSrsStart());
            const response = await StudentDataService.fetchSRS(group_id);
            dispatch(fetchSrsSuccess(response.data.results));
        }catch(err){
            dispatch(fetchSrsFailure(err.message));
        }
    }
};
/**
 * STUDENT SRS DOCS SUBMISSION
 */
export const srsDocsSubmissionAsync = (docs) => {
    return async (dispatch) => {
        try{
            dispatch(srsDocsSubmissionStart());
            const response = await StudentDataService.submitSRS(docs);
            dispatch(srsDocsSubmissionSuccess());
        }catch(err){
            dispatch(srsDocsSubmissionFailure(err.message));
        }
    }
}
/** 
 * STUDENT TITLE FETCH
 */
 export const fetchSdsAsync = (group_id) => {
    return async (dispatch) => {
        try{
            dispatch(fetchSdsStart());
            const response = await StudentDataService.fetchSDS(group_id);
            dispatch(fetchSdsSuccess(response.data.results));
        }catch(err){
            dispatch(fetchSdsFailure(err.message));
        }
    }
};
/**
 * STUDENT SDS DOCS SUBMISSION
 */
export const sdsDocsSubmissionAsync = (docs) => {
    return async (dispatch) => {
        try{
            dispatch(sdsDocsSubmissionStart());
            const response = await StudentDataService.submitSDS(docs);
            dispatch(sdsDocsSubmissionSuccess());
            console.log(response.data);
        }catch(err){
            dispatch(sdsDocsSubmissionFailure(err.message));
        }
    }
}
/** 
 * STUDENT TITLE FETCH
 */
 export const fetchSourceCodeAsync = (group_id) => {
    return async (dispatch) => {
        try{
            dispatch(fetchSourceCodeStart());
            const response = await StudentDataService.fetchSourceCode(group_id);
            dispatch(fetchSourceCodeSuccess(response.data.results));
        }catch(err){
            dispatch(fetchSourceCodeFailure(err.message));
        }
    }
};
/**
 * STUDENT SOURCE CODE SUBMISSION
 */
export const sourceCodeSubmissionAsync = (source_code) => {
    return async (dispatch) => {
        try{
            dispatch(sourceCodeSubmissionStart());
            const response = await StudentDataService.submitSourceCode();
            dispatch(sourceCodeSubmissionSuccess());
            console.log(response.data);
        }catch(err){
            dispatch(sourceCodeSubmissionFailure(err.message));
        }
    }
}