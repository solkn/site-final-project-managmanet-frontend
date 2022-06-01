/* eslint-disable no-whitespace-before-property */
import { Autocomplete, Box, Grid, Modal, Paper, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Iconify from 'src/components/Iconify';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import AddAdvisor from './AddAdvisor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaffAsync } from 'src/features/admin/Redux';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import { Chat } from '@mui/icons-material';
import { AssignAdvisor, AssignExaminer } from '../Redux/AssignAdvisor/action';
import { toast } from 'react-toastify';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    "&:hover": {
        backgroundColor: "rgba(59, 123, 188,0.1) !important",
        transform: 'scale(1.1)',
        '#delete_icon': {
            display: 'block',
            '&:hover': {
                cursor: 'pointer',
                transform: 'scale(1.5)',
                color: theme.palette.primary.main,
            }

        }
    },
    '#delete_icon': {
        display: 'none'
    }

}));

const useStyles = makeStyles({
    cardstyle: {
        "&:hover": {
            transform: 'scale(1.1)',
            backgroundColor: "rgba(59, 123, 188,0.05) !important",
        }
    }
})


const style = {
    margin: 'auto',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4
};

function CoordinatorGroupDetailPage() {
    const classes = useStyles();
    const state = useLocation();

    console.log(state.state.advisors);
    const dispath = useDispatch();
    const [ex_open, setExOpen] = useState(false, 'a');
    const [ad_open, setAdOpen] = useState(false, 'a');
    const [groupName, setGroupName] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);
    const staffs = useSelector(state => state.admin);

    console.log(staffs);

    const handleOpen = () => setExOpen(true);
    const handleClose = () => setExOpen(false);
    const handleExOpen = () => setExOpen(true);
    const handleExClose = () => setExOpen(false);

    const handleCancel = () => {
        setAdOpen(false);
        setExOpen(false);
        setGroupName('');
        setGroupMembers([]);
    };



    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    };
    const handleGroupMemberChange = (e, value) => {
        console.log(value);
        setGroupMembers(value);
    };
    const handleAdvisorSubmit = (e) => {
        console.log(groupName);
        if (groupMembers.length > 0) {
            console.log(state.state.id);
            console.log(groupMembers[0].username);
            const data = { group: state.state.id, advisor: groupMembers[0].username }
            dispath(AssignAdvisor(data))
            handleCancel()
        } else {
            toast.info('please select advisor', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 6000
            });
            handleCancel()
        }
    };
    const handleExaminerSubmit = (e) => {
        console.log(groupName);
        if (groupMembers.length > 0) {
            console.log(state.state.id);
            console.log(groupMembers[0].username);
            const data = { group: state.state.id, examiner: groupMembers[0].username }
            console.log(data);
            dispath(AssignExaminer(data))
            handleCancel()
        } else {
            toast.info('please select examiner', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 6000
            });
            handleCancel()
        }


    };
    useEffect(() => {
        dispath(fetchStaffAsync())
    }, [dispath])

    return (
        <>
            <Typography variant="h5" sx={{ mb: 1, pl: 4 }}>
                Group members
            </Typography>

            <Grid container spacing={7} pl={4} pr={4}>
                <Grid item xs={12} md={6} >
                    <Grid container spacing={1}>
                        {
                            state.state.members?.map((data, index) => (
                                <Grid item xs={12}  >
                                    <Item >
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }} >
                                            <Typography variant="body1" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                                                {`${index + 1}. ${data.username}`}
                                            </Typography>
                                            <Box onClick={() => console.log('yeah clicked')}>
                                                <Iconify key={''} id='delete_icon' icon={'fluent:delete-16-filled'} width={24} height={24} />
                                            </Box>
                                        </Box>
                                    </Item>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card className={classes.cardstyle} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {state.state.g_name}
                            </Typography>
                            <Typography variant="body2">
                                Title:{'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">See More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>

                    <Card sx={{ maxWidth: '100%' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/mock-images/groups/advisor.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Advisors
                            </Typography>

                            {state.state.advisors?.length === 0 ? <Typography variant="body2" component="div">
                                no advisor added
                            </Typography> :
                                state.state.advisors?.map((data, index) => (
                                    <Grid item xs={12}  >
                                        <Item >
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }} >
                                                <Typography variant="body1" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                                                    {`${index + 1}. ${data.username}`}
                                                </Typography>
                                                <Box onClick={() => console.log('yeah clicked')}>
                                                    <Iconify key={''} id='delete_icon' icon={'fluent:delete-16-filled'} width={24} height={24} />
                                                </Box>
                                            </Box>
                                        </Item>
                                    </Grid>
                                ))
                            }

                        </CardContent>
                        <CardActions>
                            <Button data-cy="addadvisor" onClick={() => setAdOpen(true)} variant="contained" startIcon={<AddIcon />}>
                                Add
                            </Button>
                            <Button variant="outlined" startIcon={<Chat />}>
                                chat
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ maxWidth: '100%' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/mock-images/groups/examiner.jpg"
                            alt="examiner"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Examiners
                            </Typography>
                            {state.state.examiners?.length === 0 ? <Typography variant="body2" component="div">
                                no examiners added
                            </Typography> :
                                state.state.examiners?.map((data, index) => (
                                    <Grid item xs={12}  >
                                        <Item >
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }} >
                                                <Typography variant="body1" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                                                    {`${index + 1}. ${data.username}`}
                                                </Typography>
                                                <Box onClick={() => console.log('yeah clicked')}>
                                                    <Iconify key={''} id='delete_icon' icon={'fluent:delete-16-filled'} width={24} height={24} />
                                                </Box>
                                            </Box>
                                        </Item>
                                    </Grid>
                                ))
                            }

                        </CardContent>
                        <CardActions>
                            <Button data-cy="addexaminer" onClick={() => setExOpen(true)} variant="contained" startIcon={<AddIcon />}>
                                Add
                            </Button>
                            <Button variant="outlined" startIcon={<Chat />}>
                                chat
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid >
            {ad_open &&
                <Modal
                    open={ad_open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{ display: 'flex', alignItems: 'center', jusitifyContent: 'center' }}
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex' }}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                style={{ marginLeft: '1em' }}
                            >
                                Add More
                            </Typography>
                        </div>
                        <Autocomplete
                            data-cy="advisorauto"
                            multiple
                            id="outlined-multi"
                            options={staffs.staffs}
                            isOptionEqualToValue={(option, value) => option.username === value.username}
                            getOptionLabel={(option) => option.username}
                            defaultValue={[]}
                            value={groupMembers}
                            onChange={handleGroupMemberChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Staffs"
                                    placeholder="Add Examier"
                                />
                            )}
                            sx={{ marginTop: '1em' }}
                        />
                        <div style={{ display: 'flex', marginTop: '2em', justifyContent: 'right' }}>
                            <Button onClick={handleCancel} variant="contained" color="error">
                                Cancel
                            </Button>
                            <Button data-cy="addadvisorbtn" onClick={handleAdvisorSubmit} variant="contained" sx={{ marginLeft: '1em' }}>
                                Save
                            </Button>
                        </div>
                    </Box>
                </Modal>
            }
            {ex_open &&
                <Modal
                    open={ex_open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{ display: 'flex', alignItems: 'center', jusitifyContent: 'center' }}
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex' }}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                style={{ marginLeft: '1em' }}
                            >
                                Add Examiner
                            </Typography>
                        </div>
                        <Autocomplete
                            multiple
                            data-cy="examinerauto"
                            id="outlined-multi"
                            options={staffs.staffs}
                            isOptionEqualToValue={(option, value) => option.username === value.username}
                            getOptionLabel={(option) => option.username}
                            defaultValue={[]}
                            value={groupMembers}
                            onChange={handleGroupMemberChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Staffs"
                                    placeholder="Add Examier"
                                />
                            )}
                            sx={{ marginTop: '1em' }}
                        />
                        <div style={{ display: 'flex', marginTop: '2em', justifyContent: 'right' }}>
                            <Button onClick={handleCancel} variant="contained" color="error">
                                Cancel
                            </Button>
                            <Button data-cy="addexaminerbtn" onClick={handleExaminerSubmit} variant="contained" sx={{ marginLeft: '1em' }}>
                                Save
                            </Button>
                        </div>
                    </Box>
                </Modal>
            }
        </>
    )
}

export default CoordinatorGroupDetailPage