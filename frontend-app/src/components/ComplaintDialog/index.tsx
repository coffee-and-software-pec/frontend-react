import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useState } from "react";
import styles from './ComplaintDialog.module.css';


interface ComplaintDialogProps {
    isOpen: boolean;
    cancelRef: React.MutableRefObject<null>;
    onClose: () => void;
    handleAlertDialogPositiveButton: (complaintText: string) => void;
}

export default function ComplaintDialog({
    isOpen, 
    cancelRef, 
    onClose, 
    handleAlertDialogPositiveButton,
}: ComplaintDialogProps) {
    const [text, setText] = useState("");


    function handleOnClickPositiveButton() {
        handleAlertDialogPositiveButton(text);
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
                        <p>Digite abaixo sua denúncia: </p>
                    </AlertDialogHeader>
                    <AlertDialogBody className={styles.alertDialogBody}>
                    <textarea
                                className={styles.commentTextarea}
                                name="alert-dialog-textarea"
                                id="alert-dialog-textarea"
                                cols={30}
                                rows={10}
                                value={text}
                                onChange={e => setText(e.target.value)}
                            >
                            </textarea>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} className={styles.alertDialogCancelButton}>
                            Cancelar
                        </Button>
                        <Button
                            colorScheme={"blue"}
                            onClick={handleOnClickPositiveButton}
                            ml={3}
                        >
                            DENUNCIAR
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}