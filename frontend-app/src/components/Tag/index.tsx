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
        if (deletable) {
            setActive(!active);
            if (onClickTag !== undefined) {
                onClickTag(name);
            }
        }
    }

    return (
        <span 
            className={styles.container} 
            style={{backgroundColor: color}}
            onClick={handleOnClickTag}
        >
            <span>{name}</span>
            {(active && deletable) && 
                <button 
                >
                    <CloseIcon color={colors.theme['soft-black']} />
                </button>
            }
        </span>
    );
}

export default Tag;