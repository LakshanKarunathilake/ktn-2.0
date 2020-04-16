import React, { useEffect } from 'react';
import {
  Card,
  TextField,
  CardHeader,
  CardContent,
  Box,
  Select,
  MenuItem,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';

import ItemService from '../../services/item';

const ItemAdd = () => {
  useEffect(() => {
    ItemService.getCategories().then(value => {
      value.forEach(v => {
        console.log('name', v.name);
      });
    });
  });
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Card
          variant="outlined"
          style={{
            margin: '15px',
            width: '70%'
          }}
        >
          <CardHeader
            title="New Item"
            subheader="Add new item to inventory or edit exisiting item"
          />
          <CardContent>
            <Box p={2} style={{ width: '80%' }}>
              <TextField id="standard-basic" label="Part Number" fullWidth />
            </Box>
            <Box p={2} style={{ width: '40%' }}>
              <TextField id="standard-basic" label="Category" fullWidth />
            </Box>
            <Box p={2}>
              <TextField id="standard-basic" label="Vehicle" fullWidth />
            </Box>

            <Box p={2}>
              <TextField
                id="standard-basic"
                fullWidth
                variant="outlined"
                disabled
                value={'Description value will be auto generated'}
              />
            </Box>
            <Box p={2} style={{ width: '50%' }}>
              <Select label="Unit Type" value="Pcs" fullWidth>
                <MenuItem value="Pcs">Pcs</MenuItem>
                <MenuItem value="Set">Set</MenuItem>
                <MenuItem value="Feet">Feet</MenuItem>
                <MenuItem value="Meeter">Meeter</MenuItem>
              </Select>
            </Box>
            <Box p={2} style={{ width: '50%' }}>
              <TextField id="standard-basic" label="Location" fullWidth />
            </Box>
            <Box p={2}>
              <Typography>
                Please not that by default quantity will be 0, selling price
                will be 0.00 and cost will be 0.00
              </Typography>
            </Box>
          </CardContent>
          <CardActions style={{ float: 'right' }}>
            <Button color="primary" variant="contained">
              Save
            </Button>
            <Button color="secondary" variant="contained">
              Cancel
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" style={{ margin: '15px', width: '30%' }}>
          <CardHeader
            title="History of Additions"
            subheader="Click to revert the item addition"
          />
        </Card>
      </div>
      <Card variant="outlined" style={{ margin: '15px', height: '30%' }}></Card>
    </>
  );
};

export default ItemAdd;
