import { useContext } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataContext } from "../../context/DataProvider";
import DeleteNote from "./DeleteNote";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const DeleteNotes = () => {
  const { deleteNotes, setDeleteNotes } = useContext(DataContext);

  // Helper function to filter notes older than 30 days
  const getNotesOlderThan30Days = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return deleteNotes.filter(
      (note) => new Date(note.deletedAt) < thirtyDaysAgo
    );
  };

  // Function to permanently delete notes older than 30 days
  const handlePermanentDelete = () => {
    const notesToDelete = getNotesOlderThan30Days();
    const updatedNotes = deleteNotes.filter(
      (note) => !notesToDelete.includes(note)
    );
    setDeleteNotes(updatedNotes);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <DrawerHeader />
      <Box sx={{ p: 3, width: "100%" }}>
        {deleteNotes.length > 0 ? (
          <>
            <Grid container spacing={2}>
              {deleteNotes.map((note) => (
                <Grid item key={note.id}>
                  <DeleteNote deleteNote={note} />
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={handlePermanentDelete}
            >
              Permanently Delete Notes Older Than 30 Days
            </Button>
          </>
        ) : (
          <Typography>No deleted notes</Typography>
        )}
      </Box>
    </Box>
  );
};

export default DeleteNotes;
