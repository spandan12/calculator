import React from 'react';

import styles from './PressKey.module.css';

function pressKey(props) {
    return (
        <button className={styles.key} value={props.value} onClick={props.onClick}>{props.value}</button>
    )
}

export default pressKey;