import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";

const ViralContentForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!title.trim()) {
      tempErrors.title = "Title is required";
      isValid = false;
    }

    if (!description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(url)) {
      tempErrors.url = "Please enter a valid URL";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          "http://localhost:4000/api/viral-content",
          {
            title,
            description,
            url,
          },
          { headers: { "x-auth-token": token } }
        );
        setMessage("Content added successfully!");
        setTitle("");
        setDescription("");
        setUrl("");
        setErrors({});
      } catch (error) {
        setMessage("Error adding content. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Add Viral Content
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={Boolean(errors.title)}
        helperText={errors.title}
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={Boolean(errors.description)}
        helperText={errors.description}
        required
      />
      <TextField
        label="URL"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        error={Boolean(errors.url)}
        helperText={errors.url}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      {message && <Typography color="secondary">{message}</Typography>}
    </Box>
  );
};

export default ViralContentForm;
