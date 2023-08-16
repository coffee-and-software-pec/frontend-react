import { Menu, MenuButton, IconButton, MenuList, MenuItem, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ReviewDTO } from "../../services/dtos/ReviewDTO"
import ReviewDialog from "../ReviewDialog";
import styles from "./Review.module.css";

import { ReactComponent as MenuIcon } from '../../assets/menu_icon.svg';

interface ReviewProps {
    review: ReviewDTO;
    onDelete: (reviewId: string) => void;
    onEdit: (reviewId: string, reviewText: string) => void;
}

export function Review({
    review,
    onDelete,
    onEdit
}: ReviewProps) {
    const cancelRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [reviewDialogType, setReviewDialogType] = useState<'CREATE' | 'DELETE' | 'EDIT'>("CREATE");


    function onEditCommentButton() {
        setReviewDialogType("EDIT");
        onOpen();
    }

    function onDeleteCommentButton() {
        setReviewDialogType("DELETE");
        onOpen();
    }

    function handlePositiveButton(reviewText: string, highlightedText: string) {
        if (reviewDialogType === "EDIT") {
            onEdit(review.r_id ?? "", reviewText)
        } else if (reviewDialogType === "DELETE") {
            onDelete(review.r_id ?? "");
        }
    }

    return (
        <ChakraProvider>
            <div className={styles.reviewContainer}>
                <span>no trecho: {review.text}</span>
                <p><strong>{review.author?.u_name}</strong>: {review.comment}</p>
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
                <ReviewDialog
                    cancelRef={cancelRef}
                    handleAlertDialogPositiveButton={handlePositiveButton}
                    highlightedText={review.text}
                    isOpen={isOpen}
                    onClose={onClose}
                    reviewDialogType={reviewDialogType}
                    reviewText={review.comment}
                />
            </div>
        </ChakraProvider>
    )
}