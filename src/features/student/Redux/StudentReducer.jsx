import { STUDENTACTIONTYPE } from './StudentType';

const INITIAL_STATE = {
    createStudentGroupLoading: false,
    createStudentGroupSuccess: false,
    createStudentGroupFailure: null,
    fetchStudentGroupLoading: false,
    fetchStudentGroupSuccess: false,
    fetchStudentGroupFailure: null,
    fetchStudentsLoading: false,
    fetchStudentsSuccess: false,
    fetchStudentsFailure: null,
    fetchTitleStart: false,
    fetchTitleSuccess: false,
    fetchTitleFailure: null,
    titleSubmissionLoading: false,
    titleSubmissionSuccess: false,
    titleSubmissionFailure: null,
    fetchProposalStart: false,
    fetchProposalSuccess: false,
    fetchProposalFailure: null,
    proposalDocsSubmissionLoading: false,
    proposalDocsSubmissionSuccess: false,
    proposalDocsSubmissionFailure: null,
    srsDocsSubmissionLoading: false,
    srsDocsSubmissionSuccess: false,
    srsDocsSubmissionFailure: null,
    fetchSRSStart: false,
    fetchSRSSuccess: false,
    fetchSRSFailure: null,
    sdsDocsSubmissionLoading: false,
    sdsDocsSubmissionSuccess: false,
    sdsDocsSubmissionFailure: null,
    fetchSourceCodeStart: false,
    fetchSourceCodeSuccess: false,
    fetchSourceCodeFailure: null,
    sourceCodeSubmissionLoading: false,
    sourceCodeSubmissionSuccess: false,
    sourceCodeSubmissionFailure: null,
    students: [],
    group: [],
    titles: [],
    proposal: [],
    srs: [],
    sds: [],
    source_code: [],
}

export const StudentReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case STUDENTACTIONTYPE.STUDENT_FETCH_START:
            return {
                ...state,
                fetchStudentsLoading: true,
                fetchStudentsFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_SUCCESS:
            return {
                ...state,
                fetchStudentsLoading: false,
                fetchStudentsSuccess: true,
                fetchStudentsFailure: null,
                students: action.payload.students
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_FALIURE:
            return {
                ...state, 
                fetchStudentsLoading: false,
                fetchStudentsFailure: action.payload.error
            };
        case STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_START:
            return {
                ...state,
                createStudentGroupLoading: true,
                createStudentGroupFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_SUCCESS:
            return {
                ...state,
                createStudentGroupLoading: false,
                createStudentGroupSuccess: true,
                createStudentGroupFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_CREATE_GROUP_FAILURE:
            return {
                ...state,
                createStudentGroupLoading: false,
                createStudentGroupFailure: action.payload.error
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_START:
            return {
                ...state,
                fetchStudentGroupLoading: true,
                fetchStudentGroupFailure: false
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_SUCCESS:
            return {
                ...state,
                fetchStudentGroupLoading: false,
                fetchStudentGroupSuccess: true,
                fetchStudentGroupFailure: null,
                group: action.payload.group
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_GROUP_FAILURE:
            return {
                ...state,
                fetchStudentGroupLoading: false,
                fetchStudentGroupFailure: action.payload.error
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_TITLE_START:
            return {
                ...state,
                fetchTitleStart: true,
                fetchTitleFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_TITLE_SUCCESS:
            return {
                ...state,
                fetchTitleStart: false,
                fetchTitleSuccess: true,
                fetchTitleFailure: null,
                titles: action.payload.titles,
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_TITLE_FAILURE:
            return {
                ...state,
                fetchTitleStart: false,
                fetchTitleFailure: action.payload.error,
            };
        case STUDENTACTIONTYPE.STUDENT_TITLE_SUBMISSION_START:
            return {
                ...state,
                titleSubmissionLoading: true,
                titleSubmissionFailure: false
            };
        case STUDENTACTIONTYPE.STUDENT_TITLE_SUBMISSION_SUCCESS:
            return {
                ...state,
                titleSubmissionLoading: false,
                titleSubmissionSuccess: true,
                titleSubmissionFailure: false,
            };
        case STUDENTACTIONTYPE.STUDENT_TITLE_SUBMISSION_FAILURE:
            return {
                ...state,
                titleSubmissionLoading: false,
                titleSubmissionFailure: action.payload.error,
            }
        case STUDENTACTIONTYPE.STUDENT_FETCH_PROPOSAL_DOCS_START:
            return {
                ...state,
                fetchProposalStart: true,
                fetchProposalFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_PROPOSAL_DOCS_SUCCESS:
            return {
                ...state,
                fetchProposalStart: false,
                fetchProposalsSuccess: true,
                fetchProposalFailure: null,
                proposal: action.payload.proposal,
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_PROPOSAL_DOCS_FAILURE:
            return {
                ...state,
                fetchProposalStart: false,
                fetchProposalFailure: action.payload.error,
            };        
        case STUDENTACTIONTYPE.STUDENT_PROPOSAL_DOCS_SUBMISSION_START:
            return {
                ...state,
                proposalDocsSubmissionLoading: true,
                proposalDocsSubmissionFailure: false
            };
        case STUDENTACTIONTYPE.STUDENT_PROPOSAL_DOCS_SUBMISSION_SUCCESS:
            return {
                ...state,
                propsalDocsSubmissionLoading: false,
                propsalDocsSubmissionSuccess: true,
                propsalDocsSubmissionFailure: false,
            };
        case STUDENTACTIONTYPE.STUDENT_PROPOSAL_DOCS_SUBMISSION_FAILURE:
            return {
                ...state,
                proposalDocsSubmissionLoading: false,
                proposalDocsSubmissionFailure: action.payload.error,
            }
        case STUDENTACTIONTYPE.STUDENT_FETCH_SRS_DOCS_START:
            return {
                ...state,
                fetchSRSStart: true,
                fetchSRSFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_SRS_DOCS_SUCCESS:
            return {
                ...state,
                fetchSRSStart: false,
                fetchSRSSuccess: true,
                fetchSRSFailure: null,
                srs: action.payload.srs,
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_SRS_DOCS_FAILURE:
            return {
                ...state,
                fetchSRSStart: false,
                fetchSRSFailure: action.payload.error,
            };
        case STUDENTACTIONTYPE.STUDENT_SRS_DOCS_SUBMISSION_START:
            return {
                ...state,
                srsDocsSubmissionLoading: true,
                srsDocsSubmissionFailure: null,
            }
        case STUDENTACTIONTYPE.STUDENT_SRS_DOCS_SUBMISSION_SUCCESS:
            return {
                ...state,
                srsDocsSubmissionLoading: false,
                srsDocsSubmissionSuccess: true,
                srsDocsSubmissionFailure: null,
            }
        case STUDENTACTIONTYPE.STUDENT_SRS_DOCS_SUBMISSION_FAILURE:
            return {
                ...state,
                srsDocsSubmissionLoading: false,
                srsDocsSubmissionFailure: action.payload.error,
            }
        case STUDENTACTIONTYPE.STUDENT_FETCH_SDS_DOCS_START:
            return {
                ...state,
                fetchSDSStart: true,
                fetchSDSFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_SDS_DOCS_SUCCESS:
            return {
                ...state,
                fetchSDSStart: false,
                fetchSDSSuccess: true,
                fetchSDSFailure: null,
                sds: action.payload.sds,
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_SDS_DCOS_FAILURE:
            return {
                ...state,
                fetchSDSStart: false,
                fetchSDSFailure: action.payload.error,
            };
        case STUDENTACTIONTYPE.STUDENT_SDS_DOCS_SUBMISSION_START:
            return {
                ...state,
                sdsDocsSubmissionLoading: true,
                sdsDocsSubmissionFailure: null,
            }
        case STUDENTACTIONTYPE.STUDENT_SDS_DOCS_SUBMISSION_SUCCESS:
            return {
                ...state,
                sdsDocsSubmissionLoading: false,
                sdsDocsSubmissionSuccess: true,
                sdsDocsSubmissionFailure: null,
            }
        case STUDENTACTIONTYPE.STUDENT_SDS_DOCS_SUBMISSION_FAILURE:
            return {
                ...state,
                sdsDocsSubmissionLoading: false,
                sdsDocsSubmissionFailure: action.payload.error,
            }
        case STUDENTACTIONTYPE.STUDENT_FETCH_SOURCE_CODE_START:
            return {
                ...state,
                fetchSourceCodeStart: true,
                fetchSourceCodeFailure: null
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_SOURCE_CODE_SUCCESS:
            return {
                ...state,
                fetchSourceCodeStart: false,
                fetchSourceCodeSuccess: true,
                fetchSourceCodeFailure: null,
                source_code: action.payload.source_code,
            };
        case STUDENTACTIONTYPE.STUDENT_FETCH_SOURCE_CODE_FAILURE:
            return {
                ...state,
                fetchSourceCodeStart: false,
                fetchSourceCodeFailure: action.payload.error,
            };
        case STUDENTACTIONTYPE.STUDENT_SOURCE_CODE_SUBMISSION_START:
            return {
                ...state,
                sourceCodeSubmissionLoading: true,
                sourceCodeSubmissionFailure: null,
            }
        case STUDENTACTIONTYPE.STUDENT_SOURCE_CODE_SUBMISSION_SUCCESS:
            return {
                ...state,
                sourceCodeSubmissionLoading: false,
                sourceCodeSubmissionSuccess: true,
                sourceCodeSubmissionFailure: null,
            }
        case STUDENTACTIONTYPE.STUDENT_SOURCE_CODE_SUBMISSION_FAILURE:
            return {
                ...state,
                sourceCodeSubmissionLoading: false,
                sourceCodeSubmissionFailure: action.payload.error,
            }
        default: 
            return state
    }
};