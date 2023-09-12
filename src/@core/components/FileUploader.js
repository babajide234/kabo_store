import React, { useState } from 'react';
import { Grid, Box, Button, LinearProgress, Typography } from "@mui/material";
import axios from 'axios';
import { instance } from '../hooks/service';
import { useUserStore } from '../store/userStore';
import { uploadStore } from '../store/uploadSlice';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function FileUploader({  }) {

    const [currentFile, setCurrentFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState(null);

    const user = useUserStore(state=> state.user)
    const file_url = uploadStore(state=> state.file_url)
    const setFileUrl = uploadStore(state=> state.setFileUrl)

    const handleFileSelect = (event) => {
      setCurrentFile(event.target.files[0]);
      console.log(user);
    };
  
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('token', user);
      formData.append('file', currentFile);
  
      try {
        const response = await instance.post('misc/file-upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            },
        });
        
        console.log(response);

        if(response.data.status == "success"){
            setFileUrl(response.data.file_url)
            setUploadStatus('success');
        }else{
            setUploadStatus('failed');
        }

        // Do something with the response data if needed

      } catch (error) {
        console.error(error);
        setUploadStatus('failed');

        // Handle error if needed
      }
    };
  
    return (
      <Grid item xs={12} sm={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
            />
            <Button className="btn-choose" variant="outlined" component="span">
              Choose Image
            </Button>
          </label>
          <div className="file-name">{currentFile ? currentFile.name : null}</div>
          <Button
            className="btn-upload"
            color="primary"
            variant="contained"
            component="span"
            disabled={!currentFile}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Box>
        {currentFile && (
          <Box mt={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                uploadProgress
              )}%`}</Typography>
            </Box>
          </Box>
        )}
        {uploadStatus === 'success' && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" color="primary">
                    Upload successful! 
                </Typography>
                
                <a href={file_url} target="_blank" rel="noreferrer"><OpenInNewIcon/></a>
            </Box>
        )}
      {uploadStatus === 'failed' && (
        <Typography variant="body1" color="error">
          Upload failed. Please try again.
        </Typography>
      )}
      </Grid>
    );
  };
  
export default FileUploader;

