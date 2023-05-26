import toMaterialStyle from '../../utils/material-colors';
import styles from './Tag.module.css';

interface TagProps {
    name: string;
    deleteTag: any; 
}

function Tag({ name, deleteTag }: TagProps) {
    
    const color = toMaterialStyle(name, 300).backgroundColor;

    return (
        <span className={styles.container} style={{backgroundColor: color}}>
            <span>{name}</span>
            
            {deleteTag && <button onClick={deleteTag}>x</button>}
        </span>
    );
}

export default Tag;