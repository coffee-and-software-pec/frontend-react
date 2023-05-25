import toMaterialStyle from '../../utils/material-colors';
import styles from './Tag.module.css';

interface TagProps {
    name: string;
}

function Tag({ name }: TagProps) {

    const color = toMaterialStyle(name, 300).backgroundColor;

    return (
        <div className={styles.container} style={{backgroundColor: color}}>
            <span>{name}</span>
        </div>
    );
}

export default Tag;