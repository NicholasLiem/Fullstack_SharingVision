import { useEffect, useState } from "react";
import { getPagedPost, Post } from "../api/postApi";
import { Container, Grid, Pagination, Paper, Typography } from "@mui/material";

const Preview: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const itemsPerPage = 4;

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPagedPost(itemsPerPage, itemsPerPage * (page - 1));
                setPosts(data.posts);
                setTotalPages(data.totalPages); 
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, [page]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom color={"black"}>
                Posts Preview
            </Typography>
            {posts.length === 0 ? (
                <Typography>No articles available.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {posts.map((post) => (
                        <Grid item xs={12}>
                            <Paper elevation={2} style={{ padding: '20px' }}>
                                <Typography variant="h6">{post.title}</Typography>
                                <Typography>{post.content}</Typography>
                                <Typography variant="body2">Category: {post.category}</Typography>
                                <Typography variant="body2">Status: {post.status}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </Container>
    );    
}

export default Preview
