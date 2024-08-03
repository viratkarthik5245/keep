import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import Note from "./Note"; // Import the Note component
import { DataContext } from "../../context/DataProvider";

const LabelView = ({ label }) => {
  const { notes } = useContext(DataContext);

  // Filter notes by the specified label
  const filteredNotes = notes.filter((note) => note.labels.includes(label));

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: "16px" }}>
        Notes Tagged with "{label}"
      </Typography>
      <Grid container spacing={2}>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Note note={note} />
            </Grid>
          ))
        ) : (
          <Typography>No notes found with this label.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default LabelView;
