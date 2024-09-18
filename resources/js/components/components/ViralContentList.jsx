import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Button, Box, Typography, Link, TextField } from '@mui/material';

const ViralContentList = () => {
  const [viralContent, setViralContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', url: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/viral-content');
        setViralContent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/viral-content/${id}`);
      setViralContent(viralContent.filter(content => content._id !== id));
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content._id);
    setEditData({
      title: content.title,
      description: content.description,
      url: content.url,
    });
  };

  const handleEditSubmit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/viral-content/${id}`, editData);
      setViralContent(viralContent.map(content => content._id === id ? response.data : content));
      setEditingContent(null);
    } catch (error) {
      console.error('Error editing content:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Viral Content
      </Typography>
      <List>
        {viralContent.map(content => (
          <ListItem key={content._id} sx={{ mb: 2 }}>
            {editingContent === content._id ? (
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Title"
                  variant="outlined"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                />
                <TextField
                  label="URL"
                  variant="outlined"
                  value={editData.url}
                  onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                />
                <Button variant="contained" onClick={() => handleEditSubmit(content._id)}>Save</Button>
                <Button variant="outlined" onClick={() => setEditingContent(null)}>Cancel</Button>
              </Box>
            ) : (
              <>
                <ListItemText
                  primary={content.title}
                  secondary={
                    <>
                      <Typography variant="body2">{content.description}</Typography>
                      <Link href={content.url} target="_blank" rel="noopener">
                        View Content
                      </Link>
                    </>
                  }
                />
                <Button variant="contained" color="primary" onClick={() => handleEdit(content)}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(content._id)}>Delete</Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ViralContentList;
