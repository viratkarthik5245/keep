import React, { useState, useRef, useContext } from "react";
import { Box, TextField, Button, ClickAwayListener } from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";
import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  border-color: #e0e0e0;
  width: 600px;
  border-radius: 8px;
  min-height: 30px;
  padding: 10px 15px;
  position: relative; /* Ensure the container is positioned */
`;

const SaveButton = styled(Button)`
  position: absolute;
  bottom: 10px; /* Adjust bottom position */
  right: 10px; /* Adjust right position */
  margin: 0;
`;

const note = {
  id: "",
  heading: "",
  text: "",
};

const Form = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [addNote, setAddNote] = useState({ ...note, id: uuid() });
  const { setNotes } = useContext(DataContext);
  const containerRef = useRef();

  const handleClickAway = () => {
    if (addNote.heading || addNote.text) {
      saveNote();
    } else {
      setShowTextField(false);
      containerRef.current.style.minHeight = "30px";
      setAddNote({ ...note, id: uuid() });
    }
  };

  const onTextAreaClick = () => {
    setShowTextField(true);
    containerRef.current.style.minHeight = "70px";
  };

  const onTextChange = (e) => {
    let changedNote = { ...addNote, [e.target.name]: e.target.value };
    setAddNote(changedNote);
  };

  const saveNote = () => {
    setNotes((prevArr) => [addNote, ...prevArr]);
    setShowTextField(false);
    containerRef.current.style.minHeight = "30px";
    setAddNote({ ...note, id: uuid() });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents new line creation
      saveNote();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container ref={containerRef}>
        {showTextField && (
          <TextField
            placeholder="Title"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            style={{ marginBottom: 10 }}
            onChange={onTextChange}
            name="heading"
            value={addNote.heading}
          />
        )}
        <TextField
          placeholder="Take a note..."
          multiline
          maxRows={Infinity}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onClick={onTextAreaClick}
          onChange={onTextChange}
          name="text"
          value={addNote.text}
          onKeyDown={handleKeyDown} // Detect Enter key press
        />
        {showTextField && (
          <SaveButton variant="contained" color="primary" onClick={saveNote}>
            close
          </SaveButton>
        )}
      </Container>
    </ClickAwayListener>
  );
};

export default Form;
