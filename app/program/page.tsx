"use client";

import {
  TextField,
  Button,
  Stack,
  Typography,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import router from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function ProgramPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error"
  });

  const createProgram = async () => {
    // ✅ Validation
    if (!name.trim()) {
      setSnackbar({
        open: true,
        message: "Program name is required",
        severity: "error"
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          intake: 100,
          quotas: [
            { type: "KCET", seats: 50 },
            { type: "COMEDK", seats: 30 },
            { type: "Management", seats: 20 }
          ]
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setSnackbar({
          open: true,
          message: data.error || "Something went wrong",
          severity: "error"
        });
      } else {
        setSnackbar({
          open: true,
          message: "Program created successfully ✅",
          severity: "success"
        });
        setName("");
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Server error",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }

    
  };

  return (
    <Stack alignItems="center" sx={{ mt: 5 }}>
      <Stack spacing={3} sx={{ width: 400 }}>
        <Typography variant="h5" textAlign="center">
          Create Program
        </Typography>

        <TextField
          label="Program Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={createProgram}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Create"}
        </Button>
      </Stack>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Button onClick={() => router.push("/")}>
        Back
      </Button>
    </Stack>
  );
}