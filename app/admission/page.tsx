"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Button,
    Chip,
    Snackbar,
    Alert
} from "@mui/material";
import { useRouter } from "next/navigation";


export default function AdmissionPage() {
    const [admissions, setAdmissions] = useState<any[]>([]);

       const router = useRouter();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error"
    });

    const fetchAdmissions = async () => {
        const res = await fetch("/api/admission");
        const data = await res.json();
        setAdmissions(data);
    };

    useEffect(() => {
        fetchAdmissions();
    }, []);

    // ✅ Mark Fee Paid
    const markFeePaid = async (id: string) => {
        await fetch("/api/admission/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
           body: JSON.stringify({ admissionId: id })
        });

        setSnackbar({
            open: true,
            message: "Fee marked as Paid",
            severity: "success"
        });

        fetchAdmissions();
    };

    // ✅ Confirm Admission
    const confirmAdmission = async (id: string) => {
        const res = await fetch("/api/admission/confirm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ admissionId: id })
        });

        const data = await res.json();

        if (data.error) {
            setSnackbar({
                open: true,
                message: data.error,
                severity: "error"
            });
        } else {
            setSnackbar({
                open: true,
                message: "Admission Confirmed 🎉",
                severity: "success"
            });
        }

        fetchAdmissions();
    };

    return (
        <Stack alignItems="center" sx={{ mt: 5 }}>
            <Stack spacing={3} sx={{ width: 600 }}>
                <Typography variant="h5" textAlign="center">
                    Admissions
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

                {admissions.map((a) => (
                    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                        <CardContent>
                            <Stack spacing={2}>
                                {/* Header */}
                                <Typography variant="h6" fontWeight="bold">
                                    Admission Details
                                </Typography>

                                {/* Info */}
                                <Stack spacing={1}>
                                    <Typography>
                                        <strong>Applicant ID:</strong>{" "}
                                        <span style={{ color: "#1976d2" }}>
                                            {a.applicantId.slice(-6)}
                                        </span>
                                    </Typography>

                                    <Typography>
                                        <strong>Quota:</strong> {a.quotaType}
                                    </Typography>

                                    {/* Fee Status */}
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography><strong>Fee:</strong></Typography>
                                        <Chip
                                            label={a.feeStatus}
                                            color={a.feeStatus === "Paid" ? "success" : "warning"}
                                            size="small"
                                        />
                                    </Stack>

                                    {/* Status */}
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography><strong>Status:</strong></Typography>
                                        <Chip
                                            label={a.status || "Allocated"}
                                            color={a.status === "Confirmed" ? "success" : "default"}
                                            size="small"
                                        />
                                    </Stack>

                                    {/* Admission Number */}
                                    {a.admissionNumber && (
                                        <Typography sx={{ mt: 1 }}>
                                            <strong>Admission No:</strong>{" "}
                                            <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
                                                {a.admissionNumber}
                                            </span>
                                        </Typography>
                                    )}
                                </Stack>

                                {/* Actions */}
                                <Stack direction="row" spacing={2} justifyContent="flex-end">
                                    {a.feeStatus !== "Paid" && (
                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            onClick={() => markFeePaid(a._id)}
                                        >
                                            Mark Fee Paid
                                        </Button>
                                    )}

                                  {a.feeStatus === "Paid" && !a.admissionNumber && (
                                        <Button
                                            variant="contained"
                                            onClick={() => confirmAdmission(a._id)}
                                        >
                                            Confirm
                                        </Button>
                                    )}
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            {/* Snackbar */}
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