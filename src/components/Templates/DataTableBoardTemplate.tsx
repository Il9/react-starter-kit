import { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import produce from 'immer';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import { TypeUtil, ArrayUtil } from '@util';
import Grid from '@components/Atoms/Grid';
import Paper from '@components/Atoms/Paper';
import Button from '@components/Atoms/Button';
import Icon, { ICON_TYPE } from '@components/Atoms/Icon';
import ListSearchForm, { ListSearchFormProps, FormData } from '@components/Organisms/ListSearchForm';
import DataTable, { DataTableProps, Column, Row } from '@components/Organisms/DataTable';

type Action = {
  iconType: ICON_TYPE;
  label: string;
};

type ApiPayload<D> = {
  start: number;
  length: number;
  orderBy: string;
} & FormData<D>;

type ApiResponse<R = Row> = {
  rows: R[];
  totalRowCount: number;
};

const SEARCH_AREA_WIDTH = 260;

const useStyles = makeStyles(() =>
  createStyles({
    searchForm: {
      minWidth: SEARCH_AREA_WIDTH,
      flexBasis: SEARCH_AREA_WIDTH
    },
    dataTable: {
      maxWidth: `calc(100% - ${SEARCH_AREA_WIDTH}px)`,
      flexBasis: `calc(100% - ${SEARCH_AREA_WIDTH}px)`
    },
    toolbar: {
      // backgroundColor: theme.palette.primary.main
    }
  })
);

// Props Type
export type DataTableBoardTemplateProps<D, R> = {
  actions: Action[];
  api: TypeUtil.PromiseCreator<ApiPayload<D>, ApiResponse<R>>;
  form: Omit<ListSearchFormProps<D>, 'onSubmit' | 'onReset'>;
  columns: Column<R>[];
};

// Component
export default function DataTableBoardTemplate({
  api,
  form,
  columns,
  ...props
}: DataTableBoardTemplateProps<any, any>) {
  const [dataTableState, setDataTableState] = useState<DataTableProps>({
    columns,
    rows: [],
    totalRowCount: 0,
    page: 0,
    rowsPerPage: 100,
    height: 800,
    loading: true
  });

  const classes = useStyles();
  const methods = useForm<FormData>();

  useEffect(() => {
    if (!dataTableState.loading) {
      return;
    }

    const rowSortedColumn = dataTableState.columns.find(({ rowSort }) => typeof rowSort === 'string');

    api({
      start: dataTableState.page * dataTableState.rowsPerPage,
      length: dataTableState.rowsPerPage,
      orderBy: ArrayUtil.compactJoin([rowSortedColumn?.id, rowSortedColumn?.rowSort], ' '),
      ...methods.getValues()
    }).then(({ rows, totalRowCount }) => {
      setDataTableState(
        produce(dataTableState, draft => {
          draft.rows = rows;
          draft.totalRowCount = totalRowCount;
          draft.loading = false;
        })
      );
    });
  }, [dataTableState.loading]);

  const handleFormSubmit: ListSearchFormProps['onSubmit'] = useCallback(
    event => {
      event.preventDefault();

      setDataTableState(
        produce(dataTableState, draft => {
          draft.loading = true;
        })
      );
    },
    [dataTableState]
  );

  const handleFormReset: ListSearchFormProps['onReset'] = useCallback(() => {
    setDataTableState(
      produce(dataTableState, draft => {
        draft.loading = true;
      })
    );
  }, [dataTableState]);

  const handleColumnResize: Required<DataTableProps>['onColumnResize'] = useCallback(
    ({ index, width }) => {
      setDataTableState(
        produce(dataTableState, draft => {
          draft.columns[index].width = width;
        })
      );
    },
    [dataTableState]
  );

  const handleColumnSort: Required<DataTableProps>['onColumnSort'] = useCallback(
    ({ oldIndex, newIndex }) => {
      setDataTableState(
        produce(dataTableState, draft => {
          draft.columns = ArrayUtil.move(dataTableState.columns, oldIndex, newIndex);
        })
      );
    },
    [dataTableState]
  );

  const handleRowSort: Required<DataTableProps>['onRowSort'] = useCallback(
    ({ by, direction }) => {
      setDataTableState(
        produce(dataTableState, draft => {
          draft.columns = dataTableState.columns.map(column => ({
            ...column,
            rowSort: column.id === by ? direction : column.rowSort !== false
          }));
          draft.loading = true;
        })
      );
    },
    [dataTableState]
  );

  const handlePageChange: Required<DataTableProps>['onPageChange'] = useCallback(
    page => {
      setDataTableState(
        produce(dataTableState, draft => {
          draft.page = page;
          draft.loading = true;
        })
      );
    },
    [dataTableState]
  );

  const handleRowsPerPageChange: Required<DataTableProps>['onRowsPerPageChange'] = useCallback(
    rowsPerPage => {
      setDataTableState(
        produce(dataTableState, draft => {
          draft.page = 0;
          draft.rowsPerPage = rowsPerPage;
          draft.loading = true;
        })
      );
    },
    [dataTableState]
  );

  return (
    <Grid container spacing={3}>
      <Grid item className={classes.searchForm}>
        <Grid container direction="column" spacing={2}>
          <Grid container item spacing={1}>
            {props.actions.map(({ iconType, label }) => (
              <Grid item xs key={label}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  classes={{ label: 'flex flex-col' }}
                  style={{ padding: 5 }}
                >
                  <Icon type={iconType} fontSize="small" className="mb-1" />
                  {label}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid item>
            <Paper className="p-2">
              <FormProvider {...methods}>
                <ListSearchForm {...form} onSubmit={handleFormSubmit} onReset={handleFormReset} />
              </FormProvider>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.dataTable}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Paper>
              <Toolbar variant="dense" className={classes.toolbar}>
                Tool Bar
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item>
            <DataTable
              {...dataTableState}
              onColumnResize={handleColumnResize}
              onColumnSort={handleColumnSort}
              onRowSort={handleRowSort}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

// Initial Props
DataTableBoardTemplate.defaultProps = {};
