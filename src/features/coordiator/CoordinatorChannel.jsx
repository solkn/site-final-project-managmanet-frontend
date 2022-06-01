import { Avatar, Box, Divider, Fab, Grid, Input, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Search, Send } from '@mui/icons-material'

const useStyles = makeStyles((theme) => ({

  chatSection: {
    MaxWidth: '90%',
    MinWidth: '60%',
    height: '70vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },

  },
  messageArea: {
    height: '60vh',
    overflowY: 'auto'
  },

  paperContainer: {
    backgroundImage: `url('/static/mock-images/groups/chat-back.jpg')`
  }

}));


const chatToolbarStyles = makeStyles((theme) => ({
  chatToolbarRoot: {
    color: '#FFF',
    margin: '8px',
    minHeight: '32px',
    backgroundColor: '#0377ad', //'#0595DD', //'#23232F',
    borderRadius: '2px',
    justifyContent: 'center',
  },
  innerContent: {
    width: '100%',
  },
  chatTitle: {
    margin: '0 auto'
  },
  searchWrapper: {
    backgroundColor: '#025279',
    borderRadius: '3px',
    border: 'solid 1px #025279',
    color: '#FFF',
    margin: '5px'
  },
  searchInput: {
    width: '80px',
    paddingLeft: '8px',
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&::placeholder': {
      color: '#FFF',
      opacity: 1
    },
    '&:focus': {
      width: '200px'
    }
  },
  searchIcon: {
    color: '#FFF',
    marginTop: '3px'
  }
}));

const ChatToolbar = () => {
  const classes = chatToolbarStyles();
  return (
    <Toolbar disableGutters={true} className={classes.chatToolbarRoot}>
      <Input classes={{ root: classes.searchWrapper, input: classes.searchInput }} disableUnderline={true} placeholder={"Search"}
        endAdornment={<Search className={classes.searchIcon} />}
      />
    </Toolbar>
  );


}


const CoordinatorChannel = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5" className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item md={3} className={classes.borderRight500}>
          <ChatToolbar />
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
              </ListItemIcon>
              <ListItemText primary="Coordinator"></ListItemText>
            </ListItem>
          </List>
          <Divider />

          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
              </ListItemIcon>
              <ListItemText primary="Group 1">Group 1</ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>
            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
              </ListItemIcon>
              <ListItemText primary="Group 2">Group 2</ListItemText>
            </ListItem>
            <ListItem button key="CindyBaker">
              <ListItemIcon>
                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
              </ListItemIcon>
              <ListItemText primary="Group 3">Group 3</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} justifyContent="flex-end" >
          {/* <Paper className={classes.paperContainer} > */}
          <List className={classes.messageArea} >
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ borderRadius: '10px 10px 10px 0px', padding: 1 }} style={{ backgroundColor: '#025279', color: '#ffffff', width: 'fit-content' }} display="flex" justifyContent="flex-end">
                    <ListItemText align="left" primary="Hello, What's up ?" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" primary={<Typography variant="subtitle2" type="5px" style={{ color: 'grey' }}>09:32</Typography>} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ borderRadius: '10px 10px 10px 0px', padding: 1 }} style={{ backgroundColor: '#025279', color: '#ffffff', width: 'fit-content' }} display="flex" justifyContent="flex-end">
                    <ListItemText align="left" primary="This is your coordinator" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" primary={<Typography variant="subtitle2" type="5px" style={{ color: 'grey' }}>09:33</Typography>} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ borderRadius: '10px 10px 10px 0px', padding: 1 }} style={{ backgroundColor: '#025279', color: '#ffffff', width: 'fit-content' }} display="flex" justifyContent="flex-end">
                    <ListItemText align="left" primary="is everything OK?" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" primary={<Typography variant="subtitle2" type="5px" style={{ color: 'grey' }}>09:34</Typography>} />
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: '2px' }}>
            <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab borderRadius='1' color="primary" aria-label="add"><Send /></Fab>
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      </Grid>
    </div>
  );
}

export default CoordinatorChannel;