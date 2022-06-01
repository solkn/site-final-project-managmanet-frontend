import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddBatch from './AddBatch';

const TAB_OPTIONS = [
  {
    label: 'Add batch',
    value: '1'
  },
  {
    label: 'set Coordinator',
    value: '2'
  },
  {
    label: 'Item Three',
    value: '3'
  },
  {
    label: 'others',
    value: '4'
  }
];

export default function ColorTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {TAB_OPTIONS.map(val => (
              <Tab label={val.label} value={val.value} />
            ))}
          </TabList>
        </Box>
        <TabPanel value="1">
          <AddBatch />
        </TabPanel>
        <TabPanel value="2">set Coordinator comming soon...</TabPanel>
        <TabPanel value="3">Item Three comming soon...</TabPanel>
        <TabPanel value="4">Others comming soon...</TabPanel>
      </TabContext>
    </Box>
  );
}
