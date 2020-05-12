import { Tabs, Button } from 'antd';
import React, { useEffect, useState } from 'react';

const { TabPane } = Tabs;

const View = () => {
  const [panes, setPanes] = useState([]);
  const [newTabIndex, setNewTabIndex] = useState(0);
  const [activeKey, setActiveKey] = useState();

  useEffect(() => {
    setPanes([
      { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' }
    ]);
    setActiveKey(panes[0]);
  }, []);

  const add = () => {
    const newActiveKey = `newTab${setNewTabIndex(newTabIndex + 1)}`;
    setPanes(prevState => {
      return [
        ...prevState,
        { title: 'New Tab', content: 'New Tab Pane', key: activeKey }
      ];
    });
    setActiveKey(newActiveKey);
  };

  const remove = targetKey => {
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  const onEdit = (targetKey, action) => {
    if (action === 'addd') {
      add(targetKey);
    } else {
      remove(targetKey);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={add}>ADD</Button>
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
    </div>
  );
};

export default View;
