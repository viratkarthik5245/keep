import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { Box, Grid } from "@mui/material";
import Note from "../notes/Note";

const TrashNotes = () => {
  const { deleteNotes } = useContext(DataContext);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const filteredNotes = deleteNotes.filter(
    (note) => new Date(note.deletedDate) > thirtyDaysAgo
  );

  return (
    <Box>
      <Grid container spacing={2}>
        {filteredNotes.map((note) => (
          <Grid item key={note.id}>
            <Note note={note} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrashNotes;
