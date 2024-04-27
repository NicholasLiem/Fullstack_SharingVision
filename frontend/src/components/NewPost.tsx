import { useState } from "react";
import { createPost, PostStatus } from "../api/postApi";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PostCreateDTO } from "../dto/post";

interface FormData {
    title: string;
    content: string;
    category: string;
    status: string;
}

const NewPost: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        category: '',
        status: ''
    });

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
    
        try {
          await createPost(postData);
          alert(`Post ${status === PostStatus.PUBLISH ? 'published' : 'drafted'} successfully!`);
          setFormData({ title: '', content: '', category: '', status: '' });
        } catch (error) {
          alert('Failed to post data. Please try again.');
        }
      };

    return (
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
    );
};

export default NewPost
