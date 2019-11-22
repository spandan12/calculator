import React from 'react';

import styles from './DisplayScreen.module.css'

function displayScreen(props) {
    return (
        <div className={styles.screen}>{props.value}</div>
    )
}

export default displayScreen;

