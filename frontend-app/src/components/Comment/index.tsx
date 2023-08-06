import PublicationComment from '../../models/PublicationComment';
import { getCommentDateString, getCommentDateTime } from '../../utils/CommentDateUtil';
import DefaultImage from '../DefaultImage';
import styles from './Comment.module.css';

import DefaultImageUser from "../../assets/default-user.png";
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';
import User from '../../models/User';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ChakraProvider, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';

import { ReactComponent as MenuIcon } from '../../assets/menu_icon.svg';
import { createComment, deleteComment, updateComment } from '../../services/CommentService';
import { toast, TypeOptions } from 'react-toastify';
import EditCommentDialog from '../EditCommentDialog';

interface CommentProps {
    comment: PublicationComment,
    publicationId: string,
    onDeleteComment: (commentId: string) => void;
    onCreateComment: (comment: PublicationComment) => void;
}

function Comment({ comment, onDeleteComment, onCreateComment, publicationId }: CommentProps) {
    const [commentState, setCommentState] = useState<PublicationComment>(comment);
    const { loadUser, user } = useAuth();

    const cancelRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [alertDialogConstants, setAlertDialogConstants] = useState({
        'title': '',
        'subtitle': '',
        'positiveButtonText': '',
        'mode': ''
    });
    
    useEffect(() => {
        let _ = loadUser();
    }, []);

    function onEditCommentButton() {
        setAlertDialogConstants({
            mode: 'edit',
            title: 'Editar comentário',
            subtitle: '',
            positiveButtonText: 'Enviar'
        });
        onOpen();
    }

    function onDeleteCommentButton() {
        setAlertDialogConstants({
            mode: 'delete',
            title: 'Deletar comentário',
            subtitle: 'Tem certeza que quer deletar?',
            positiveButtonText: 'Deletar'
        })
        onOpen();
    }

    function handleReplyButton() {
        setAlertDialogConstants({
            mode: 'reply',
            title: 'Responder comentário',
            subtitle: 'Digite seu comentário aqui',
            positiveButtonText: 'Enviar'
        })
        onOpen();
    }

    async function handleAlertDialogPositiveButton(childrenCommentText?: string) {
        const toastConstants: { title: string, type: TypeOptions } = {
            title: 'Error desconhecido',
            type: 'error'
        }
        if (alertDialogConstants.mode === 'edit') {
            const updatedComment: PublicationComment = await updateComment(
                {text: commentState.c_text}, comment.c_id);
            setCommentState(updatedComment);
            toastConstants.title = 'Comentário atualizado!';
            toastConstants.type = 'success';
        } else if (alertDialogConstants.mode === 'delete') {
            const _ = await deleteComment(comment.c_id);
            onDeleteComment(comment.c_id);
            toastConstants.title = 'Comentário deletado!';
            toastConstants.type = 'success';
        } else if (alertDialogConstants.mode === 'reply') {
            try {
                const savedComment = await createComment({
                    author_id: user?.id!!,
                    c_text: childrenCommentText!!,
                    publication_id: publicationId,
                    c_parent_id: commentState.c_id,
                });
                toastConstants.title = 'Comentário salvo!';
                toastConstants.type = 'success';
                onCreateComment(savedComment);
            } catch (_) {}
        }

        onClose();
        toast(toastConstants.title, {
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: false,
            theme: "light",
            type: toastConstants.type,
            position: "bottom-center"
        });
    }

    return (
        <ChakraProvider>
            <div className={styles.containerWithoutBox}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.authorContainer}>
                            {/* <img src={comment.author.photoURL} alt="" referrerPolicy='no-referrer' /> */}
                            <DefaultImage 
                                src={commentState.author.photoURL} 
                                alt=""
                                defaultImage={DefaultImageUser}
                            />
                            <p>{commentState.author.u_name}</p>
                        </div>
                        <span className={styles.commentDate}>
                            {getCommentDateTime(commentState.creation_date)}
                        </span>
                    </div>
                    <div className={styles.content}>
                        {commentState.c_text}
                    </div>
                    { user && user.id === commentState.author.u_id ? (
                        <div className={styles.actionsContainer}>
                            <Menu>
                                <MenuButton 
                                    as={IconButton} 
                                    icon={<MenuIcon width={16} height={16} />}
                                    variant='outline'
                                >
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={onEditCommentButton}>Editar</MenuItem>
                                    <MenuItem onClick={onDeleteCommentButton}>Deletar</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    ) : "" }
                </div>
                <div 
                    className={styles.reply} 
                    onClick={handleReplyButton}
                >
                    <span>responder</span>
                </div>
            </div>
            <EditCommentDialog 
                isOpen={isOpen}
                alertDialogConstants={alertDialogConstants}
                cancelRef={cancelRef}
                commentState={commentState}
                setCommentState={setCommentState}
                handleAlertDialogPositiveButton={handleAlertDialogPositiveButton}
                onClose={onClose}
            />
        </ChakraProvider>
    );
}

export default Comment;