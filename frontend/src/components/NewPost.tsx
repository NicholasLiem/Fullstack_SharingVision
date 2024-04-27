import { useState } from "react";
import { createPost, PostStatus } from "../api/postApi";
import { Alert, AlertColor, Box, Button, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { PostCreateDTO } from "../dto/post";

interface FormData {
    title: string;
    content: string;
    category: string;
    status: string;
}

type Severity = AlertColor | 'success' | 'error' | 'info' | 'warning';

const NewPost: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        category: '',
        status: ''
    });

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleOpenSnackbar = (message: string, severity: Severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof formData;
        const value = event.target.value as string;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = async (status: PostStatus) => {
        const postData: PostCreateDTO = {
          ...formData,
          status: status
        };

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
    
        try {
          await createPost(postData);
          handleOpenSnackbar('Success created a post', 'success')
          setFormData({ title: '', content: '', category: '', status: '' });
        } catch (error) {
            handleOpenSnackbar('Fail when creating a post', 'error');
        }
      };

    return (
        <>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Box sx={{ flexGrow: 1, maxWidth: 600, margin: 'auto', mt: 4 }}>
                <Typography variant="h4" gutterBottom color={"black"}>
                    Add New Post
                </Typography>
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                        <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                variant="outlined"
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Content"
                                name="content"
                                multiline
                                rows={4}
                                value={formData.content}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            multiline
                            rows={4}
                            value={formData.category}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        </Grid>
                            <Grid item xs={12}>
                            <Button
                                sx={{ marginRight: 1 }}
                                variant="contained"
                                color="primary"
                                onClick={() => handleSubmit(PostStatus.PUBLISH)}
                                >
                                Publish
                            </Button>
                                <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleSubmit(PostStatus.DRAFT)}
                                >
                                Draft
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    );
};

export default NewPost
