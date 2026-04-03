"use client";

import {
  TextField,
  Button,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation"; 


export default function ApplicantPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [entryType, setEntryType] = useState("");
  const [quotaType, setQuotaType] = useState("");
  const [marks, setMarks] = useState("");
  const [documentsStatus, setDocumentsStatus] = useState("");
 const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error"
  });

  const createApplicant = async () => {
    // ✅ Validation
  if (!name || !marks || !category || !entryType || !quotaType || !documentsStatus) {
  setSnackbar({
    open: true,
    message: "Please fill all fields",
    severity: "error"
  });
  return;
}

    setLoading(true);

    try {
      const res = await fetch("/api/applicant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          category,
          entryType,
          quotaType,
          marks,
          documentsStatus
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
          message: "Applicant created successfully ✅",
          severity: "success"
        });

        // Reset form
        setName("");
        setMarks("");
        setCategory("");
        setEntryType("");
        setQuotaType("");
        setDocumentsStatus("");
      }
    } catch {
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
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h5" textAlign="center">
              Create Applicant
            </Typography>

            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Marks"
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="GM">GM</MenuItem>
                <MenuItem value="SC">SC</MenuItem>
                <MenuItem value="ST">ST</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Entry Type</InputLabel>
              <Select
                value={entryType}
                label="Entry Type"
                onChange={(e) => setEntryType(e.target.value)}
              >
                <MenuItem value="">Select Entry Type</MenuItem>
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Lateral">Lateral</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Quota</InputLabel>
              <Select
                value={quotaType}
                label="Quota"
                onChange={(e) => setQuotaType(e.target.value)}
              >
                <MenuItem value="">Select Quota</MenuItem>
                <MenuItem value="KCET">KCET</MenuItem>
                <MenuItem value="COMEDK">COMEDK</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Document Status</InputLabel>
              <Select
                value={documentsStatus}
                label="Document Status"
                onChange={(e) => setDocumentsStatus(e.target.value)}
              >
                 <MenuItem value="">Select Document Status</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Submitted">Submitted</MenuItem>
                <MenuItem value="Verified">Verified</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              onClick={createApplicant}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Applicant"
              )}
            </Button>

             <Button onClick={() => router.push("/")}>
                    Back
                  </Button>
          </Stack>
        </CardContent>
      </Card>



      {/* ✅ CENTER SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: 6 }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}