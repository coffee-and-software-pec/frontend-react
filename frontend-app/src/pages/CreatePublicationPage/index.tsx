import MarkdownEditor from "@uiw/react-markdown-editor";
import React, { useEffect, useRef, useState } from "react";
import TopBar from "../../components/TopBar";

import styles from "./CreatePublicationPage.module.css";

import { ReactComponent as SaveIcon } from "../../assets/save_icon.svg";
import { ReactComponent as PublishIcon } from "../../assets/publish_icon.svg";
import { ReactComponent as AddIcon } from "../../assets/plus_icon.svg";
import DefaultImage from "../../assets/default-image.png";

import Tag from "../../components/Tag";
import MDEditor, { commands } from "@uiw/react-md-editor";

import colors from '../../styles/colorsConfig.json';
import { createPublication, updatePublication } from "../../services/PublicationService";
import { useAuth } from "../../contexts/AuthContext";
import CreateProjectDTO from "../../services/dtos/CreatePublicationDTO";
import { toast, ToastContainer } from "react-toastify";
import User from "../../models/User";
import Publication from "../../models/Publication";
import { useLocation } from "react-router-dom";

import { EditorView } from "@codemirror/view";

import '../../styles/markdown-style.css';
import { embraceWithLoadingAndResolve } from "../../utils/LoadingUtil";

enum EditMode {
    CREATE,
    EDIT
}

function CreatePublicationPage() {
    const location = useLocation();
    const { user, loadUser } = useAuth();
    let [loadedUser, setLoadedUser] = useState<User>();
    const [editMode, setEditMode] = useState<EditMode>(EditMode.CREATE);

    let incomingPublication: Publication | undefined = undefined;
    const [publication, setPublication] = useState<Publication>({
        p_id: '',
        author: {
            u_id: '',
            u_name: '',
            photoURL: '',
        },
        continuous_text: '',
        main_img_url: '',
        title: '',
        subtitle: '',
        tags: [],
        commentsCount: 0,
        creation_date: '',
        heartsCount: 0,
        visualizationsCount: 0
    } as Publication
    );

    const [tagsInput, setTagsInput] = useState<string>('');
    const [hasChanges, setHasChanges] = useState(false);
    const [isSaved, setIsSaved]  = useState(false);
    const [isPublished, setIsPublished]  = useState(false);

    const markdownRef = useRef();

    useEffect(() => {
        setLoadedUser(loadUser());
        if (location.state !== null) {
            incomingPublication= location.state.incomingPublication;
            setPublication(incomingPublication as Publication);
            setEditMode(EditMode.EDIT);
        }
    }, []);
    
    function onClickPlusButton() {
        const trimmedInput: string = tagsInput.trim();
        if (trimmedInput.length && !publication.tags.map(t => t.title).includes(trimmedInput)) {
            addTag(trimmedInput);
            setTagsInput('');
        }
    }

    const onChange = (e: any) => {
        const { value } = e.target;
        setTagsInput(value);
    }

    const onKeyDown = (e: any) => {
        const { key } = e;
        const trimmedInput: string = tagsInput.trim();

        if (key === 'Enter' && trimmedInput.length && !publication.tags.map(t => t.title).includes(trimmedInput)) {
            e.preventDefault();
            addTag(trimmedInput)
            setTagsInput('');
        }

    }

    function addTag(tagName: string) {
        setPublication({
            ...publication,
            tags: [
                ...publication.tags,
                { title: tagName }
            ]
        });
        setHasChanges(true);
    }

    const deleteTag = (index: any) => {
        setPublication({
            ...publication,
            tags: publication.tags.filter((t, i) => i !== index)
        })
        setHasChanges(true);
    }

    function handleOnTextImageURLChange(url: string) {
        setPublication({
            ...publication,
            main_img_url: url
        });
        setHasChanges(true);
    }

    function handleOnTextChangeMarkdown(text: string) {
        setPublication({
            ...publication,
            continuous_text: text
        });
        setHasChanges(true);
    }

    async function handleOnClickSaveChanges() {
        if (!hasChanges) return;

        const validationResponse = validatePublication(publication);
        if (validationResponse !== null) {
            toast.error(
                validationResponse,
                { autoClose: 1000 });
        } else {
            if (editMode == EditMode.CREATE) {
                await createNewPublicationOnSave();
            } else {
                await updatePublicationOnSave();
            }
            setHasChanges(false);
        }
    }

    function validatePublication(publication: Publication): string | null {

        if (publication.title.length < 10 || publication.title.length > 200) {
            return "Título da publicação fora do intervalo (10 a 200 caracteres)";
        }

        if (publication.subtitle.length < 10 || publication.subtitle.length > 400) {
            return "Subtítulo da publicação fora do intervalo (10 a 400 caracteres)";
        }

        if (publication.continuous_text.length < 50) {
            return "Corpo da publicação muito pequeno, mínimo de 50 caracteres";
        }

        return null;
    }

    async function createNewPublicationOnSave() {
        if (loadedUser?.id !== undefined) {
            try {
                setHasChanges(false);
                const resolveCreate = new Promise(resolve => {
                    embraceWithLoadingAndResolve(
                        resolve, 
                        async () => {
                            const result = await createPublication({
                                author_id: loadedUser?.id!!,
                                continuous_text: publication.continuous_text,
                                title: publication.title,
                                subtitle: publication.subtitle,
                                main_img_url: publication.main_img_url,
                                tagList: publication.tags
                            });
                            setIsSaved(true);
                            setPublication(result)
                            setEditMode(EditMode.EDIT);
                        },
                        1000
                    );
                });

                toast.promise(
                    resolveCreate,
                    {
                        pending: 'Criando publicação...',
                        success: "Publicação criada com sucesso!",
                        error: 'Aconteceu algum erro no seu cadastro!'
                    },
                    {
                        position: "top-center",
                        autoClose: 1500
                    }
                );
            } catch (e) {
                toast("Erro ao salvar publicação!", {
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: false,
                    theme: "light",
                    type: "error"
                });
                setHasChanges(true);
            }
        }
    }

    async function updatePublicationOnSave() {
        if (loadedUser?.id !== undefined) {
            try {
                setHasChanges(false);
                const resolveUpdate = new Promise(resolve => {
                    embraceWithLoadingAndResolve(
                        resolve, 
                        async () => {
                            const result = await updatePublication(publication.p_id, {
                                continuous_text: publication.continuous_text,
                                title: publication.title,
                                subtitle: publication.subtitle,
                                main_img_url: publication.main_img_url,
                                tagList: publication.tags
                            });
                            setIsSaved(true);
                            setPublication(result);
                            incomingPublication = result;
                        },
                        1000
                    );
                });

                toast.promise(
                    resolveUpdate,
                    {
                        pending: 'Atualizando publicação...',
                        success: "Publicação atualizada com sucesso!",
                        error: 'Aconteceu algum erro no seu cadastro!'
                    },
                    {
                        position: "top-center",
                        autoClose: 1500
                    }
                );
            } catch (e) {
                toast("Erro ao salvar publicação!", {
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: false,
                    theme: "light",
                    type: "error"
                });
                setHasChanges(true);
            }
        }
    }
    
    async function handleOnClickPublicate() {
        if (isPublished) return null;
        setIsPublished(true);
    }

    function handlePublicationAttributeChange(e: React.ChangeEvent<any>, attributeName: string) {
        setPublication({...publication, [attributeName]: e.target.value });
        setHasChanges(true);
    }

    return (
        <>
            <div className={styles.outsideContainer}>
                <TopBar />
                <div className={styles.container}>
                    <h2>
                        {
                            editMode === EditMode.CREATE ? "criando publicação" : "editando publicação"
                        }
                    </h2>
                    <div className={styles.titleContainer}>
                        <label htmlFor="publicationTitle">Título da sua publicação<sup>*</sup></label>
                        <input 
                            id="publicationTitle" 
                            type="text" 
                            placeholder="Ex: Machine Learning Fácil — Classificando gatos e cachorros em 5 passos."
                            value={publication.title}
                            onChange={e => handlePublicationAttributeChange(e, "title")}
                        />
                    </div>
                    <div className={styles.subtitleThumbContainer}>
                        <div className={styles.subtitleContainer}>
                            <label htmlFor="publicationSubtitle">Subtítulo da sua publicação<sup>*</sup></label>
                            <textarea
                                id="publicationSubtitle" 
                                rows={1}
                                placeholder="Ex: Neste tutorial você vai aprender como usar um algoritmo de classificação do Scikit-learn para classificar gatos e cachorros."
                                value={publication.subtitle}
                                onChange={e => handlePublicationAttributeChange(e, "subtitle")}
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
                        {publication.tags.map((tag, index) => (
                            <Tag key={index} name={tag.title} onClickTag={() => deleteTag(index)} deletable={true} />   
                            
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
                    <div className={styles.fullTextContainer} data-color-mode="light">
                        <MDEditor
                            height={"100%"}
                            className={styles.markdownEditor}
                            value={publication.continuous_text}
                            onChange={(value, _) => handleOnTextChangeMarkdown(value!!)}
                            preview="edit"
                            visibleDragbar={false}
                          />
                        <h1>Prévia da sua publicação</h1>
                        <MDEditor.Markdown
                            className={styles.preview}
                            source={publication.continuous_text} 
                            style={{ 
                                whiteSpace: 'pre-wrap',
                                backgroundColor: 'transparent'
                            }} 
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
            <ToastContainer />
        </>
    )
}

export default CreatePublicationPage;