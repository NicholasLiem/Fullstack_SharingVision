import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

function AllPosts() {
  const [activeTab, setActiveTab] = useState('published');

  const handleChange = (event: unknown, newValue: React.SetStateAction<string>) => {
    console.log(event)
    setActiveTab(newValue);
  };

  return (
    <Tabs value={activeTab} onChange={handleChange}>
      <Tab label="Published" value="published" />
      <Tab label="Drafts" value="drafts" />
      <Tab label="Trashed" value="trashed" />
    </Tabs>
  );
}

export default AllPosts
