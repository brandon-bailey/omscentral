import React from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { reviewMeta } from 'src/constants';
import { ReviewQuery, ReviewInputType, Course, Semester } from 'src/graphql';
import Button from '../Button';
import Paper from '../Paper';
import Typeahead from '../Typeahead';
import White from '../White';
import { useStyles } from './ReviewForm.styles';

interface Props {
  data: {
    courses: Course[];
    semesters: Semester[];
  };
  mode: 'make' | 'edit' | 'view';
  review?: ReviewQuery['review'];
  disabled?: boolean;
  onSubmit: (review: ReviewInputType) => void;
  onDelete: () => void;
}

const ReviewForm: React.FC<Props> = ({
  data,
  mode,
  review,
  disabled,
  onSubmit,
  onDelete,
}) => {
  const classes = useStyles();

  const toString = (value: any): string => (value || '').toString();
  const { handleSubmit, register, errors, watch, setValue } = useForm<
    ReviewInputType
  >({
    defaultValues: {
      id: review?.id,
      course_id: review?.course_id || '',
      semester_id: review?.semester_id || '',
      difficulty: review?.difficulty || undefined,
      workload: review?.workload || undefined,
      rating: review?.rating || undefined,
      body: toString(review?.body),
    },
  });

  const { course_id } = watch();

  const [title, action] =
    mode === 'make'
      ? ['Create Review', 'Create']
      : mode === 'edit'
      ? ['Update Review', 'Update']
      : ['Review', null];

  const toNumber = (value: any): number => Number(value);
  const handleSubmitInternal = handleSubmit((form) =>
    onSubmit({
      ...form,
      id: form.id || '*',
      difficulty: toNumber(form.difficulty),
      workload: toNumber(form.workload),
      rating: toNumber(form.rating),
    }),
  );

  if (!data?.courses?.length || !data?.semesters?.length) {
    return null;
  }

  return (
    <Container component="main" maxWidth="sm">
      <White />
      <Paper>
        <Avatar className={classes.avatar}>
          <EditOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmitInternal}>
          <Grid container spacing={2}>
            {mode !== 'make' && (
              <Grid item xs={12}>
                <TextField
                  id="id"
                  name="id"
                  label="ID"
                  autoComplete="id"
                  variant="outlined"
                  fullWidth
                  disabled
                  inputRef={register}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Typeahead
                id="course_id"
                name="course_id"
                label="Course"
                noOptionsText="No matching courses..."
                disabled={disabled || mode === 'view'}
                options={data.courses}
                getOptionLabel={({ id, name }: Course) => `${id} ${name}`}
                value={course_id}
                onChange={(e, c?: Course) => setValue('course_id', c?.id || '')}
                renderOption={({ id, name }: Course) => (
                  <Typography noWrap>
                    {id} {name}
                  </Typography>
                )}
                required
                inputRef={register({ required: true })}
                error={Boolean(errors.course_id)}
                helperText={errors.course_id?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                id="semester_id"
                name="semester_id"
                label="Semester"
                autoComplete="semester_id"
                variant="outlined"
                fullWidth
                required
                disabled={disabled || mode === 'view'}
                inputRef={register({ required: true })}
                error={Boolean(errors.semester_id)}
                helperText={errors.semester_id?.message}
                SelectProps={{ native: true }}
              >
                {data.semesters.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                id="difficulty"
                name="difficulty"
                label="Difficulty"
                autoComplete="difficulty"
                variant="outlined"
                fullWidth
                required
                disabled={disabled || mode === 'view'}
                inputRef={register({ required: true })}
                error={Boolean(errors.difficulty)}
                helperText={errors.difficulty?.message}
                SelectProps={{ native: true }}
              >
                {reviewMeta.difficulty.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="workload"
                name="workload"
                label="Workload (hours/week)"
                autoComplete="workload"
                variant="outlined"
                type="number"
                fullWidth
                required
                disabled={disabled || mode === 'view'}
                inputRef={register({
                  required: true,
                  min: {
                    value: 1,
                    message: 'Workload must be at least 1 hour per week.',
                  },
                  max: {
                    value: 100,
                    message:
                      'Workload may not be more than 100 hours per week.',
                  },
                })}
                error={Boolean(errors.workload)}
                helperText={errors.workload?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                id="rating"
                name="rating"
                label="Rating"
                autoComplete="rating"
                variant="outlined"
                fullWidth
                required
                disabled={disabled || mode === 'view'}
                inputRef={register({ required: true })}
                error={Boolean(errors.rating)}
                helperText={errors.rating?.message}
                SelectProps={{ native: true }}
              >
                {reviewMeta.rating.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="body"
                name="body"
                label="Body (markdown)"
                autoComplete="body"
                variant="outlined"
                multiline
                fullWidth
                required
                disabled={disabled || mode === 'view'}
                inputRef={register({ required: true })}
                error={Boolean(errors.body)}
                helperText={errors.body?.message}
              />
            </Grid>
          </Grid>
          {mode !== 'view' && (
            <Button type="submit" size="large" fullWidth disabled={disabled}>
              {action}
            </Button>
          )}
          {mode === 'edit' && (
            <Button
              type="button"
              size="large"
              color="secondary"
              fullWidth
              disabled={disabled}
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default ReviewForm;
