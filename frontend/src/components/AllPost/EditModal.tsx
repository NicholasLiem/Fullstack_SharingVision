import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
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

const EditModal = ({ open, handleClose, post }: EditModalProps) => {
    const initialFormData: FormData = {
        title: post ? post.title : '',
        content: post ? post.content : '',
        category: post ? post.category : '',
        status: post ? post.status : ''
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async (status: string) => {
        if (!post) return;

        const updatedPost: Post = {
            ...post,
            title: formData.title,
            content: formData.content,
            category: formData.category,
            status: status as PostStatus,
        };

        await updatePost(post.id, updatedPost);
        handleClose();
    };



    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    placeholder={post ? post.title : 'Title'}
                    type="text"
                    fullWidth
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="content"
                    name="content"
                    label="Content"
                    placeholder={post ? post.content : 'Content'}
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
                    label="Category"
                    placeholder={post ? post.category: 'Category'}
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
    );
}

export default EditModal;
