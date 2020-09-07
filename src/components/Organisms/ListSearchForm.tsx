import { useMemo, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { TypeUtil, DateUtil } from '@util';
import Grid from '@components/Atoms/Grid';
import Form from '@components/Atoms/Form';
import Button from '@components/Atoms/Button';
import Typography from '@components/Atoms/Typography';
import FormControl, { SelectTypeProps } from '@components/Molecules/FormControl';

type AdditionalFormData = {};

type DetailOptionsData<D = AdditionalFormData> = {
  name: keyof D;
  options: SelectTypeProps['options'];

  onChange?: TypeUtil.Handler<FormData<D>>;
};

export type FormData<D = AdditionalFormData> = {
  keywordKey: string;
  keywordMatchType: 'partial' | 'match';
  keyword: string;
  dateKey: string;
  dates: [string, string];
  multiKeywordKey: string;
  multiKeyword: string;
} & D;

const useStyles = makeStyles(theme =>
  createStyles({
    input: {
      '& .MuiInputBase-root, &.MuiButtonBase-root': {
        boxShadow: theme.shadows[2]
      },
      '& fieldset': {
        transitionDuration: theme.transitions.duration.shorter
      }
    },
    multiline: {
      '& textarea': {
        height: '80px !important'
      }
    }
  })
);

// Props Type
export type ListSearchFormProps<D = AdditionalFormData> = {
  keywordOptions: SelectTypeProps['options'];
  dateOptions: SelectTypeProps['options'];
  multiKeywordOptions: SelectTypeProps['options'];
  detailOptionsDatas: DetailOptionsData<D>[];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onReset: TypeUtil.Handler;
};

// Component
export default function ListSearchForm({
  keywordOptions,
  dateOptions,
  multiKeywordOptions,
  detailOptionsDatas,
  onReset,
  ...props
}: ListSearchFormProps) {
  const classes = useStyles();
  const methods = useFormContext<FormData>();

  const dateRangeUnitDatas = useMemo(
    () =>
      [
        {
          label: 'T',
          amount: 0,
          unit: 'day'
        },
        {
          label: '1W',
          amount: -1,
          unit: 'week'
        },
        {
          label: '1M',
          amount: -1,
          unit: 'month'
        },
        {
          label: '3M',
          amount: -3,
          unit: 'month'
        },
        {
          label: '6M',
          amount: -6,
          unit: 'month'
        },
        {
          label: 'All',
          amount: -20,
          unit: 'year'
        }
      ] as const,
    []
  );

  const formDefaultValues: FormData = useMemo(
    () => ({
      keywordKey: keywordOptions[0].value.toString(),
      keywordMatchType: 'partial',
      keyword: '',
      dateKey: dateOptions[0].value.toString(),
      dates: [DateUtil.getDateFromToday(-1, 'month'), DateUtil.getToday()],
      multiKeywordKey: multiKeywordOptions[0].value.toString(),
      multiKeyword: ''
    }),
    []
  );

  const handleResetClick = useCallback(() => {
    methods.reset({
      ...formDefaultValues,
      ...detailOptionsDatas.reduce((acc, cur) => ({ ...acc, [cur.name]: '' }), {})
    });

    onReset();
  }, []);

  return (
    <Form onSubmit={props.onSubmit}>
      <Grid container direction="column" spacing={4}>
        <Grid container item direction="column" spacing={1}>
          <Grid item>
            <FormControl
              fullWidth
              formType="text"
              type="text"
              id="keyword"
              name="keyword"
              placeholder="Keyword"
              variant="outlined"
              margin="dense"
              className={classes.input}
            />
          </Grid>
          <Grid container item spacing={1}>
            <Grid item xs={7}>
              <FormControl
                fullWidth
                formType="select"
                id="keywordKey"
                name="keywordKey"
                variant="outlined"
                margin="densest"
                className={classes.input}
                value={formDefaultValues.keywordKey}
                options={keywordOptions}
              />
            </Grid>
            <Grid item xs={5}>
              <FormControl
                fullWidth
                formType="select"
                id="keywordMatchType"
                name="keywordMatchType"
                variant="outlined"
                margin="densest"
                className={classes.input}
                value={formDefaultValues.keywordMatchType}
                options={[
                  { key: 'Partial', value: 'partial' },
                  { key: 'Match', value: 'match' }
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item spacing={1}>
          <Grid item xs={7}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button fullWidth variant="contained" color="default" onClick={handleResetClick}>
              Reset
            </Button>
          </Grid>
        </Grid>
        <Grid container item direction="column" spacing={2}>
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              Date
            </Typography>
          </Grid>
          <Grid container item direction="column" spacing={1}>
            <Grid item>
              <FormControl
                fullWidth
                formType="select"
                id="dateKey"
                name="dateKey"
                variant="outlined"
                margin="densest"
                className={classes.input}
                value={formDefaultValues.dateKey}
                options={dateOptions}
              />
            </Grid>
            <Grid container item>
              <FormControl
                fullWidth
                range
                delimiter="~"
                formType="date"
                id="dates"
                name="dates"
                variant="outlined"
                margin="densest"
                value={formDefaultValues.dates}
                className={classes.input}
              />
            </Grid>
            <Grid container item spacing={1}>
              {dateRangeUnitDatas.map(({ label, amount, unit }) => (
                <Grid item xs={2} key={label}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    style={{ minWidth: 'auto', padding: '3px 0' }}
                    className={classes.input}
                    onClick={() => {
                      methods.setValue('dates', [DateUtil.getDateFromToday(amount, unit), DateUtil.getToday()]);
                    }}
                  >
                    {label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container item direction="column" spacing={2}>
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              Detail
            </Typography>
          </Grid>
          <Grid container item direction="column" spacing={1}>
            {detailOptionsDatas.map(detailOptionsData => (
              <Grid item key={detailOptionsData.name}>
                <FormControl
                  fullWidth
                  formType="select"
                  variant="outlined"
                  margin="densest"
                  className={classes.input}
                  id={detailOptionsData.name}
                  name={detailOptionsData.name}
                  options={detailOptionsData.options}
                  onChange={({ target }) => {
                    if (detailOptionsData.onChange && target.name) {
                      detailOptionsData.onChange({
                        ...methods.getValues(),
                        [target.name]: target.value as React.ReactText
                      });
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container item direction="column" spacing={2}>
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              Multi
            </Typography>
          </Grid>
          <Grid container item direction="column" spacing={1}>
            <Grid item>
              <FormControl
                fullWidth
                formType="select"
                id="multiKeywordKey"
                name="multiKeywordKey"
                variant="outlined"
                margin="densest"
                className={classes.input}
                value={formDefaultValues.multiKeywordKey}
                options={multiKeywordOptions}
              />
            </Grid>
            <Grid item>
              <FormControl
                fullWidth
                multiline
                formType="text"
                type="text"
                id="multiKeyword"
                name="multiKeyword"
                variant="outlined"
                margin="dense"
                className={`${classes.input} ${classes.multiline}`}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
}

// Initial Props
ListSearchForm.defaultProps = {};
