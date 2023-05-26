import MarkdownEditor from "@uiw/react-markdown-editor";
import React, { useState } from "react";
import TopBar from "../../components/TopBar";

import styles from "./CreatePublicationPage.module.css";

import { ReactComponent as SaveIcon } from "../../assets/save_icon.svg";
import { ReactComponent as PublishIcon } from "../../assets/publish_icon.svg";
import Tag from "../../components/Tag";

function CreatePublicationPage() {
    const [publicationText, setPublicationText] = useState<string>("");
    const [tagsInput, setTagsInput] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    const onChange = (e: any) => {
        const { value } = e.target;
        setTagsInput(value);
    }

    const onKeyDown = (e: any) => {
        const { key } = e;
        const trimmedInput: string = tagsInput.trim();

        if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setTagsInput('');
        }

    }

    const deleteTag = (index: any) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    return (
        <div className={styles.outsideContainer}>
            <TopBar />
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <label htmlFor="publicationTitle">Título da sua publicação (*):</label>
                    <input 
                        id="publicationTitle" 
                        type="text" 
                        placeholder="Ex: Machine Learning Fácil — Classificando gatos e cachorros em 5 passos." 
                    />
                </div>
                <div className={styles.subtitleContainer}>
                    <label htmlFor="publicationSubtitle">Subtítulo da sua publicação (*):</label>
                    <textarea
                        id="publicationSubtitle" 
                        rows={1}
                        placeholder="Ex: Neste tutorial você vai aprender como usar um algoritmo de classificação do Scikit-learn para classificar gatos e cachorros."
                    />
                </div>
                    <div className={styles.tags}>
                        {tags.map((tag, index) => (
                            <Tag name={tag} deleteTag={() => deleteTag(index)}/>   
                            
                        ))}
                    </div>
                    <div>
                        <input
                            className={styles.inputTag}
                            value={tagsInput}
                            placeholder="Adicionar nova tag"
                            onKeyDown={onKeyDown}
                            onChange={onChange}
                        />
                    </div>
                <div className={styles.fullTextContainer}>
                    <MarkdownEditor
                        className={styles.markdownEditor}
                        value={publicationText}
                        toolbars={[
                            "undo", "redo", "bold", "italic", "header", "strike", "underline", "quote", "olist", "ulist", "todo", "link", 
                            "image", "code", "codeBlock"
                        ]}
                        toolbarsMode={[
                            "preview"
                        ]}
                        onChange={(value, _) => setPublicationText(value)}
                    />
                </div>
                <div className={styles.floatingButtonsContainer}>
                    <button>
                        <SaveIcon />
                        SALVAR
                    </button>
                    <button>
                        <PublishIcon />
                        PUBLICAR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePublicationPage;