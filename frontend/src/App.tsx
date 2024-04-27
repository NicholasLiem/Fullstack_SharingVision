import { useState } from 'react';
import Preview from './components/Preview';
import AllPosts from './components/AllPost';
import NewPost from './components/NewPost';

function App() {
  const [activeComponent, setActiveComponent] = useState('preview');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'preview':
        return <Preview/>
      case 'allPosts':
        return <AllPosts/>
      case 'newPost':
        return <NewPost />
      default:
        return <Preview/>
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveComponent('preview')}>Preview</button>
        <button onClick={() => setActiveComponent('allPosts')}>All Posts</button>
        <button onClick={() => setActiveComponent('newPost')}>New Post</button>
      </div>
      <div style={{
        width: '80%',
        height: '80%',
        border: '1px solid gray',
        background: 'white',
        padding: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto'
      }}>
        <div style={{
          maxWidth: '100%',
          maxHeight: '80vh',
          transformOrigin: 'top left',
          transition: 'transform 0.3s ease-out',
          margin: '20px',
        }}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default App;
