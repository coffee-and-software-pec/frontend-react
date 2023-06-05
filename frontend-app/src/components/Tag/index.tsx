import { useState } from 'react';
import toMaterialStyle from '../../utils/material-colors';
import styles from './Tag.module.css';

import { ReactComponent as CloseIcon } from '../../assets/close_icon.svg';
import colors from '../../styles/colorsConfig.json';

interface TagProps {
    name: string;
    onClickTag?: any;
    deletable?: boolean;
}

function Tag({ name, onClickTag, deletable }: TagProps) {

    const [active, setActive] = useState(false);
    
    const color = toMaterialStyle(name, 300).backgroundColor;

    function handleOnClickTag() {
        setActive(true);
    }

    function handleOnClickButton() {
        setActive(false);
        if (onClickTag !== undefined) {
            onClickTag();
        }
    }

    return (
        <span className={styles.container} style={{backgroundColor: color}}>
            <span onClick={handleOnClickTag}>{name}</span>
            {/* {onClickTag && <button onClick={onClickTag}>x</button>} */}
            {(active && deletable) && 
                <button onClick={handleOnClickButton}>
                    <CloseIcon color={colors.theme['soft-black']} />
                </button>
            }
        </span>
    );
}

export default Tag;