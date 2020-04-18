import React, { useEffect, useState } from 'react';
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
import { AutoComplete } from 'antd';
import ItemService from '../../services/item';

const ItemAdd = () => {
  const [codes, setCodes] = useState<{ value: string }[]>([]);
  const [categories, setCategories] = useState<{ value: string }[]>([]);
  const [formDisabled, setFormDisable] = useState(true);
  const [item, setItem] = useState();

  const onItemSearch = (searchText: string) => {
    console.log('sear', searchText);
    ItemService.getPartNumbers(searchText)
      .then((val: any) => {
        const updated = val.map(v => {
          return { value: v.code };
        });
        console.log('updae', updated);
        setCodes(updated);
      })
      .catch((e: any) => {
        console.log('error', e);
      });
  };
  const onCategorySearch = (searchText: string) => {
    console.log('sear', searchText);
    ItemService.getCategories(searchText)
      .then((val: any) => {
        const updated = val.map(v => {
          return { value: v.name };
        });
        console.log('updae', updated);
        setCategories(updated);
      })
      .catch((e: any) => {
        console.log('error', e);
      });
  };

  const onCodeSelect = (itemCode: string) => {
    setFormDisable(false);
  };
  const onCategorySelect = (itemCode: string) => {
    setFormDisable(false);
  };

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
              <AutoComplete
                options={codes}
                style={{ width: '40vw' }}
                onSelect={onCodeSelect}
                onSearch={onItemSearch}
                placeholder="Part number"
              />
            </Box>
            <Box p={2} style={{ width: '40%' }}>
              <AutoComplete
                options={categories}
                style={{ width: '40vw' }}
                onSelect={onCategorySelect}
                onSearch={onCategorySearch}
                placeholder="Category"
                disabled={formDisabled}
              />
            </Box>
            <Box p={2}>
              <TextField
                id="standard-basic"
                label="Vehicle"
                fullWidth
                disabled={formDisabled}
              />
            </Box>{' '}
            <Box p={2}>
              <TextField
                id="standard-basic"
                label="Brand"
                fullWidth
                disabled={formDisabled}
              />
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
              <Select
                label="Unit Type"
                value="Pcs"
                fullWidth
                disabled={formDisabled}
              >
                <MenuItem value="Pcs">Pcs</MenuItem>
                <MenuItem value="Set">Set</MenuItem>
                <MenuItem value="Feet">Feet</MenuItem>
                <MenuItem value="Meeter">Meeter</MenuItem>
              </Select>
            </Box>
            <Box p={2} style={{ width: '50%' }}>
              <TextField
                id="standard-basic"
                label="Location"
                fullWidth
                disabled={formDisabled}
              />
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
