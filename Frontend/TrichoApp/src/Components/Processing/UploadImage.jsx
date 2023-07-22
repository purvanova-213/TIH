import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { green } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export const UploadImage = ({ onSetImagePath }) => {
  const [imagePath, setImagePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    uploadFile(file);
  };

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);

        timer.current = window.setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }, 10000);
    }
  };

  function uploadFile(file) {
    const fileSizeLimit = 1024; // In MB
    if (file.size <= fileSizeLimit * 1024 * 1024) {
      try {
        const formData = new FormData();
        formData.append('fileUpload', file);

        setLoading(true);
        timer.current = window.setTimeout(() => {
        setImagePath(URL.createObjectURL(file));
        setLoading(false);


        onSetImagePath(URL.createObjectURL(file));
        }, 2000);

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      alert('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
    }
  }

  return (
    <Box sx={{maxWidth: 600, margin: '0 auto', padding: '1rem', marginTop: '20px' }}>
      <Card>
        <CardContent>
          <Box
            component="label"
            htmlFor="file-upload"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          >
            <input
              id="file-upload"
              type="file"
              name="fileUpload"
              accept="image/*"
              hidden
              onChange={handleFileInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<SaveIcon />}
              onClick={handleButtonClick}
              disabled={loading}
              sx={{
                ...(success && {
                  bgcolor: green[500],
                  '&:hover': {
                    bgcolor: green[700],
                  },
                }),
              }}
            >
              Select a file
            </Button>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
              background: '#fff',
              borderRadius: 7,
              border: '3px solid #eee',
              padding: '2rem 1.5rem',
              marginTop: '1rem',
              position: 'relative',
            }}
          >
            {imagePath && (
              <img
                src={imagePath}
                alt="Preview"
                style={{ width: 'auto', height: 'auto', maxWidth: 180 }}
              />
            )}

            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: success ? green[500] : undefined,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}

            {success && (
              <Fab
                aria-label="save"
                color="primary"
                sx={{
                  bgcolor: green[500],
                  '&:hover': {
                    bgcolor: green[700],
                  },
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-28px',
                  marginLeft: '-28px',
                  zIndex: 1,
                }}
                onClick={handleButtonClick}
              >
                <CheckIcon />
              </Fab>
            )}

            <Box
              sx={{
                display: imagePath ? 'none' : 'block',
                color: '#5f6982',
                marginTop: '.5rem',
                height: '200px' ,
              }}
            >
              Please select an image
            </Box>

            <Typography
              variant="body1"
              color="textSecondary"
              component="div"
              id="messages"
              sx={{ marginBottom: '.5rem' }}
            ></Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
