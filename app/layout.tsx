"use client";

import "./globals.css";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography variant="h6" component="div">
              Admission System
            </Typography>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          {children}
        </Container>
      </body>
    </html>
  );
}