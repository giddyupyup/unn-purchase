import React, { useState } from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  InputLabel,
  Input,
  Box,
} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 6,
  },
  griditem: {
    padding: 20,
    margin: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cloudIcon: {
    width: '1.5em',
    height: '1.5em',
  },
  divContainer: {
    display: 'flex',
  },
  browse: {
    color: '#3D5BF2',
    lineHeight: 1.5,
    marginLeft: 4,
    display: 'flex',
    cursor: 'pointer',
    fontWeight: 500,
  },
  dropTitle: {
    display: 'flex',
    fontWeight: 500,
  },
  dragOver: {
    backgroundColor: 'rgb(126, 108, 255, 0.5)',
    borderColor: theme.palette.primary.main,
  },
}));

export default ({ item, ...props }) => {
  const {
    container,
    griditem,
    cloudIcon,
    divContainer,
    browse,
    dropTitle,
    dragOver,
  } = useStyles();

  const [draggable, setDraggable] = useState('');

  const onInputChange = (e) => {
    console.log(e.target.files);
  };

  const onDragOverEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggable(dragOver);
  };

  const onDragLeaveEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggable('');
  };

  const onDragDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggable('');

    const files = e.dataTransfer.files || e.target.files;

    console.log(files);
  };

  return (
    <Grid
      container
      className={container}
      onDragEnter={onDragOverEnter}
      onDragOver={onDragOverEnter}
      onDragLeave={onDragLeaveEnd}
      onDragEnd={onDragLeaveEnd}
      onDrop={onDragDrop}
    >
      <Box
        borderRadius={6}
        width="100%"
        border="2px solid #FFF"
        className={draggable}
      >
        <Grid item xs={12} className={griditem}>
          <div className={divContainer}>
            <CloudUpload className={cloudIcon} />
          </div>
          <div className={divContainer}>
            <Typography component="div" variant="body1" className={dropTitle}>
              Drag and drop here or
            </Typography>
            <InputLabel htmlFor={item} className={browse}>
              Browse
            </InputLabel>
            <Input
              type="file"
              id={item}
              style={{ display: 'none' }}
              inputProps={{ accept: 'image/png, image/jpeg' }}
              onChange={onInputChange}
            />
          </div>
          <div className={divContainer}>
            <Typography
              component="div"
              variant="body1"
              style={{ color: '#999' }}
            >
              Supported files: jpg and png
            </Typography>
          </div>
        </Grid>
      </Box>
    </Grid>
  );
};
