import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useState } from "react";
import styles from './ReviewDialog.module.css';


interface EditCommentDialogProps {
    isOpen: boolean;
    cancelRef: React.MutableRefObject<null>;
    onClose: () => void;
    highlightedText: string;
    handleAlertDialogPositiveButton: (reviewText: string, highlightedText: string) => void;
    reviewText?: string;
    reviewDialogType: "EDIT" | "DELETE" | "CREATE";
}

export default function ReviewDialog({
    isOpen, 
    cancelRef, 
    onClose, 
    highlightedText,
    handleAlertDialogPositiveButton,
    reviewText,
    reviewDialogType
}: EditCommentDialogProps) {
    const [reviewTextState, setReviewTextState] = useState(reviewText ?? "");

    function handleOnClickPositiveButton() {
        handleAlertDialogPositiveButton(reviewTextState, highlightedText);
        onClose();
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
                        {reviewDialogType === 'DELETE' ? (
                            <p>Tem certeza que seja deletar esta revisão?</p>
                        ) : (
                            <><p>Digite abaixo sua revisão para este trecho: </p><span>"{highlightedText}"</span></>
                        )}
                    </AlertDialogHeader>
                    <AlertDialogBody className={styles.alertDialogBody}>
                        {reviewDialogType === 'DELETE' ? (
                            ""
                        ): (
                            <textarea
                                className={styles.commentTextarea}
                                name="alert-dialog-textarea"
                                id="alert-dialog-textarea"
                                cols={30}
                                rows={10}
                                value={reviewTextState}
                                onChange={e => setReviewTextState(e.target.value)}
                            >
                            </textarea>
                        )}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} className={styles.alertDialogCancelButton}>
                            Cancelar
                        </Button>
                        <Button
                            colorScheme={reviewDialogType === 'DELETE' ? "red" : "blue"}
                            onClick={handleOnClickPositiveButton}
                            ml={3}
                        >
                            {reviewDialogType === 'DELETE' ? "DELETAR" : "SALVAR"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}