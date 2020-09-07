import { NextPage, GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import produce from 'immer';

import { ArrayUtil, DateUtil } from '@util';
import { HomeApi } from '@api';
import DashboardTemplate, { DashboardTemplateProps } from '@components/Templates/DashboardTemplate';

// Props Type
type HomeDashboardPageProps = {};

// Component
const HomeDashboardPage: NextPage<HomeDashboardPageProps> = () => {
  const [homeDashboardPageState, setHomeDashboardPageState] = useState<DashboardTemplateProps>({
    summaryData: {
      loading: true,
      datas: [
        {
          group: 'Summary Data 1st',
          count: 0
        },
        {
          group: 'Summary Data 2nd',
          count: 0
        },
        {
          group: 'Summary Data 3rd',
          count: 0
        }
      ]
    },
    statusData: {
      loading: true,
      title: 'Status',
      onActionClick: function handleActionClick() {
        console.log('Click');
      },
      groups: [
        {
          group: 'Status Group 1',
          effect: 'Effect',
          color: 'blue',
          datas: [
            {
              iconType: 'Code',
              state: 'State 1',
              count: 0
            }
          ]
        },
        {
          group: 'Status Group 2',
          effect: 'Effect',
          color: 'green',
          datas: [
            {
              iconType: 'Code',
              state: 'State 1',
              count: 0
            },
            {
              iconType: 'Code',
              state: 'State 2',
              count: 0
            }
          ]
        },
        {
          group: 'Status Group 3',
          effect: 'Effect',
          color: 'pink',
          datas: [
            {
              iconType: 'Code',
              state: 'State 1',
              count: 0
            },
            {
              iconType: 'Code',
              state: 'State 2',
              count: 0
            },
            {
              iconType: 'Code',
              state: 'State 3',
              count: 0
            },
            {
              iconType: 'Code',
              state: 'State 4',
              count: 0
            }
          ]
        },
        {
          group: 'Status Group 4',
          color: 'purple',
          datas: [
            {
              iconType: 'Code',
              state: 'State 1',
              count: 0
            },
            {
              iconType: 'Code',
              state: 'State 2',
              count: 0
            },
            {
              iconType: 'Code',
              state: 'State 3',
              count: 0
            }
          ]
        }
      ]
    },
    overallStatusDatas: [
      {
        loading: true,
        title: 'Overall Status 1',
        onActionClick: function handleActionClick() {
          console.log('Click');
        },
        datas: [
          {
            text: 'Status 1',
            count: 0
          },
          {
            text: 'Status 2',
            count: 0
          },
          {
            text: 'Status 3',
            count: 0
          },
          {
            text: 'Status 4',
            count: 0
          }
        ]
      },
      {
        loading: true,
        title: 'Overall Status 2',
        onActionClick: function handleActionClick() {
          console.log('Click');
        },
        datas: [
          {
            text: 'Status 1',
            count: 0
          },
          {
            text: 'Status 2',
            count: 0,
            highlight: true
          },
          {
            text: 'Status 3',
            count: 0
          }
        ]
      },
      {
        loading: true,
        title: 'Overall Status 3',
        onActionClick: function handleActionClick() {
          console.log('Click');
        },
        datas: [
          {
            text: 'Status 1',
            count: 0
          },
          {
            text: 'Status 2',
            count: 0
          },
          {
            text: 'Status 3',
            count: 0
          }
        ]
      },
      {
        loading: true,
        title: 'Overall Status 4',
        onActionClick: function handleActionClick() {
          console.log('Click');
        },
        datas: [
          {
            text: 'Status 1',
            count: 0
          },
          {
            text: 'Status 2',
            count: 0,
            highlight: true
          },
          {
            text: 'Status 3',
            count: 0
          }
        ]
      }
    ],
    noticeDatas: [
      {
        loading: true,
        title: 'Notice 1',
        onActionClick: function handleActionClick() {
          console.log('Click');
        },
        datas: []
      },
      {
        loading: true,
        title: 'Notice 2',
        onActionClick: function handleActionClick() {
          console.log('Click');
        },
        datas: []
      }
    ],
    chartDatas: [
      {
        loading: true,
        title: 'Chart 1',
        onActionClick: function handleActionClick() {
          console.log('Click');
        },
        type: 'Line',
        height: 400,
        groups: [
          {
            group: 'Group 1',
            datas: []
          },
          {
            group: 'Group 2',
            datas: []
          }
        ]
      },
      {
        loading: true,
        title: 'Chart 2',
        onActionClick: function handleActionClick() {
          console.log('Click');
        },
        type: 'Pie',
        height: 400,
        label: 'Group 1',
        datas: []
      }
    ]
  });

  useEffect(() => {
    HomeApi.dashboardGetData({})
      .catch(() => true)
      .then(() => {
        setHomeDashboardPageState(
          produce(
            homeDashboardPageState,
            ({ summaryData, statusData, overallStatusDatas, noticeDatas, chartDatas }) => {
              summaryData.loading = false;
              summaryData.datas[0].count = 1;
              summaryData.datas[1].count = 2;
              summaryData.datas[2].count = 3;

              statusData.loading = false;
              statusData.groups[0].datas[0].count = 1;
              statusData.groups[1].datas[0].count = 1;
              statusData.groups[1].datas[1].count = 2;
              statusData.groups[2].datas[0].count = 1;
              statusData.groups[2].datas[1].count = 2;
              statusData.groups[2].datas[2].count = 3;
              statusData.groups[2].datas[3].count = 4;
              statusData.groups[3].datas[0].count = 1;
              statusData.groups[3].datas[1].count = 2;
              statusData.groups[3].datas[2].count = 3;

              overallStatusDatas[0].loading = false;
              overallStatusDatas[0].datas[0].count = 1;
              overallStatusDatas[0].datas[1].count = 2;
              overallStatusDatas[0].datas[2].count = 3;
              overallStatusDatas[0].datas[3].count = 4;
              overallStatusDatas[1].loading = false;
              overallStatusDatas[1].datas[0].count = 1;
              overallStatusDatas[1].datas[1].count = 2;
              overallStatusDatas[1].datas[2].count = 3;
              overallStatusDatas[2].loading = false;
              overallStatusDatas[2].datas[0].count = 1;
              overallStatusDatas[2].datas[1].count = 2;
              overallStatusDatas[2].datas[2].count = 3;
              overallStatusDatas[3].loading = false;
              overallStatusDatas[3].datas[0].count = 1;
              overallStatusDatas[3].datas[1].count = 2;
              overallStatusDatas[3].datas[2].count = 3;

              noticeDatas[0].loading = false;
              noticeDatas[0].datas = ArrayUtil.range(9).map(num => ({
                category: 'Category',
                text: 'Title',
                date: DateUtil.formater(DateUtil.getToday()),
                highPriority: !num
              }));
              noticeDatas[1].loading = false;
              noticeDatas[1].datas = ArrayUtil.range(9).map(num => ({
                category: 'Category',
                text: 'Title',
                date: DateUtil.formater(DateUtil.getToday()),
                highPriority: !num
              }));

              chartDatas[0].loading = false;
              chartDatas[0].groups[0].datas = ArrayUtil.range(1, 7).map(num => ({
                key: new Date(DateUtil.getDateFromToday(num, 'day')),
                value: num
              }));
              chartDatas[0].groups[1].datas = ArrayUtil.range(1, 7).map(num => ({
                key: new Date(DateUtil.getDateFromToday(num, 'day')),
                value: num + 10
              }));
              chartDatas[1].loading = false;
              chartDatas[1].datas = ArrayUtil.range(1, 3).map(num => ({
                key: num.toString(),
                value: num
              }));
            }
          )
        );
      });
  }, []);

  return <DashboardTemplate {...homeDashboardPageState} />;
};

// Initial Props(Build-time)
export const getStaticProps: GetStaticProps<HomeDashboardPageProps> = async () => {
  return {
    props: {}
  };
};

// Export
export default HomeDashboardPage;
