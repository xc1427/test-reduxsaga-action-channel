import React from 'react';
import styles from './index.css';
import { useDispatch } from 'dva';
import { Button } from 'antd';
const BasicLayout: React.FC = props => {
  const dispatch = useDispatch();
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      <br />
      <Button
        // tslint:disable-next-line: jsx-no-lambda
        onClick={() => dispatch({ type: 'test/haha' })}
      >trigger watcher
      </Button>
      {props.children}
    </div>
  );
};

export default BasicLayout;
