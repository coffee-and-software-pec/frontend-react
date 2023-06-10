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
import { ChakraProvider } from '@chakra-ui/react'
import DefaultImage from '../DefaultImage';
import DefaultUserImage from '../../assets/default-user.png';

interface UserPublicationProps {
    publication: Publication;
    onDelete: (publicationId: string) => void
}

function UserPublication({ publication, onDelete }: UserPublicationProps) {
    const nav = useNavigate();
    const cancelRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    function handleOnClickPublication() {
        nav(`/publicacao/${publication.p_id}`);
    }

    function handleOnClickEdit() {
        nav(`/publicacao`, { state: { incomingPublication: publication } });
    }

    async function handleOnClickDelete() {
        onClose();
        try {
            await deletePublication(publication.p_id.toString());
            onDelete(publication.p_id.toString());
        } catch (e) {
            console.log("some error ocurred in publication delete")
        }
    }

    return (
        <ChakraProvider>
            <div className={styles.container}>
                <div className={styles.mainContent} onClick={handleOnClickPublication}>
                    <div className={styles.publicationContainer}>
                        <p className={styles.title}>{publication.title}</p>
                        <p className={styles.subtitle}>{publication.subtitle}</p>
                        <div className={styles.tagContainer}>
                            {publication.tags.map((tag, index) => {
                                return (
                                    <Tag key={index} name={tag.title} />
                                )
                            })}
                        </div>
                        <div className={styles.authorContainer}>
                            escrito por:
                            <DefaultImage 
                                src={publication.author.photoURL} 
                                alt=""
                                defaultImage={DefaultUserImage}
                            />
                            <p>{publication.author.u_name}</p>
                        </div>
                    </div>
                    <DefaultImage 
                        className={styles.thumbnail}
                        src={publication.main_img_url}
                        alt=""
                    />
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
                        width={20} 
                        height={20} 
                        className={styles.editButton}
                        onClick={handleOnClickEdit}
                    />
                    <DeleteIcon 
                        width={20} 
                        height={20} 
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
        </ChakraProvider>
    );
}

export default UserPublication;