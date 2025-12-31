  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success", // success | error
  });

    setSnack({
      open: true,
      message: "Exercise updated successfully",
      severity: "success",
    });

    setTimeout(() => {
      navigate("/specialist");
    }, 2000);



      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>