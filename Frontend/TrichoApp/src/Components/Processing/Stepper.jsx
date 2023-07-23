import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { UploadImage } from './UploadImage.jsx';
import { ProcessedImage } from './ProcessedImage.jsx';
import { Charts } from './Chart.jsx';
import { ChartData } from './ChartData.jsx';

export const HorizontalStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [imagePath, setImagePath] = useState(null);


  const handleSetImagePath = (path) => {
    setImagePath(path);
  };

  const steps = [
    {
      label: "Upload Image",
      content: <UploadImage onSetImagePath={handleSetImagePath} />,
      description: "Step 1 content: Upload Patient's Image",
    },
    {
      label: "Processed Image",
      content: <ProcessedImage imagePath={imagePath} />,
      description: "Step 2 content: Processing the uploaded Image",
    },
    {
      label: "Charts",
      content: <Charts isLoading={false} ChartData={ChartData} />,
      description: "Step 3 content: Generate Report",
    },
    {
      label: "Generate Report",
      // content: <Signup />,
      description: "Step 3 content: Generate Report",
    },
  ];

  const handleNext = () => {
    setActiveStep((currentStep) => Math.min(currentStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((currentStep) => Math.max(currentStep - 1, 0));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ margin: '0' }}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {steps[activeStep].content}
        <br />
        <Typography sx={{ textAlign: 'center' }}>{steps[activeStep].description}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
            <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </ButtonGroup>
        </Box>
      </div>
    </Box>
  );
};
