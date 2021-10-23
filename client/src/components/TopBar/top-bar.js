import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
// import UploadIcon from '@mui/icons-material/Upload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useStyles from './styles';
import UploadFileModal from '../Modal/modal';

const TopBar = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <AppBar style={{ backgroundColor: '#072146' }}>
        <Toolbar className={classes.appBar}>
          <Typography variant='h1' className={classes.title}>
            BBVA
          </Typography>
          <Button
            onClick={() => setShowModal(true)}
            className={classes.button}
            variant='contained'
            startIcon={<FileUploadIcon />}
          >
            Upload File
          </Button>
        </Toolbar>
      </AppBar>
      <UploadFileModal
        uploadFileModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default TopBar;
