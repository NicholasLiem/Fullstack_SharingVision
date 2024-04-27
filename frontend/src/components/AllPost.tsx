import { useEffect, useState } from 'react';
import { Tab, Tabs, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllPost, Post, PostStatus } from '../api/postApi';

const AllPosts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PostStatus>(PostStatus.PUBLISH);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const data = await getAllPost();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };
    fetchPosts();
  }, []);

  const handleChange = (_event: React.ChangeEvent<unknown>, newValue: PostStatus) => {
    setActiveTab(newValue);
  };

  const handleEdit = (postId: number) => {
    console.log("Editing:", postId);
  };

  const handleTrash = (postId: number) => {
    console.log(postId)
  };

  const filteredPosts = posts.filter(post => post.status === activeTab);

  return (
    <>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab label="Published" value={PostStatus.PUBLISH} />
        <Tab label="Drafts" value={PostStatus.DRAFT} />
        <Tab label="Trashed" value={PostStatus.THRASH} />
      </Tabs>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post: Post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(post.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleTrash(post.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No posts available.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );  
}


export default AllPosts;
