import { Tabs, Button } from 'antd';
import React, { useEffect, useState } from 'react';

const { TabPane } = Tabs;

const View = () => {
  const [panes, setPanes] = useState<
    Array<{ title?: string; content?: ''; key?: '' }>
  >([]);
  const [newTabIndex, setNewTabIndex] = useState(2);
  const [activeKey, setActiveKey] = useState();

  useEffect(() => {
    setPanes([
      { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
    ]);
    setActiveKey(panes[0]);
  }, []);

  const add = () => {
    const newActiveKey = `newTab${newTabIndex}`;
    setPanes(prevState => {
      return [
        ...prevState,
        { title: 'New Tab', content: 'New Tab Pane', key: newActiveKey }
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
