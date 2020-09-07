import { NextPage, GetStaticProps } from 'next';
import { useState } from 'react';

import { TypeUtil, ArrayUtil } from '@util';
import { ListApi } from '@api';
import DataTableBoardTemplate, { DataTableBoardTemplateProps } from '@components/Templates/DataTableBoardTemplate';

type AdditionalFormData = {
  'Detail Option 1': string;
  'Detail Option 2': string;
};

type ApiResponseRow = TypeUtil.Unpacked<ListApi.ListResponse>;

// Props Type
type ListTablePageProps = {};

// Component
const ListTablePage: NextPage<ListTablePageProps> = () => {
  const [listTablePageState, setListTablePageState] = useState<
    DataTableBoardTemplateProps<AdditionalFormData, ApiResponseRow>
  >(() => ({
    actions: [
      {
        iconType: 'Code',
        label: 'Action 1'
      },
      {
        iconType: 'Code',
        label: 'Action 2'
      }
    ],
    api: ({
      start,
      length,
      orderBy,
      keywordKey,
      keywordMatchType,
      keyword,
      dateKey,
      dates,
      multiKeywordKey,
      multiKeyword,
      ...payload
    }) => {
      return ListApi.list({
        start,
        length,
        orderby: orderBy,
        search_key: keywordKey,
        search_type: keywordMatchType,
        search_word: keyword,
        date_type: dateKey,
        sdate: dates[0],
        edate: dates[1],
        multi_type: multiKeywordKey,
        multi_search_word: multiKeyword,
        ...payload
      })
        .catch(() => true)
        .then(() => ({
          rows: ArrayUtil.range(50).map(() => ({
            'fixed': 'fixed',
            'align center': 'align center',
            'resize disable': 'resize disable',
            'sort disable': 'sort disable',
            'hidden': 'hidden',
            'row sort disable': 'row sort disable',
            'custom render': 'custom render'
          })),
          totalRowCount: 50
        }));
    },
    form: {
      keywordOptions: [
        { key: 'Keyword Option', value: '' },
        { key: 'Keyword Option 1', value: 1 },
        { key: 'Keyword Option 2', value: 2 }
      ],
      dateOptions: [
        { key: 'Date Option', value: '' },
        { key: 'Date Option 1', value: 1 },
        { key: 'Date Option 2', value: 2 }
      ],
      multiKeywordOptions: [
        { key: 'Multi Keyword Option', value: '' },
        { key: 'Multi Keyword Option 1', value: 1 },
        { key: 'Multi Keyword Option 2', value: 2 }
      ],
      detailOptionsDatas: [
        {
          name: 'Detail Option 1',
          options: [
            { key: 'Detail Option 1', value: '' },
            { key: 'Detail Option 1_1', value: 1 },
            { key: 'Detail Option 1_2', value: 2 }
          ]
        },
        {
          name: 'Detail Option 2',
          options: [
            { key: 'Detail Option 2', value: '' },
            { key: 'Detail Option 2_1', value: 1 },
            { key: 'Detail Option 2_2', value: 2 }
          ]
        }
      ]
    },
    columns: [
      {
        id: 'fixed',
        label: 'Fixed',
        width: 250,
        fix: true
      },
      {
        id: 'align center',
        label: 'Align Center',
        width: 250,
        align: 'center'
      },
      {
        id: 'resize disable',
        label: 'Resize Disable',
        width: 250,
        resize: false
      },
      {
        id: 'sort disable',
        label: 'Sort Disable',
        width: 250,
        sort: false
      },
      {
        id: 'hidden',
        label: 'Hidden',
        width: 250,
        visible: false
      },
      {
        id: 'row sort disable',
        label: 'Row Sort Disable',
        width: 250,
        rowSort: false
      },
      {
        id: 'custom render',
        label: 'Custom Render',
        width: 250,
        render(row) {
          return JSON.stringify(row);
        }
      }
    ]
  }));

  return <DataTableBoardTemplate {...listTablePageState} />;
};

// Initial Props(Build-time)
export const getStaticProps: GetStaticProps<ListTablePageProps> = async () => {
  return {
    props: {}
  };
};

// Export
export default ListTablePage;
