import { useEffect, useState } from 'react';
import { Tab, Tabs, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPagedPost, Post, PostStatus } from '../api/postApi';

const AllPosts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PostStatus>(PostStatus.PUBLISH);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const data = await getPagedPost(0, 100);
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

  const handleEdit = (lala: string) => {
    console.log("Editing:", lala);
  };

  const handleTrash = (postId: number) => {
    console.log(postId)
  };

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
          {posts.map((post: Post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.category}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit("lol")}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleTrash(post.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}


export default AllPosts;
