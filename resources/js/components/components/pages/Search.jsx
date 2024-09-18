import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import MediaDisplays from "./MediaDisplays";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [userData, setData] = useState([]);
  const [datasetId, setDatasetId] = useState('');
  const [runId, setRunId] = useState();
  const [runStatus, setRunStatus] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const TERMINAL_STATES = ['SUCCEEDED', 'FAILED', 'TIMED-OUT',	'ABORTED']

  const handleSubmitSearch = async () => {
    try {
      if (query.trim()) {
        setSearching(true);
        console.log("Search query:", query);
      }
      setData([]);
      const response = await axios.post(
        "apify/run-actor",
        {
          username: query
        }
      );
      if (response.status === 200) {
        setRunId(response?.data?.data.id)
        setDatasetId(response?.data?.data.defaultDatasetId)
        // setSearching(false);
        // await checkRunStatus(response?.data?.data.id);
      }
      console.log('RESPONSE: ', response);
    } catch (error) {

    }
  };

  const fetchDataset = async () => {
    console.log('fetchDatasetfetchDataset');
    try {
      const response = await axios.get(`apify/dataset/${datasetId}`);
      if (response.status === 200) {
        setData(response.data);
        checkRunStatus()
      }
    } catch (error) {
      console.error('API call failed', error);
    } finally {
    }
  };

  const checkRunStatus = async (id=null) => {
    try {
      const response = await axios.get(`apify/run-status/${id ?? runId}`);
      if (response.status === 200) {
        if(response?.data?.status == 'SUCCEEDED') {
          setSearching(false);
        }
        setRunStatus(response?.data?.status);
      }
    } catch (error) {
      console.error('API call failed', error);
    }
  };

  useEffect(() => {
    if(runId && !TERMINAL_STATES.includes(runStatus)) {
      const interval = setInterval(() => {
        console.log('STATE: ', runStatus);
        fetchDataset();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [runId, runStatus]);
  
  useEffect(() => {

  }, []);

  return (
    <Fragment>
      <Container
        maxWidth="xs"
        sx={{
          height: userData.length === 0 ? '60vh' : '30vh',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: (theme) => theme.palette.text.primary,
                textTransform: "uppercase",
              }}
            >
              Search User
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={searching}
              fullWidth
              variant="outlined"
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
              sx={{
                maxWidth: 600,
                margin: "auto",
                borderRadius: 2,
                boxShadow: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "& .MuiInputBase-input": {
                  padding: "10px 14px",
                },
                "& .MuiInputLabel-root": {
                  color: (theme) => theme.palette.text.secondary,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {searching ? (
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={60} />
                <Typography
                  variant="h6"
                  sx={{
                    // marginTop: 2,
                    fontWeight: 600,
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {`Searching for the user ${query} ...`}
                </Typography>
              </Box>
            ) : (
              <Collapse in={!!query.trim()} timeout={300}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    maxWidth: 600,
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 1,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    transition: "opacity 0.3s ease-in-out",
                    backgroundColor: "#333",
                  }}
                  onClick={handleSubmitSearch}
                >
                  Search
                </Button>
              </Collapse>
            )}
          </Grid>
        </Grid>
      </Container>
      {
        userData.length !== 0 && <MediaDisplays userData={userData}/>
      }
    </Fragment>
  );
};

export default Search;
