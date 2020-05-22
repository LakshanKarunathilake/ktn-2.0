import { Tabs, Button, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const View = () => {
  const [panes, setPanes] = useState<
    Array<{ title?: string; content?: ''; key?: '' }>
  >([]);
  const [newTabIndex, setNewTabIndex] = useState(2);
  const [activeKey, setActiveKey] = useState();

  useEffect(() => {
    setPanes([
      { title: 'Invoice 1', content: 'Content of Tab Pane 1', key: '1' }
    ]);
    setActiveKey(panes[0]);
  }, []);

  const add = () => {
    const newActiveKey = `Invoice ${newTabIndex}`;
    setPanes(prevState => {
      return [
        ...prevState,
        {
          title: newActiveKey,
          content: 'New Tab Pane',
          key: newActiveKey
        }
      ];
    });
    setNewTabIndex(newTabIndex + 1);
    setActiveKey(newActiveKey);
  };

  const remove = targetKey => {
    let lastIndex = 0;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        setActiveKey(newPanes[lastIndex].key);
      } else {
        setActiveKey(panes[0].key);
      }
    }
    setPanes(newPanes);
  };

  const onEdit = (targetKey, action) => {
    if (action === 'addd') {
      add(targetKey);
    } else {
      remove(targetKey);
    }
  };

  return (
    <Card style={{ margin: 10, height: '92%' }}>
      <div style={{ position: 'absolute', top: 20, right: 10, zIndex: 5 }}>
        <Button type="primary" onClick={add} icon={<PlusOutlined />} />
      </div>
      <Tabs
        hideAdd
        onChange={key => setActiveKey(key)}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
};

export default View;
