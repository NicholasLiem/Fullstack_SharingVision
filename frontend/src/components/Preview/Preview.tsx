import { useEffect, useState } from "react";
import { getPagedPost, Post } from "../../api/postApi";
import { Container, Grid, MenuItem, Pagination, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";

const Preview: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPagedPost(pageSize, pageSize * (page - 1));
                setPosts(data.posts);
                setTotalPages(data.totalPages); 
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, [page, pageSize]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom color={"black"}>
                Posts Preview
            </Typography>

            <Typography variant="body1" gutterBottom>
                Items per page:
                <Select
                value={pageSize}
                onChange={(event: SelectChangeEvent<number>) => {
                    const newSize = parseInt(event.target.value as string, 10);
                    setPageSize(newSize);
                    setPage(1);
                }}
                style={{ marginRight: '10px', marginLeft: '5px' }}
                >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                </Select>
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
