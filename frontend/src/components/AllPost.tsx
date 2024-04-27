import { useEffect, useState } from 'react';
import { Tab, Tabs, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost, getAllPost, Post, PostStatus } from '../api/postApi';

const AllPosts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PostStatus>(PostStatus.PUBLISH);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPost();
      setPosts(data);
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
    const deleteData = async () => {
      await deletePost(postId);
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
    };
    deleteData();
  };

  const filteredPosts = posts.filter(post => post.status === activeTab);

  return (
    <div style={{ position: 'relative', height: '80vh' }}>
      <Tabs value={activeTab} 
            onChange={handleChange}
            style={{ top: 0, left: 0 }}
      >
        <Tab label="Published" value={PostStatus.PUBLISH} />
        <Tab label="Drafts" value={PostStatus.DRAFT} />
        <Tab label="Trashed" value={PostStatus.THRASH} />
      </Tabs>
      <div style={{ width: '60vw'}}>
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
      </div>
    </div>
  );  
}


export default AllPosts;
