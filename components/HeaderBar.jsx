import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { Menu, Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { DataContext } from "../context/DataProvider";
import Note from "./notes/Note"; // Adjust the path if needed

const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Heading = styled(Typography)`
  color: #5f6368;
  font-size: 24px;
  margin-left: 25px;
`;

const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 20px; /* Space between heading and search bar */
  position: relative;
  max-width: 600px; /* Max width of the search bar container */
  flex-shrink: 0; /* Prevent from shrinking */
`;

const SearchResultsContainer = styled(Box)`
  position: absolute;
  top: 70px; /* Adjust this based on your header height */
  left: 0;
  right: 0;
  background: #fff;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1200;
  max-height: 400px; /* Adjust based on your needs */
  overflow-y: auto;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  background-color: #fff;
  border-radius: 24px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  & .MuiInputBase-root {
    padding: 0 16px;
  }

  & .MuiInputBase-input {
    padding: 16px 0;
  }
`;

const HeaderBar = ({ open, handleDrawer }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { notes } = useContext(DataContext);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchQuery(""); // Clear the search query when opening the search bar
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const logo =
    "https://seeklogo.com/images/G/google-keep-logo-0BC92EBBBD-seeklogo.com.png";

  return (
    <Header>
      <Toolbar>
        <IconButton
          onClick={handleDrawer}
          sx={{ marginRight: "20px" }}
          edge="start"
        >
          <Menu />
        </IconButton>
        <img src={logo} alt="logo" style={{ width: 30 }} />
        <Heading>Keep</Heading>
        <SearchContainer>
          {searchOpen ? (
            <>
              <StyledTextField
                placeholder="Search notes..."
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
              <SearchResultsContainer>
                {searchQuery ? (
                  filteredNotes.length > 0 ? (
                    <Grid container spacing={2}>
                      {filteredNotes.map((note) => (
                        <Grid item key={note.id}>
                          <Note note={note} />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Box>No notes found</Box>
                  )
                ) : null}
              </SearchResultsContainer>
            </>
          ) : (
            <IconButton onClick={toggleSearch} sx={{ ml: 2 }}>
              <SearchIcon />
            </IconButton>
          )}
        </SearchContainer>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
