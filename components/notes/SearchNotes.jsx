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
import { DataContext } from "../context/DataProvider"; // Adjust the path if needed
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
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CenteredBox = styled(Box)`
  position: absolute;
  top: 70px; /* Adjust this based on your header height */
  left: 0;
  right: 0;
  background: #fff;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1200;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  max-width: 600px; /* Max width of the search bar */
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
          <IconButton onClick={toggleSearch} sx={{ ml: 2 }}>
            <SearchIcon />
          </IconButton>
          {searchOpen && (
            <CenteredBox>
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
              {filteredNotes.length > 0 ? (
                <Grid container spacing={2} mt={2}>
                  {filteredNotes.map((note) => (
                    <Grid item key={note.id}>
                      <Note note={note} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box mt={2}>No notes found</Box>
              )}
            </CenteredBox>
          )}
        </SearchContainer>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
