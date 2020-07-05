import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { Course } from 'src/graphql';
import round from 'src/utils/round';
import { useStyles } from './Metrics.styles';

interface Props {
  course: Course;
}

const Metrics: React.FC<Props> = ({ course: { metric } }) => {
  const classes = useStyles();

  if (!metric) {
    return null;
  }

  const data: { label: string; title: string; value: number }[] = [
    {
      label: 'Reviews',
      value: metric.reviews.count,
      title: 'Number of reviews',
    },
    {
      label: 'Avg. Difficulty',
      value: metric.reviews.difficulty.mean,
      title: '1-Very Easy, 5-Very Hard',
    },
    {
      label: 'Avg. Workload',
      value: metric.reviews.workload.mean,
      title: 'Hours per week',
    },
    {
      label: 'Avg. Rating',
      value: metric.reviews.rating.mean,
      title: '1-Strongly Disliked, 5-Strongly Liked',
    },
  ];

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container>
          {data.map(({ label, value, title }) => (
            <Grid item xs={12} md={3} key={label} className={classes.metric}>
              <Tooltip title={title} placement="top">
                <div>
                  <Typography variant="body2" color="textSecondary">
                    {label}
                  </Typography>
                  <Typography variant="subtitle2">{round(value, 2)}</Typography>
                </div>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Metrics;
