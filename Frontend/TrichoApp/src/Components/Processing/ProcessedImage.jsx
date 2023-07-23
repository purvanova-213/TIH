import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { green } from '@mui/material/colors';
import './text.css';

const labelStyles = {
  background: 'linear-gradient(135deg, #3B2667 10%, #BC78EC 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '15px',
  lineHeight: '1.1',
  fontFamily: 'system-ui',
  margin: '0',
};


const Label = ({ text }) => (
  <ListItemText primary={text} primaryTypographyProps={{ style: labelStyles }} />
);

const ResultLabel = ({ text }) => (
  <ListItemSecondaryAction>
    <ListItemText primary={text} primaryTypographyProps={{ style: labelStyles }} />
  </ListItemSecondaryAction>
);

export const ProcessedImage = ({ imagePath }) => {
  return (
    <Card sx={{ margin: '20px auto', width: 800 }}>
      <CardContent>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          {imagePath ? (
            <img
              src={imagePath}
              alt="Processed Preview"
              style={{ width: 'auto', height: 'auto', maxWidth: 180 }}
            />
          ) : (
            <Typography variant="body1" color="textSecondary">
              No image selected
            </Typography>
          )}
        </Box>
        <List sx={{ mt: 2 }}>
          <ListItem>
            <Label text="Area" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="Hair Count" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="Hair Density [ 1/cm2 ]" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="Ratio of Vellus Hairs" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="Ratio of Terminal Hairs" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="Density of Vellus Hairs [ 1/cm2 ]" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="Density of Terminal Hairs [ 1/cm2 ]" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="Median Hair Thickness" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="Mean Hair Thickness" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="Yellow Spot Detected" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="Red Spot Detected" />
            <ResultLabel text="-" />
          </ListItem>
          <ListItem>
            <Label text="White Spot Detected" />
            <ResultLabel text="-" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};


// import React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
// import { green } from '@mui/material/colors';
//
// const labelStyles = {
//   color: 'black',
//   fontFamily: 'Lucida Sans',
//   fontWeight: 'bold',
//   fontSize: '16px',
// };
//
// const resultLabelStyles = {
//   color: green[500],
//   fontFamily: 'Lucida Sans',
//   fontSize: '16px',
// };
//
// const Label = ({ text }) => (
//   <ListItemText
//     primaryTypographyProps={{ style: labelStyles }}
//     primary={text}
//   />
// );
//
// const ResultLabel = ({ text }) => (
//   <ListItemSecondaryAction>
//     <ListItemText
//       primaryTypographyProps={{ style: resultLabelStyles }}
//       primary={text}
//     />
//   </ListItemSecondaryAction>
// );
//
// export const ProcessedImage = ({ imagePath }) => {
//   return (
//     <Card sx={{ margin: '20px auto', maxWidth: 600 }}>
//       <CardContent>
//         <Box sx={{ textAlign: 'center', mt: 2 }}>
//           {imagePath ? (
//             <img
//               src={imagePath}
//               alt="Processed Preview"
//               style={{ width: 'auto', height: 'auto', maxWidth: 180 }}
//             />
//           ) : (
//             <Typography variant="body1" color="textSecondary">
//               No image selected
//             </Typography>
//           )}
//         </Box>
//         <List sx={{ mt: 2 }}>
//
//           <ListItem>
//             <Label text="Area" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="Hair Count" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="Hair Density [ 1/cm2 ]" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="Ratio of Vellus Hairs" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="Ratio of Terminal Hairs" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="Density of Vellus Hairs [ 1/cm2 ]" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="Density of Terminal Hairs [ 1/cm2 ]" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="Median Hair Thickness" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="Mean Hair Thickness" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="Yellow Spot Detected" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="Red Spot Detected" />
//             <ResultLabel text="-" />
//           </ListItem>
//           <ListItem>
//             <Label text="White Spot Detected" />
//             <ResultLabel text="-" />
//           </ListItem>
//         </List>
//       </CardContent>
//     </Card>
//   );
// };
