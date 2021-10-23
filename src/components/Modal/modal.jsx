import React, { useRef, useState } from 'react';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './modal.css';
import FileItem from './dropzone';
import TabPanel, { a11yProps } from './tabs';

const UploadFileModal = ({ uploadFileModal, setShowModal }) => {
  const rootRef = useRef(null);
  const [bank, setBank] = useState(0);
  const [banorteFiles, setBanorteFiles] = useState([]);
  const [bbvaFiles, setBBVAFiles] = useState([]);
  const [santanderFiles, setSantanderFiles] = useState([]);

  const handleChange = (event, newValue) => {
    console.log(banorteFiles, bbvaFiles, santanderFiles);
    setBank(newValue);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      onClose={handleClose}
      open={uploadFileModal}
      closeAfterTransition
      container={() => rootRef.current}
    >
      <div className='info-button'>
        <Tabs value={bank} onChange={handleChange}>
          <Tab label='Banorte' {...a11yProps(0)} />
          <Tab label='Bancomer' {...a11yProps(1)} />
          <Tab label='Santander' {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={bank} index={0}>
          <FileItem files={banorteFiles} setFiles={setBanorteFiles} />
        </TabPanel>
        <TabPanel value={bank} index={1}>
          <FileItem files={bbvaFiles} setFiles={setBBVAFiles} />
        </TabPanel>
        <TabPanel value={bank} index={2}>
          <FileItem files={santanderFiles} setFiles={setSantanderFiles} />
        </TabPanel>
      </div>
    </Modal>
  );
};

export default UploadFileModal;
