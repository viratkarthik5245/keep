import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Popover,
  Box,
  Input,
  MenuItem,
  Menu,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  PaletteOutlined as Palette,
  PhotoCameraOutlined as PhotoCamera,
  MoreHoriz as MoreIcon,
  Star as FavoriteFilled,
  StarBorder as FavoriteOutlined,
  AlarmOutlined as Alarm,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { DataContext } from "../../context/DataProvider";

const StyledCard = styled(Card)`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 240px;
  margin: 8px;
  box-shadow: none;
`;

const ColorPalette = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 5px;
`;

const colorOptions = [
  "#ffffff",
  "#f8d7da",
  "#f5c6cb",
  "#f1b0b7",
  "#e8aeb1",
  "#e2e3e5",
  "#d6d8d9",
  "#cce5ff",
  "#b8daff",
  "#99ccff",
  "#c3e6cb",
  "#a8d08c",
  "#8fd14f",
  "#6c757d",
  "#343a40",
];

const Note = ({ note }) => {
  const [colorScheme, setColorScheme] = useState(note.color || "#ffffff");
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const [image, setImage] = useState(note.image || "");
  const [selectedDate, setSelectedDate] = useState(note.date || "");
  const [favorite, setFavorite] = useState(note.favorite || false);
  const [labels, setLabels] = useState(note.labels || []);

  const { notes, setNotes, setArchiveNotes, setDeleteNotes } = useContext(
    DataContext
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (color) => {
    setColorScheme(color);
    // Update the note's color scheme
    const updatedNotes = notes.map((n) =>
      n.id === note.id ? { ...n, color: color } : n
    );
    setNotes(updatedNotes);
    handleClose();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        // Update the note's image state
        const updatedNotes = notes.map((n) =>
          n.id === note.id ? { ...n, image: reader.result } : n
        );
        setNotes(updatedNotes);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMoreMenuOpen = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreAnchorEl(null);
  };

  const handleFavorite = () => {
    const updatedFavoriteStatus = !favorite;
    setFavorite(updatedFavoriteStatus);

    // Update the note's favorite status
    const updatedNotes = notes.map((n) =>
      n.id === note.id
        ? {
            ...n,
            favorite: updatedFavoriteStatus,
            labels: Array.isArray(n.labels)
              ? [...n.labels, "Favorite"]
              : ["Favorite"],
          }
        : n
    );
    setNotes(updatedNotes);

    handleMoreMenuClose();
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);

    // Update the note's date
    const updatedNotes = notes.map((n) =>
      n.id === note.id
        ? { ...n, date: newDate, labels: [...n.labels, `Reminder: ${newDate}`] }
        : n
    );
    setNotes(updatedNotes);
  };

  const handleLabelClick = (label) => {
    // Toggle the label in the note's labels
    const updatedLabels = labels.includes(label)
      ? labels.filter((l) => l !== label)
      : [...labels, label];
    setLabels(updatedLabels);

    // Update the note's labels
    const updatedNotes = notes.map((n) =>
      n.id === note.id ? { ...n, labels: updatedLabels } : n
    );
    setNotes(updatedNotes);
  };

  const open = Boolean(anchorEl);
  const moreOpen = Boolean(moreAnchorEl);

  const archiveNote = (currentNote) => {
    const updatedNotes = notes.filter((data) => data.id !== currentNote.id);
    setNotes(updatedNotes);
    setArchiveNotes((prevArr) => [currentNote, ...prevArr]);
  };

  const deleteNote = (currentNote) => {
    const updatedNotes = notes.filter((data) => data.id !== currentNote.id);
    setNotes(updatedNotes);
    setDeleteNotes((prevArr) => [
      { ...currentNote, deletedDate: new Date().toISOString() },
      ...prevArr,
    ]);
  };

  return (
    <>
      <StyledCard
        style={{
          backgroundColor: colorScheme,
        }}
      >
        <CardContent>
          <Typography variant="h6">{note.heading}</Typography>
          <Typography variant="body2">{note.text}</Typography>
          {image && (
            <img
              src={image}
              alt="Note"
              style={{ width: "100%", borderRadius: "4px" }}
            />
          )}
          {favorite && <Chip label="Favorite" color="primary" />}
          {selectedDate && (
            <Chip
              label={`Reminder: ${selectedDate}`}
              color="secondary"
              icon={<Alarm />}
            />
          )}
          {Array.isArray(labels) &&
            labels.map((label) => (
              <Chip
                key={label}
                label={label}
                onClick={() => handleLabelClick(label)}
              />
            ))}
        </CardContent>
        <CardActions>
          <Tooltip title="Add Image">
            <IconButton>
              <label htmlFor="photo-upload">
                <PhotoCamera />
              </label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change Color">
            <IconButton onClick={handleClick}>
              <Palette />
            </IconButton>
          </Tooltip>
          <Tooltip title="Archive">
            <IconButton onClick={() => archiveNote(note)}>
              <Archive />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => deleteNote(note)}>
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="More Options">
            <IconButton onClick={handleMoreMenuOpen}>
              <MoreIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </StyledCard>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ColorPalette>
          {colorOptions.map((color) => (
            <Box
              key={color}
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: color,
                cursor: "pointer",
                border: color === colorScheme ? "2px solid black" : "none",
              }}
              onClick={() => handleColorSelect(color)}
            />
          ))}
        </ColorPalette>
      </Popover>
      <Menu
        anchorEl={moreAnchorEl}
        open={moreOpen}
        onClose={handleMoreMenuClose}
      >
        <MenuItem onClick={handleFavorite}>
          {favorite ? <FavoriteFilled /> : <FavoriteOutlined />} Favorite
        </MenuItem>
        <MenuItem>
          <Box>
            <Typography variant="subtitle2">Set Date</Typography>
            <Input
              type="date"
              value={selectedDate || ""}
              onChange={handleDateChange}
            />
          </Box>
        </MenuItem>
        <MenuItem>
          <Box>
            <Typography variant="subtitle2">Labels</Typography>
            <div>
              {["Work", "Personal", "Important"].map((label) => (
                <Chip
                  key={label}
                  label={label}
                  clickable
                  onClick={() => handleLabelClick(label)}
                />
              ))}
            </div>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Note;
