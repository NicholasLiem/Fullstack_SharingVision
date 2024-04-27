import { Alert, AlertColor, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import { Post, PostStatus, updatePost } from "../../api/postApi";
import { useState } from "react";

interface EditModalProps {
    open: boolean;
    handleClose: () => void;
    post: Post | null;
}

interface FormData {
    title: string;
    content: string;
    category: string;
    status: string;
}

type Severity = AlertColor | 'success' | 'error' | 'info' | 'warning';

const EditModal = ({ open, handleClose, post }: EditModalProps) => {
    const initialFormData: FormData = {
        title: post ? post.title : '',
        content: post ? post.content : '',
        category: post ? post.category : '',
        status: post ? post.status : ''
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async (status: string) => {
        if (!post) return;

        if (!(formData.title.length >= 20)) {
            handleOpenSnackbar('Title must have minimum of 20 characters', 'error');
            return;
        }

        if (!(formData.content.length >= 200)) {
            handleOpenSnackbar('Content must have minimum of 200 characters', 'error');
            return;
        }
    
        if (!(formData.category.length >= 3)) {
            handleOpenSnackbar('Category must have minimum of 3 character', 'error');
            return;
        }

        const updatedPost: Post = {
            ...post,
            title: formData.title,
            content: formData.content,
            category: formData.category,
            status: status as PostStatus,
        };

        await updatePost(post.id, updatedPost);
        handleOpenSnackbar('Success updated a post', 'success')
        handleClose();
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleOpenSnackbar = (message: string, severity: Severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    return (
        <>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label={post ? '' : 'Title'}
                        placeholder={post ? post.title : ''}
                        type="text"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="content"
                        name="content"
                        label={post ? '' : 'Content'}
                        placeholder={post ? post.content : ''}
                        type="text"
                        fullWidth
                        value={formData.content}
                        onChange={handleChange}
                        multiline
                        rows={4}
                    />
                    <TextField
                        margin="dense"
                        id="category"
                        name="category"
                        label={post ? '' : 'Category'}
                        placeholder={post ? post.category : ''}
                        type="text"
                        fullWidth
                        value={formData.category}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave('publish')} color="primary">
                        Publish
                    </Button>
                    <Button onClick={() => handleSave('draft')} color="primary">
                        Draft
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditModal;
