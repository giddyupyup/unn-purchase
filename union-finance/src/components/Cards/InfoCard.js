import React from 'react';
import { makeStyles, Card, CardMedia, CardContent } from '@material-ui/core';

const useStyles = makeStyles({
  media: {
    height: 350,
  },
});

export default ({ image, content, ...props }) => {
  const { media } = useStyles();
  return (
    <Card>
      <CardMedia className={media} image={image}></CardMedia>
      <CardContent>{content}</CardContent>
    </Card>
  );
};
