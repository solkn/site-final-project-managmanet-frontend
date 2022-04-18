import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { assignCoordinator } from 'src/features/admin/Redux/assignCoordinator/action';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ username, initial }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.assign);
  console.log(state);
  console.log(username);

  const onAssignClick = () => {
    console.log('menu item dispatch is clicked: ');
    const coordinator = { user: username, batch: '2014' };
    dispatch(assignCoordinator(coordinator));
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {initial === 'staff' ? (
          <MenuItem onClick={() => onAssignClick()} sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Iconify icon="ic:round-assignment-ind" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Assign" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : null}

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
