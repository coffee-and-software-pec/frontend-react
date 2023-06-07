import { useEffect, useState } from "react";
// import { api } from "../../api/api";
import Tag from "../Tag";

import styles from './SelectTagBox.module.css';
import { getAllTags } from '../../services/TagService';

function SelectTagBox() {

    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        async function getTags(){
            const data = await (getAllTags());
            setTags(data.map(tagDTO => tagDTO.title));
        }

        getTags();
    }, [])


    return (
        <div className={styles.container}>
            <p className={styles.title}>escolha uma ou mais tags para filtrar</p>
            <div className={styles.tagList}>
                {tags.map(tag => {
                    return (
                        <Tag key={tag} name={tag} deletable={true} />
                    );
                })}
            </div>
            <button className={styles.filterButton}>FILTRAR</button>
        </div>
    );
}

export default SelectTagBox;