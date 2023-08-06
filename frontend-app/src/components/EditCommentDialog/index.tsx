import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PublicationComment from "../../models/PublicationComment";
import styles from './EditCommentDialog.module.css';


interface EditCommentDialogProps {
    isOpen: boolean;
    cancelRef: React.MutableRefObject<null>;
    onClose: () => void;
    alertDialogConstants: {
        title: string;
        subtitle: string;
        positiveButtonText: string;
        mode: string;
    }
    commentState: PublicationComment;
    setCommentState: (value: React.SetStateAction<PublicationComment>) => void;
    handleAlertDialogPositiveButton: (text?: string) => Promise<void>;
}

export default function EditCommentDialog({
    isOpen, 
    cancelRef, 
    onClose, 
    alertDialogConstants,
    commentState,
    setCommentState,
    handleAlertDialogPositiveButton
}: EditCommentDialogProps) {
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        if (alertDialogConstants.mode === 'edit') {
            setCommentText(commentState.c_text);
        }
    }, [commentState.c_text]);

    function handleOnClickPositiveButton() {
        if (alertDialogConstants.mode === 'reply') {
            handleAlertDialogPositiveButton(commentText);
        } else {
            handleAlertDialogPositiveButton();
        }
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered={true}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold' className={styles.alertDialogHeader}>
                        {alertDialogConstants.title}
                    </AlertDialogHeader>
                    <AlertDialogBody className={styles.alertDialogBody}>
                        {alertDialogConstants.mode === 'edit' || alertDialogConstants.mode === 'reply' ? (
                            <textarea
                                className={styles.commentTextarea}
                                name="alert-dialog-textarea"
                                id="alert-dialog-textarea"
                                cols={30}
                                rows={10}
                                value={commentText}
                                onChange={e => {
                                    if (alertDialogConstants.mode === 'edit') {
                                        setCommentState({
                                            ...commentState,
                                            c_text: e.target.value
                                        });
                                    }
                                    setCommentText(e.target.value);
                                }}
                            >
                            </textarea>
                        ) : (
                            "Tem certeza? Você não poderá desfazer esta ação depois."
                        )}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} className={styles.alertDialogCancelButton}>
                            Cancelar
                        </Button>
                        <Button
                            colorScheme={alertDialogConstants.mode === 'edit' || alertDialogConstants.mode === 'reply' ? 'blue' : 'red'}
                            onClick={handleOnClickPositiveButton}
                            ml={3}
                        >
                            {alertDialogConstants.positiveButtonText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}