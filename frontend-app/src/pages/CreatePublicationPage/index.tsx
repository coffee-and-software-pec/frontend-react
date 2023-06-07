import MarkdownEditor from "@uiw/react-markdown-editor";
import React, { useState } from "react";
import TopBar from "../../components/TopBar";

import styles from "./CreatePublicationPage.module.css";

import { ReactComponent as SaveIcon } from "../../assets/save_icon.svg";
import { ReactComponent as PublishIcon } from "../../assets/publish_icon.svg";
import { ReactComponent as AddIcon } from "../../assets/plus_icon.svg";
import DefaultImage from "../../assets/default-image.png";

import Tag from "../../components/Tag";
import MDEditor from "@uiw/react-md-editor";

import colors from '../../styles/colorsConfig.json';
import { createPublication } from "../../services/PublicationService";
import { useAuth } from "../../contexts/AuthContext";
import CreateProjectDTO from "../../services/dtos/CreatePublicationDTO";

function CreatePublicationPage() {
    const { user } = useAuth();

    const [publication, setPublication] = useState<CreateProjectDTO>({
        author_id: '',
        continuous_text: '',
        main_img_url: '',
        title: '',
        subtitle: '',
        tagList: []
    } as CreateProjectDTO);
    // const [publicationText, setPublicationText] = useState<string>("");
    const [tagsInput, setTagsInput] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [isSaved, setIsSaved]  = useState(false);
    const [isPublished, setIsPublished]  = useState(false);

    const onChange = (e: any) => {
        const { value } = e.target;
        setTagsInput(value);
    }

    function onClickPlusButton() {
        const trimmedInput: string = tagsInput.trim();
        if (trimmedInput.length && !tags.includes(trimmedInput)) {
            setTags(prevState => [...prevState, trimmedInput]);
            setTagsInput('');
        }
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

    function handleOnTextImageURLChange(url: string) {
        setPublication({
            ...publication,
            main_img_url: url
        });
    }

    function handleOnTextChangeMarkdown(text: string) {
        // setPublicationText(text);
        setPublication({
            ...publication,
            continuous_text: text
        });
        setHasChanges(true);
    }

    async function handleOnClickSaveChanges() {
        if (!hasChanges) return;
        setHasChanges(false);
        if (user?.id == undefined) {
            try {
                const result = await createPublication({
                    author_id: user?.id!!,
                    continuous_text: publication.continuous_text,
                    title: publication.title,
                    subtitle: publication.subtitle,
                    main_img_url: publication.main_img_url,
                    tagList: tags.map(tag => { return { title: tag }})
                });
                setIsSaved(true);
            } catch (e) {
                console.log("error on publication create");
            }
        }
    }
    
    async function handleOnClickPublicate() {
        if (isPublished) return null;
        setIsPublished(true);
    }
 
    const deleteTag = (index: any) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    return (
        <div className={styles.outsideContainer}>
            <TopBar />
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <label htmlFor="publicationTitle">Título da sua publicação<sup>*</sup></label>
                    <input 
                        id="publicationTitle" 
                        type="text" 
                        placeholder="Ex: Machine Learning Fácil — Classificando gatos e cachorros em 5 passos." 
                    />
                </div>

                <div className={styles.subtitleThumbContainer}>
                    <div className={styles.subtitleContainer}>
                        <label htmlFor="publicationSubtitle">Subtítulo da sua publicação<sup>*</sup></label>
                        <textarea
                            id="publicationSubtitle" 
                            rows={1}
                            placeholder="Ex: Neste tutorial você vai aprender como usar um algoritmo de classificação do Scikit-learn para classificar gatos e cachorros."
                        />
                    </div>

                    <label className={styles.thumbnail}>
                        <span>Adicione uma thumbnail:</span>
                        <input type="url" value={publication.main_img_url} onChange={(value) => handleOnTextImageURLChange(value.target.value)} />
                        <img 
                            src={publication.main_img_url}
                            alt="" 
                            placeholder="URL da imagem"
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null;
                                currentTarget.src = DefaultImage
                            }}
                        />
                    </label>
                </div>
                
                <div className={styles.tags}>
                    {tags.map((tag, index) => (
                        <Tag name={tag} onClickTag={() => deleteTag(index)} deletable={true} />   
                        
                    ))}
                    <label className={styles.inputTagContainer}>
                        <input
                            className={styles.inputTag}
                            value={tagsInput}
                            placeholder="Nova tag"
                            onKeyDown={onKeyDown}
                            onChange={onChange}
                        />
                        <AddIcon onClick={onClickPlusButton} />
                    </label>
                </div>
                <div className={styles.fullTextContainer}>
                    <MarkdownEditor
                        className={styles.markdownEditor}
                        value={publication.continuous_text}
                        toolbars={[
                            "undo", "redo", "bold", "italic", "header", "strike", "underline", "quote", "olist", "ulist", "todo", "link", 
                            "image", "code", "codeBlock"
                        ]}
                        toolbarsMode={[
                            "preview"
                        ]}
                        previewWidth={"70%"}
                        onChange={(value, _) => handleOnTextChangeMarkdown(value)}
                    />
                </div>
                <div className={styles.floatingButtonsContainer}>
                    <button 
                        className={!hasChanges ? styles.disabled : ''} 
                        disabled={!hasChanges}
                        onClick={handleOnClickSaveChanges}
                    >
                        <SaveIcon fill={colors.theme.white} />
                        {hasChanges ? "SALVAR" : "SALVO" }
                    </button>
                    <button
                        className={(isPublished || !isSaved) ? styles.disabled : ''} 
                        disabled={(isPublished || !isSaved)}
                        onClick={handleOnClickPublicate}
                    >
                        <PublishIcon fill={colors.theme.white} />
                        {isPublished ? "PUBLICADO" : "PUBLICAR"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePublicationPage;