import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Icon,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
} from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'dva';
import styles from './teststyle.less';
import { findDOMNode } from 'react-dom';

const { Step } = Steps;
const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志一',
  },
  {
    key: 'tab2',
    tab: '操作日志二',
  },
  {
    key: 'tab3',
    tab: '操作日志三',
  },
];
const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
    render: plain => (
      <Tooltip placement="topLeft" title={plain}>
        {plain}
      </Tooltip>
    ),
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text => {
      if (text === 'agree') {
        return <Badge status="success" text="成功" />;
      }

      return <Badge status="error" text="驳回" />;
    },
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
    render: text => (
      <Button type="primary" onClick={() => this.reduce('你好')}>
        查看
      </Button>
    ),
  },
];

@connect(({ testAdvanced, loading }) => ({
  testAdvanced,
  loading: loading.effects['testAdvanced/fetchAdvanced'],
}))
class Advanced extends Component {
  state = {
    operationKey: 'tab1',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'testAdvanced/fetchAdvanced',
    });
  }

  onOperationTabChange = key => {
    this.setState({
      operationKey: key,
    });
  };

  onTabChange = tabActiveKey => {
    this.setState({
      tabActiveKey,
    });
  };

  render() {
    const { operationKey, tabActiveKey } = this.state;
    const { testAdvanced, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = testAdvanced;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };
    return (
      <PageHeaderWrapper>
        <div className={styles.main}>
          <GridContent>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onOperationTabChange}
            >
              {contentList[operationKey]}
            </Card>
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Advanced;
