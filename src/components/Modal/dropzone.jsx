import DeleteIcon from '@material-ui/icons/Delete';
import UploadFile from '@mui/icons-material/UploadFile';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import AWS from 'aws-sdk';

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.currentFile = '';

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: '',
      fileInfos: props.files.length === 0 ? [] : props.files,
      backgroundColor: 'black',
    };
  }

  deleteFileByIndex(index) {
    const files = this.state.fileInfos.filter((item, i) => i !== index);

    this.props.setFiles(files);
    this.setState({
      fileInfos: files,
    });
  }

  uploadFile(e, filename) {
    const s3 = new AWS.S3({
      accessKeyId: 'AKIAYNPWXNHBAAYUDROY',
      secretAccessKey: '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',
    });

    const params = {
      Bucket: 'hackatonbbvasourcecoders',
      Key: filename, // File name you want to save as in S3
      Body: e.currentTarget.result,
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
    });
  }

  readFile(file) {
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => this.uploadFile(e, file.name);
    fileReader.readAsText(file);
  }

  upload() {
    this.state.selectedFiles.forEach((file) => {
      this.readFile(file);
    });

    this.setState({
      progress: 0,
      fileInfos: this.state.selectedFiles,
    });

    this.setState({
      selectedFiles: undefined,
    });
  }

  onDrop(files) {
    this.props.setFiles(files);
    if (files.length > 0) {
      this.setState({ selectedFiles: files });
    }
  }

  onDragEnter() {
    this.setState({ color: 'blue' });
  }

  onDragLeave() {
    this.setState({ color: 'black' });
  }

  render() {
    const { selectedFiles, message, fileInfos, backgroundColor } = this.state;

    return (
      <div>
        <Dropzone
          onDrop={this.onDrop}
          multiple={true}
          accept='application/pdf'
          onDragEnter={() => this.onDragEnter()}
          onDragLeave={() => this.onDragLeave()}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {selectedFiles ? (
                  <div className={`selected-file ${backgroundColor}`}>
                    Archivos seleccionados: {selectedFiles.length}
                  </div>
                ) : (
                  'Arrastra y selecciona el archivo'
                )}
              </div>
              <aside className='selected-file-wrapper'>
                <Button
                  disabled={!selectedFiles}
                  onClick={this.upload}
                  variant='contained'
                  endIcon={<UploadFile />}
                >
                  Subir archivos
                </Button>
              </aside>
            </section>
          )}
        </Dropzone>

        <div className='alert alert-light' role='alert'>
          {message}
        </div>

        {fileInfos.length > 0 && (
          <div className='card'>
            <Typography>Lista de archivos</Typography>
            <List>
              {fileInfos.map((file, index) => (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => this.deleteFileByIndex(index)}
                    >
                      <DeleteIcon style={{ color: '#CC0000' }} />
                    </IconButton>
                  }
                >
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    );
  }
}
