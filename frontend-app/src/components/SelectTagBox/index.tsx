import { useEffect, useState } from "react";
// import { api } from "../../api/api";
import Tag from "../Tag";

import styles from './SelectTagBox.module.css';
import { getAllTags } from '../../services/TagService';
import { BarLoader } from "react-spinners";

import colors from '../../styles/colorsConfig.json';

interface SelectTagBoxProps {
    onClickFilterButton: (tags: string[]) => void;
}

function SelectTagBox({ onClickFilterButton }: SelectTagBoxProps) {

    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getTags(){
            const data = await (getAllTags());
            setTags(data.map(tagDTO => tagDTO.title));
            setLoading(false);
        }

        getTags();
    }, [])

    function handleOnClickFilterButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        onClickFilterButton(selectedTags);
    }

    function handleOnSelectTag(tagName: string) {
        if (selectedTags.includes(tagName)) {
            setSelectedTags(selectedTags.filter(t => t !== tagName));
        } else {
            setSelectedTags([...selectedTags, tagName]);
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>escolha uma ou mais tags para filtrar</p>
            <div className={styles.tagList}>
                {
                    loading ? (
                        <BarLoader color={colors.theme.secondary} loading={loading} />
                    ) : (
                        tags.length === 0 ? 
                            (
                                <span className={styles.noTags}>Não há tags disponíveis para filtrar</span>
                            ) : (
                                tags.map(tag => {
                                    return (
                                        <Tag key={tag} name={tag} deletable={true} onClickTag={handleOnSelectTag} />
                                    );
                                })
                            )
                    )
                }
                
            </div>
            <button 
                className={styles.filterButton}
                onClick={handleOnClickFilterButton}
            >
                FILTRAR
            </button>
        </div>
    );
}

export default SelectTagBox;