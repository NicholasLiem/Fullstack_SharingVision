import { useEffect, useState } from 'react';
import { Tab, Tabs, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Snackbar, Alert, AlertColor } from '@mui/material';
import { getAllPost, Post, PostStatus, updatePost } from '../../api/postApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from './EditModal';

type Severity = AlertColor | 'success' | 'error' | 'info' | 'warning';

const AllPosts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PostStatus>(PostStatus.PUBLISH);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPost();
      setPosts(data);
    };
    fetchPosts();
  }, [editModalOpen]);

  const handleChange = (_event: React.ChangeEvent<unknown>, newValue: PostStatus) => {
    setActiveTab(newValue);
  };

  const handleEdit = (postId: number) => {
    const postToEdit = posts.find(post => post.id === postId);
    if (postToEdit) {
      setSelectedPost(postToEdit);
      setEditModalOpen(true);
    }
  };

  const handleTrash = (postId: number) => {
    const deleteData = async () => {
      const postToThrashed = posts.find(post => post.id === postId);
      if (postToThrashed) {
        postToThrashed.status = PostStatus.THRASH;
        await updatePost(postId, postToThrashed);
        handleOpenSnackbar('Success thrashed a post', 'success')
      }
    };
    deleteData();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = (message: string, severity: Severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const filteredPosts = posts.filter(post => post.status === activeTab);

  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
        </Alert>
      </Snackbar>
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
      <EditModal open={editModalOpen} 
                  handleClose={() => setEditModalOpen(false)} 
                  post={selectedPost} 
      />
    </div>
    </>
  );  
}


export default AllPosts;
