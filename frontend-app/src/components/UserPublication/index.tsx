import { useNavigate } from 'react-router-dom';
import styles from './UserPublication.module.css';
import Publication from '../../models/Publication';
import Tag from '../Tag';
import { ReactComponent as HeartIcon } from '../../assets/heart_icon.svg';
import { ReactComponent as CommentIcon } from '../../assets/comment_icon_filled.svg';
import { ReactComponent as EditIcon } from '../../assets/edit_icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete_icon.svg';

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react';
import { useRef } from 'react';
import { deletePublication } from '../../services/PublicationService';

interface UserPublicationProps {
    publication: Publication;
    onDelete: (publicationId: string) => void
}

function UserPublication({ publication, onDelete }: UserPublicationProps) {
    const nav = useNavigate();
    const cancelRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    function handleOnClickPublication() {
        nav(`/publicacao/${publication.id}`);
    }

    function handleOnClickEdit() {
        nav(`/editarpublicacao/${publication.id}`);
    }

    async function handleOnClickDelete() {
        onClose();
        try {
            await deletePublication(publication.id.toString());
            onDelete(publication.id.toString());
        } catch (e) {
            console.log("some error ocurred in publication delete")
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.mainContent} onClick={handleOnClickPublication}>
                    <div className={styles.publicationContainer}>
                        <p className={styles.title}>{publication.title}</p>
                        <p className={styles.subtitle}>{publication.subtitle}</p>
                        <div className={styles.tagContainer}>
                            {publication.tags.map(tag => {
                                return (
                                    <Tag key={tag} name={tag} />
                                )
                            })}
                        </div>
                        <div className={styles.authorContainer}>
                            escrito por:
                            <img 
                                src={publication.authorData.authorPhoto} 
                                alt=""
                                referrerPolicy="no-referrer" 
                            />
                            <p>{publication.authorData.authorName}</p>
                        </div>
                    </div>
                    <img className={styles.thumbnail} src={publication.thumbnail} alt="" />
                </div>
                <div className={styles.reactionsContainer}>
                    <div className={styles.reactionContainer}>
                        <HeartIcon />
                        <p>{publication.heartsCount}</p>
                    </div>
                    <div className={styles.reactionContainer}>
                        <CommentIcon />
                        <p>{publication.commentsCount}</p>
                    </div>
                </div>
                <div className={styles.editContainer}>
                    <EditIcon 
                        width={16} 
                        height={16} 
                        className={styles.editButton}
                        onClick={handleOnClickEdit}
                    />
                    <DeleteIcon 
                        width={16} 
                        height={16} 
                        className={styles.removeButton}
                        onClick={onOpen }
                    />
                </div>
            </div>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered={true}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Deletar publicação
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Tem certeza? Você não poderá desfazer esta ação depois.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme='red' onClick={handleOnClickDelete} ml={3}>
                        Deletar
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default UserPublication;