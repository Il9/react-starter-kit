import { cloneElement, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { List } from 'react-virtualized';
import { SortableContainer, SortableElement, SortableHandle, SortEndHandler } from 'react-sortable-hoc';
import { Resizable } from 'react-resizable';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination, { TablePaginationProps } from '@material-ui/core/TablePagination';

import { CommonUtil, ArrayUtil, TypeUtil } from '@util';
import { useWindowSize } from '@hooks';
import Paper from '@components/Atoms/Paper';
import Box from '@components/Atoms/Box';
import Checkbox from '@components/Atoms/Checkbox';
import Typography from '@components/Atoms/Typography';
import Icon from '@components/Atoms/Icon';
import Skeleton from '@components/Atoms/Skeleton';

export type ROW_SORT_DIRECTION = 'asc' | 'desc';

export type Column<R = Row> = {
  id: string;
  label: string;
  width: number;

  align?: 'left' | 'center' | 'right';
  visible?: boolean;
  fix?: boolean;
  sort?: boolean;
  resize?: boolean;
  rowSort?: boolean | ROW_SORT_DIRECTION;
  render?: (row: R) => React.ReactNode;
};

export type Row = Record<string, React.ReactNode>;

export type RowSort<R = Row> = {
  by?: keyof R;
  direction?: ROW_SORT_DIRECTION;
};

const HEAD_CELL_HEIGHT = 45;
const BODY_CELL_HEIGHT = 35;
const CHECKBOX_CELL_WIDTH = 45;
const SKELETON_WIDTH_PERCENTS = [10, 5, 10, 10, 15, 15, 5, 10, 5, 15];

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      overflow: 'hidden'
    },

    table: {
      tableLayout: 'fixed',
      height: '100%'
    },

    body: {
      '& > .ReactVirtualized__Grid': {
        height: 'auto !important',
        overflow: 'initial !important'
      },
      '& > .ReactVirtualized__Grid > .ReactVirtualized__Grid__innerScrollContainer': {
        overflow: 'initial !important'
      }
    },

    row: {
      '&:hover > .fix-cell:not(.fix-head-cell)': {
        backgroundColor: `${theme.palette.type === 'light' ? '#F5F5F5' : '#515151'}`
      },
      '&.Mui-selected > .fix-cell:not(.fix-head-cell)': {
        backgroundColor: `${theme.palette.type === 'light' ? '#F0F2FF' : '#414660'}`
      },
      '& > .fix-cell': {
        position: 'sticky',
        zIndex: 10,
        backgroundColor: theme.palette.background.paper
      },
      '& > .fix-cell-shadow': {
        display: 'inline',
        position: 'sticky',
        verticalAlign: 'top'
      },
      '& > .fix-head-cell': {
        zIndex: '40 !important'
      },
      '& > .fix-head-cell-shadow::after, & > .fix-cell-shadow::after': {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: '-1px',
        width: 30,
        height: '100%',
        transform: 'translateX(100%)',
        content: '""',
        pointerEvents: 'none',
        boxShadow: 'inset 15px 0 12px -8px rgba(0, 0, 0, 0.2)'
      },
      '& > .fix-cell-shadow::after': {
        height: BODY_CELL_HEIGHT
      }
    },
    headRow: {
      display: 'block',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: theme.palette.primary.main
    },

    headCell: {
      'height': HEAD_CELL_HEIGHT,
      'lineHeight': `${HEAD_CELL_HEIGHT}px`,
      'padding': '0 20px',
      'borderRight': '1px solid rgba(255, 255, 255, .12)',
      'borderBottom': '0 !important',
      'position': 'relative',
      'left': 'auto',
      'display': 'inline-block',
      'color': theme.palette.common.white,
      'backgroundColor': `${theme.palette.primary.main} !important`,
      '&:last-child': {
        overflow: 'hidden',
        border: 'none'
      },
      '& > div': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      '& > div > span': {
        verticalAlign: 'top',
        color: `${theme.palette.common.white} !important`
      },
      '& > div > svg': {
        cursor: 'grab'
      },
      '& .MuiTableSortLabel-icon': {
        position: 'absolute',
        right: '-20px',
        margin: 0,
        color: `${theme.palette.common.white} !important`
      }
    },
    bodyCell: {
      'display': 'inline-block',
      'cursor': 'pointer',
      'padding': `0 ${theme.spacing(2)}px`,
      'height': BODY_CELL_HEIGHT,
      'lineHeight': `${BODY_CELL_HEIGHT}px`,
      'borderRight': `1px solid ${theme.palette.divider}`,
      'whiteSpace': 'nowrap',
      'overflow': 'hidden',
      'textOverflow': 'ellipsis',
      '&:last-child': {
        borderRight: 'none'
      }
    },
    checkboxCell: {
      'width': `${CHECKBOX_CELL_WIDTH}px !important`,
      'padding': `0 ${theme.spacing(2)}px !important`,
      'borderBottom': `1px solid ${theme.palette.divider}`,
      'borderLeft': 0,
      'left': 0,
      '&.fix-head-cell > span': {
        color: theme.palette.common.white
      },
      '& > span': {
        verticalAlign: 'middle'
      }
    },
    sortableCell: {
      boxShadow: theme.shadows[5]
    },

    pagination: {
      borderTop: `1px solid ${theme.palette.divider}`
    },

    nothing: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'sticky',
      left: '0',
      fontSize: '1rem',
      opacity: 0.8
    }
  })
);

const CheckboxCell: React.SFC<{
  checked?: boolean;
  className?: string;
  indeterminate?: boolean;
  onChange?: React.ChangeEventHandler;
}> = ({ checked, indeterminate, onChange, className }) => (
  <TableCell component="div" padding="checkbox" align="center" className={className}>
    <Checkbox checked={checked} indeterminate={indeterminate} onChange={onChange} />
  </TableCell>
);

const ColumnSortableCellWrapper = SortableElement(({ children, ...props }: { children: React.ReactElement }) =>
  cloneElement(children, props)
);
const ColumnSortableDragHandle = SortableHandle(() => (
  <Icon
    type="DragIndicator"
    style={{
      fontSize: '0.9rem',
      position: 'absolute',
      top: `calc((${HEAD_CELL_HEIGHT}px - 16px) / 2)`,
      left: 3
    }}
  />
));
const ColumnResizableDragHandle = (
  <Box
    style={{
      position: 'absolute',
      width: 10,
      height: '100%',
      bottom: 0,
      right: -6,
      cursor: 'col-resize'
    }}
  />
);
const HeadCell: React.SFC<{
  column: Column;
  index: number;
  position: number;

  shadow?: boolean;
  rowSortActive?: boolean;
  rowSortDirection?: ROW_SORT_DIRECTION;
  onColumnResize?: TypeUtil.Handler<{ index: number; width: number }>;
  onRowSort?: React.MouseEventHandler;
}> = ({ column, index, position, shadow, rowSortActive, rowSortDirection, onColumnResize, onRowSort }) => {
  const classes = useStyles();

  const isFix = useMemo(() => !!column.fix, [column.fix]);
  const isSort = useMemo(() => !isFix && column.sort !== false, [isFix, column.sort]);
  const isResize = useMemo(() => !isFix && column.resize !== false, [isFix, column.resize]);
  const isRowSort = useMemo(() => column.rowSort !== false, [column.rowSort]);

  const cellClasses = useMemo(() => [isFix && 'fix-cell fix-head-cell border-r-0', shadow && 'fix-head-cell-shadow'], [
    isFix,
    shadow
  ]);
  const cellPosition = useMemo(() => (isFix ? position : undefined), [isFix, position]);

  const withSort = useCallback(
    (cell: React.ReactElement) =>
      !isFix ? <ColumnSortableCellWrapper index={index}>{cell}</ColumnSortableCellWrapper> : cell,
    [isFix, index]
  );

  return withSort(
    <Resizable
      width={column.width}
      height={50}
      handle={isResize ? ColumnResizableDragHandle : undefined}
      axis="x"
      onResize={(e, { size }) =>
        onColumnResize &&
        onColumnResize({
          index,
          width: size.width
        })
      }
      draggableOpts={{ enableUserSelectHack: false }}
      key={column.id}
    >
      <TableCell
        component="div"
        align="center"
        className={ArrayUtil.compactJoin([...cellClasses, classes.headCell], ' ')}
        style={{ width: column.width, left: cellPosition, zIndex: 30 - index }}
      >
        <Box>
          {isSort && <ColumnSortableDragHandle />}
          {!isRowSort ? (
            column.label
          ) : (
            <TableSortLabel active={rowSortActive} direction={rowSortDirection} onClick={onRowSort}>
              {column.label}
            </TableSortLabel>
          )}
        </Box>
      </TableCell>
    </Resizable>
  );
};

const HeadRow = SortableContainer(
  ({
    columns,
    rowSort,
    rowCount,
    selectedRowCount,
    shadowColumnId,
    onColumnResize,
    onRowSort,
    onSelectAllChange
  }: {
    columns: Column[];
    rowSort: RowSort;
    rowCount: number;
    selectedRowCount: number;

    shadowColumnId?: string;
    onColumnResize?: TypeUtil.Handler<{ index: number; width: number }>;
    onRowSort?: TypeUtil.Handler<Column>;
    onSelectAllChange?: React.ChangeEventHandler;
  }) => {
    const classes = useStyles();

    const fullVisibleWidth = useMemo(() => columns.reduce((acc, cur) => acc + cur.width, CHECKBOX_CELL_WIDTH), [
      columns
    ]);

    const isAllSelected = useMemo(() => rowCount > 0 && rowCount === selectedRowCount, [rowCount, selectedRowCount]);
    const isSomeSelected = useMemo(() => selectedRowCount > 0 && rowCount > selectedRowCount, [
      rowCount,
      selectedRowCount
    ]);

    const isShadow = useCallback(({ id }: Column) => id === shadowColumnId, [shadowColumnId]);
    const isRowSortActive = useCallback(({ id }: Column) => id === rowSort.by, [rowSort]);
    const rowSortDirection = useCallback((column: Column) => (isRowSortActive(column) ? rowSort.direction : 'asc'), [
      isRowSortActive,
      rowSort.direction
    ]);
    const createRowSortHandler: TypeUtil.HandlerCreator<Column> = useCallback(
      column => () => onRowSort && onRowSort(column),
      [onRowSort]
    );

    return (
      <TableRow
        component="div"
        className={[classes.row, classes.headRow].join(' ')}
        style={{ width: fullVisibleWidth }}
      >
        <CheckboxCell
          checked={isAllSelected}
          indeterminate={isSomeSelected}
          onChange={onSelectAllChange}
          className={ArrayUtil.compactJoin(
            [
              'fix-cell',
              'fix-head-cell',
              !shadowColumnId && 'fix-head-cell-shadow',
              classes.headCell,
              classes.checkboxCell
            ],
            ' '
          )}
        />
        {
          columns.reduce<{ position: number; cells: React.ReactElement[] }>(
            ({ position, cells }, column, index) => ({
              position: position + column.width,
              cells: cells.concat(
                <HeadCell
                  column={column}
                  index={index}
                  position={position}
                  shadow={isShadow(column)}
                  rowSortActive={isRowSortActive(column)}
                  rowSortDirection={rowSortDirection(column)}
                  onColumnResize={onColumnResize}
                  onRowSort={createRowSortHandler(column)}
                  key={column.id}
                />
              )
            }),
            { position: CHECKBOX_CELL_WIDTH, cells: [] }
          ).cells
        }
      </TableRow>
    );
  }
);

const BodyCell: React.SFC<{
  column: Column;
  row: Row;
  position: number;

  shadow?: boolean;
}> = ({ column, row, position, shadow }) => {
  const classes = useStyles();

  const isFix = useMemo(() => !!column.fix, [column.fix]);
  const cellClasses = useMemo(() => [isFix && 'fix-cell border-r-0'], [isFix]);
  const cellPosition = useMemo(() => (isFix ? position : undefined), [isFix, position]);

  return (
    <>
      <TableCell
        component="div"
        align={column.align}
        className={ArrayUtil.compactJoin([...cellClasses, classes.bodyCell], ' ')}
        style={{ width: column.width, left: cellPosition }}
      >
        {row[column.id]}
      </TableCell>
      {isFix && shadow && <Box className="fix-cell-shadow" style={{ left: position + column.width }} />}
    </>
  );
};
const BodyRow: React.SFC<{
  columns: Column[];
  row: Row;
  style: React.CSSProperties;

  shadowColumnId?: string;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ columns, row, style, shadowColumnId, selected, onClick }) => {
  const classes = useStyles();

  const isShadow = useCallback(({ id }: Column) => id === shadowColumnId, [shadowColumnId]);

  return (
    <TableRow hover component="div" className={classes.row} selected={selected} onClick={onClick} style={style}>
      <CheckboxCell checked={selected} className={`fix-cell ${classes.bodyCell} ${classes.checkboxCell}`} />
      {!shadowColumnId && <Box className="fix-cell-shadow" style={{ left: CHECKBOX_CELL_WIDTH }} />}
      {
        columns.reduce<{ position: number; cells: React.ReactElement[] }>(
          ({ position, cells }, column) => ({
            position: position + column.width,
            cells: cells.concat(
              <BodyCell column={column} row={row} position={position} shadow={isShadow(column)} key={column.id} />
            )
          }),
          { position: CHECKBOX_CELL_WIDTH, cells: [] }
        ).cells
      }
    </TableRow>
  );
};

// Props Type
export type DataTableProps<R = Row> = {
  columns: Column<R>[];
  rows: R[];
  totalRowCount: number;
  page: number;
  rowsPerPage: number;
  height: number;

  onColumnResize?: TypeUtil.Handler<{ index: number; width: number }>;
  onColumnSort?: TypeUtil.Handler<{ oldIndex: number; newIndex: number }>;
  onRowSort?: TypeUtil.Handler<RowSort>;
  onPageChange?: TypeUtil.Handler<number>;
  onRowsPerPageChange?: TypeUtil.Handler<number>;
  loading?: boolean;
};

// Component
export default function DataTable({
  columns,
  rows,
  height,
  totalRowCount,
  page,
  rowsPerPage,
  onColumnResize,
  onColumnSort,
  onRowSort,
  onPageChange,
  onRowsPerPageChange,
  loading
}: DataTableProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);

  const classes = useStyles();

  useEffect(() => {
    setSelected([]);
  }, [rows]);

  const { width: windowWidth } = useWindowSize();

  const { organizedColumns, lastFixedColumnId, rowSort } = useMemo(() => {
    const isVisible = ({ visible }: Column) => visible !== false;
    const isFixed = (column: Column) => isVisible(column) && column.fix;
    const isNonFixed = (column: Column) => isVisible(column) && !column.fix;

    const fixedColumns = columns.filter(isFixed);
    const nonFixedColumns = columns.filter(isNonFixed);
    const rowSortedColumn = columns.find(({ rowSort: rowSortData }) => typeof rowSortData === 'string');

    return {
      organizedColumns: [...fixedColumns, ...nonFixedColumns],
      lastFixedColumnId: ArrayUtil.last(fixedColumns)?.id,
      rowSort: { by: rowSortedColumn?.id, direction: rowSortedColumn?.rowSort } as RowSort
    };
  }, [columns]);

  const tableContainerWidth = useMemo(() => tableContainerRef.current?.clientWidth, [
    tableContainerRef.current,
    windowWidth
  ]);
  const bodyViewportWidth = useMemo(() => organizedColumns.reduce((acc, cur) => acc + cur.width, CHECKBOX_CELL_WIDTH), [
    organizedColumns
  ]);
  const bodyViewportHeight = useMemo(() => height - HEAD_CELL_HEIGHT, [height]);

  const rowCount = useMemo(() => rows.length, [rows]);
  const selectedRowCount = useMemo(() => selected.length, [selected]);
  const renderRows = useMemo(
    () =>
      rows.map(row =>
        organizedColumns.reduce<Row>(
          (renderRow, column) => ({
            ...renderRow,
            [column.id]: column.render ? column.render(row) : row[column.id]
          }),
          {}
        )
      ),
    [organizedColumns, rows]
  );

  const isSelected = useCallback((index: number) => selected.includes(index), [selected]);

  const handleTableScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    event => {
      setScrollTop(event.currentTarget.scrollTop);
    },
    [scrollTop]
  );

  const handleColumnResize: TypeUtil.Handler<{ index: number; width: number }> = useCallback(
    ({ index: nonFixedIndex, width }) => {
      const index = columns.findIndex(({ id }) => id === organizedColumns[nonFixedIndex].id);

      if (onColumnResize) {
        onColumnResize({ index, width });
      }
    },
    [organizedColumns, onColumnResize]
  );

  const handleColumnSort: SortEndHandler = useCallback(
    ({ oldIndex: nonFixedOldIndex, newIndex: nonFixedNewIndex }) => {
      const oldIndex = columns.findIndex(({ id }) => id === organizedColumns[nonFixedOldIndex].id);
      const newIndex = columns.findIndex(({ id }) => id === organizedColumns[nonFixedNewIndex].id);

      if (onColumnSort) {
        onColumnSort({ oldIndex, newIndex });
      }
    },
    [organizedColumns, onColumnSort]
  );

  const handleRowSort: TypeUtil.Handler<Column> = useCallback(
    ({ id }) => {
      const isDesc = rowSort.by === id && rowSort.direction === 'desc';

      if (onRowSort) {
        onRowSort({ by: id, direction: isDesc ? 'asc' : 'desc' });
      }
    },
    [rowSort, onRowSort]
  );

  const handleSelectAllChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      setSelected(event.target.checked ? ArrayUtil.range(rowCount) : []);
    },
    [rowCount]
  );

  const handleRowClick: TypeUtil.Handler<{ index: number; event: React.MouseEvent<HTMLDivElement> }> = useCallback(
    ({ index, event }) => {
      const lastSelected = ArrayUtil.last(selected);
      const isShiftPress = event.shiftKey;
      const isAltPress = event.altKey;

      if (isShiftPress && typeof lastSelected === 'number') {
        const absoluteRange = index - lastSelected;
        const addRange = absoluteRange > 0 ? 1 : -1;

        setSelected(ArrayUtil.range(lastSelected, absoluteRange + addRange));
      } else if (isAltPress) {
        const newSelected = selected.includes(index)
          ? selected.filter(rowIndex => rowIndex !== index)
          : selected.concat(index);

        setSelected(newSelected);
      } else {
        setSelected([index]);
      }
    },
    [selected]
  );

  const handlePageChange: TablePaginationProps['onChangePage'] = useCallback(
    (event, newPage) => {
      if (onPageChange) {
        onPageChange(newPage);
      }
    },
    [onPageChange]
  );

  const handleRowsPerPageChange: TypeUtil.Handler<React.ChangeEvent<HTMLInputElement>> = useCallback(
    event => {
      const newRowsPerPage = parseInt(event.target.value, 10);

      if (onRowsPerPageChange) {
        onRowsPerPageChange(newRowsPerPage);
      }
    },
    [onRowsPerPageChange]
  );

  const createRowClickHandler: TypeUtil.HandlerCreator<
    number,
    React.MouseEventHandler<HTMLDivElement>
  > = useCallback(index => event => handleRowClick({ index, event }), [handleRowClick]);

  return (
    <Paper className={classes.root}>
      <TableContainer style={{ height }} onScroll={handleTableScroll} ref={tableContainerRef}>
        <Table component="div" size="small" className={classes.table}>
          <TableHead component="div">
            <HeadRow
              useDragHandle
              axis="x"
              lockAxis="x"
              helperClass={`z-50 ${classes.sortableCell}`}
              columns={organizedColumns}
              rowSort={rowSort}
              rowCount={rowCount}
              selectedRowCount={selectedRowCount}
              shadowColumnId={lastFixedColumnId}
              onSortEnd={handleColumnSort}
              onColumnResize={handleColumnResize}
              onRowSort={handleRowSort}
              onSelectAllChange={handleSelectAllChange}
            />
          </TableHead>
          <TableBody component="div" className={classes.body}>
            {CommonUtil.loadTimeRenderer(
              {
                loading: (
                  <Box width={bodyViewportWidth} height="100%">
                    <Box className="p-3" width={tableContainerWidth} position="sticky" left="0">
                      {ArrayUtil.range(8).map(index => (
                        <Box className="mb-3" display="flex" alignItems="center" height={30} key={index}>
                          <Skeleton variant="rect" width={30} height={30} />
                          {SKELETON_WIDTH_PERCENTS.map((percent, deepIndex) => (
                            <Skeleton className="ml-3" width={`${percent}%`} height={25} key={deepIndex} />
                          ))}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ),
                data: !totalRowCount ? (
                  <Box width={bodyViewportWidth} height="100%">
                    <Typography className={classes.nothing} style={{ width: tableContainerWidth }}>
                      No Data.
                    </Typography>
                  </Box>
                ) : (
                  <List
                    width={bodyViewportWidth}
                    height={bodyViewportHeight}
                    scrollTop={scrollTop}
                    overscanRowCount={0}
                    rowCount={rowCount}
                    rowHeight={BODY_CELL_HEIGHT}
                    rowRenderer={({ style, index, key }) => (
                      <BodyRow
                        columns={organizedColumns}
                        row={renderRows[index]}
                        style={style}
                        shadowColumnId={lastFixedColumnId}
                        selected={isSelected(index)}
                        onClick={createRowClickHandler(index)}
                        key={key}
                      />
                    )}
                  />
                )
              },
              loading
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        className={classes.pagination}
        count={totalRowCount}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100, 300, 500]}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
        // classes={{ spacer: 'flex-none' }}
      />
    </Paper>
  );
}

// Initial Props
DataTable.defaultProps = {};
