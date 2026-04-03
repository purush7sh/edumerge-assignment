"use client";

import { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Button,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Card,
  CardContent
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";

export default function AllocationPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
  const router = useRouter();
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState("");
  const [quota, setQuota] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error"
  });

  useEffect(() => {
    fetch("/api/program").then(res => res.json()).then(setPrograms);
    fetch("/api/applicant").then(res => res.json()).then(setApplicants);
  }, []);

  const selectedProgramData = programs.find(
    (p) => p._id === selectedProgram
  );

  const selectedQuotaData = selectedProgramData?.quotas?.find(
    (q: any) => q.type === quota
  );

  const allocate = async () => {
    if (!selectedApplicant || !selectedProgram || !selectedQuotaData) {
      setSnackbar({
        open: true,
        message: "Please fill all the fields",
        severity: "error"
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admission/allocate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          applicantId: selectedApplicant,
          programId: selectedProgram,
          quotaType: quota
        })
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: "Server error" };
      }

      if (!res.ok || data.error) {
        setSnackbar({
          open: true,
          message: data.error || "Allocation failed",
          severity: "error"
        });
      } else {
        setSnackbar({
          open: true,
          message: "Seat Allocated Successfully ✅",
          severity: "success"
        });

        // optional reset
        setSelectedApplicant("");
        setSelectedProgram("");
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
    <Stack alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h5" textAlign="center">
              Allocate Seat
            </Typography>

            {/* Applicant */}
            <FormControl fullWidth>
              <InputLabel>Applicant</InputLabel>
              <Select
                value={selectedApplicant}
                label="Applicant"
                onChange={(e) => setSelectedApplicant(e.target.value)}
              >
                <MenuItem value="">Select Applicant</MenuItem>
                {applicants.map((a) => (
                  <MenuItem key={a._id} value={a._id}>
                    {a.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Program */}
            <FormControl fullWidth>
              <InputLabel>Program</InputLabel>
              <Select
                value={selectedProgram}
                label="Program"
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                <MenuItem value="">Select Program</MenuItem>
                {programs.map((p) => (
                  <MenuItem key={p._id} value={p._id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Quota */}
            <FormControl fullWidth>
              <InputLabel>Quota</InputLabel>
              <Select
                value={quota}
                label="Quota"
                onChange={(e) => setQuota(e.target.value)}
              >
                 <MenuItem value="">Select Quota</MenuItem>
                <MenuItem value="KCET">KCET</MenuItem>
                <MenuItem value="COMEDK">COMEDK</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
              </Select>
            </FormControl>

            {/* Remaining Seats */}
            {selectedQuotaData && (
              <Typography textAlign="center">
                Remaining Seats:{" "}
                <strong>
                  {selectedQuotaData.seats - selectedQuotaData.filled}
                </strong>
              </Typography>
            )}

            {/* Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={allocate}

            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Allocate Seat"
              )}
            </Button>

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

            <Button onClick={() => router.push("/")}>
              Back
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}