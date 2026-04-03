"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Box,
  LinearProgress,
  Chip,
  Button
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
   const router = useRouter();

  useEffect(() => {
    fetch("/api/program").then(res => res.json()).then(setPrograms);
    fetch("/api/admission").then(res => res.json()).then(setAdmissions);
    fetch("/api/applicant").then(res => res.json()).then(setApplicants);
  }, []);

  const pendingDocs = applicants.filter(a => a.documentsStatus !== "Verified");
  const feePending = admissions.filter(a => a.feeStatus !== "Paid");
  const totalIntake = programs.reduce((sum, p) => sum + p.intake, 0);

  const stats = [
    { label: "Total Admissions", value: admissions.length, color: "#1976d2" },
    { label: "Pending Documents", value: pendingDocs.length, color: "#f57c00" },
    { label: "Fee Pending", value: feePending.length, color: "#d32f2f" },
    { label: "Total Intake", value: totalIntake, color: "#388e3c" }
  ];

  return (
    <Stack spacing={4} sx={{ mt: 4, px: 3 }}>
      {/* Title */}
      <Typography variant="h4" textAlign="center" fontWeight="bold">
        Dashboard
      </Typography>


      <Button
        onClick={() => router.push("/")}
        sx={{
          mt: 1,
          backgroundColor: "#1976d2",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1565c0"
          }
        }}
      >
        Back
      </Button>
      {/* Stats Cards */}
      <Grid container spacing={2}>
        {stats.map((item, index) => (
          <Grid key={index} size={{ xs: 12, md: 3 }}>
            <Card
              sx={{
                backgroundColor: item.color,
                color: "#fff",
                borderRadius: 3,
                boxShadow: 3
              }}
            >
              <CardContent>
                <Typography variant="subtitle2">{item.label}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Section Title */}
      <Typography variant="h6" fontWeight="bold">
        Program Overview
      </Typography>

      {/* Program Cards */}
     <Grid container spacing={3}>
  {programs.map((p) => (
    <Grid key={p._id} size={{ xs: 12, md: 4 }}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 4,
          p: 1,
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: 8
          }
        }}
      >
        <CardContent>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="h6" fontWeight="bold">
              {p.name}
            </Typography>

            <Chip label={`Intake ${p.intake}`} color="primary" size="small" />
          </Stack>

          {/* Quotas */}
          <Stack spacing={2}>
            {p.quotas.map((q: any, i: number) => {
              const percent = (q.filled / q.seats) * 100;
              const remaining = q.seats - q.filled;

              return (
                <Box key={i}>
                  {/* Top Row */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontWeight="500">{q.type}</Typography>

                    <Typography fontSize={14}>
                      <span style={{ color: "#1976d2" }}>
                        {q.filled}/{q.seats}
                      </span>{" "}
                      •{" "}
                      <span style={{ color: "#2e7d32" }}>
                        {remaining} left
                      </span>
                    </Typography>
                  </Stack>

                  {/* Progress Bar */}
                  <LinearProgress
                    variant="determinate"
                    value={percent}
                    sx={{
                      height: 6,
                      borderRadius: 5,
                      mt: 0.5,
                      backgroundColor: "#eee"
                    }}
                  />
                </Box>
              );
            })}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
    </Stack>
  );
}