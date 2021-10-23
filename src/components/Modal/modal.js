import React, {useRef, useState} from 'react'
import Modal from "@mui/material/Modal";
import Tabs from '@mui/material/Tabs';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from '@mui/material/Tab';
import './modal.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const UploadFileModal = ({uploadFileModal}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [bank, setBank] = useState('Banorte')

    const handleChange = () => {

    }

    return (
        <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={uploadFileModal}
        closeAfterTransition
        container={() => rootRef.current}>
           <div className='info-button'>
                <Tabs value={bank} onChange={handleChange}>
                    <Tab label="Banorte" {...a11yProps(0)} />
                    <Tab label="Bancomer" {...a11yProps(1)} />
                    <Tab label="Santander" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={bank} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={bank} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={bank} index={2}>
                    Item Three
                </TabPanel>
            </div> 
        </Modal>
    )
}

export default UploadFileModal
