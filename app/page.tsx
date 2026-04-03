"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  Stack,
  Box
} from "@mui/material";
import Link from "next/link";

export default function Home() {
  const [role, setRole] = useState("Admin");

  const pagesByRole: any = {
    Admin: [{ title: "Program Setup", path: "/program" }],
    "Admission Officer": [
      { title: "Applicant", path: "/applicant" },
      { title: "Allocate Seat", path: "/allocation" },
        { title: "Admission", path: "/admission" },
    ],
    Management: [{ title: "Dashboard", path: "/dashboard" }]
  };

  return (
    <Stack alignItems="center" sx={{ mt: 6 }}>
      <Card sx={{ width: 500, p: 3, borderRadius: 4, boxShadow: 4 }}>
        <CardContent>
          <Stack spacing={3}>
            {/* Title */}
            <Typography variant="h4" textAlign="center" fontWeight="bold">
              Admission System
            </Typography>

            {/* Role Selector */}
            {/* Role Selector Card */}
                        
                      
                <Stack spacing={2}>
                  <Typography variant="subtitle2" fontWeight="500">
                    <strong> Select Role</strong>
                  </Typography>

                  <Select
                    fullWidth
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#fafafa",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ddd"
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2"
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#02d50c"
                      }
                    }}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Admission Officer">
                      Admission Officer
                    </MenuItem>
                    <MenuItem value="Management">Management</MenuItem>
                  </Select>
                </Stack>
             

            {/* Current Role */}
      
                <Typography textAlign="center" color="text.secondary">
                  Current Role: <strong>{role}</strong>
                </Typography>
             

            {/* Navigation Cards */}
            <Grid container spacing={2}>
              {pagesByRole[role].map((p: any) => (
                <Grid key={p.title} size={{ xs: 12 }}>
                  <Link href={p.path} style={{ textDecoration: "none" }}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        borderRadius: 3,
                        textAlign: "center",
                        transition: "0.3s",
                        border: "1px solid #02d50c",
                        "&:hover": {
                          backgroundColor: "#1976d2",
                          color: "#ffffff",
                          transform: "scale(1.02)",
                          borderColor: "#1976d2"
                        }
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">
                          {p.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}