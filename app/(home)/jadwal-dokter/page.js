"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  Stack
} from "@mui/material";

const days = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];

export default function JadwalDokterTableMUI() {
  const [dokterList, setDokterList] = useState([]);
  const [selectedSpesialis, setSelectedSpesialis] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/jadwal-dokter");
      const data = await res.json();
      setDokterList(data);
    };
    fetchData();
  }, []);

  const uniqueLayanan = [...new Set(dokterList.map((d) => d.layanan))];
  const filtered = selectedSpesialis
    ? dokterList.filter((d) => d.layanan === selectedSpesialis)
    : dokterList;

  const grouped = filtered.reduce((acc, dokter) => {
    if (!acc[dokter.layanan]) acc[dokter.layanan] = [];
    acc[dokter.layanan].push(dokter);
    return acc;
  }, {});

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", my: 6 }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#234974", fontWeight: "bold" }}>
        Jadwal Praktek Dokter
      </Typography>

      {/* Filter Chips */}
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}>
        <Chip
          label="Semua Spesialis"
          clickable
          color={selectedSpesialis === "" ? "primary" : "default"}
          onClick={() => setSelectedSpesialis("")}
        />
        {uniqueLayanan.map((layanan) => (
          <Chip
            key={layanan}
            label={layanan}
            clickable
            color={selectedSpesialis === layanan ? "primary" : "default"}
            onClick={() =>
              setSelectedSpesialis(selectedSpesialis === layanan ? "" : layanan)
            }
          />
        ))}
      </Stack>

      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }} aria-label="jadwal dokter table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#234974" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>NAMA DOKTER</TableCell>
              {days.map((day) => (
                <TableCell
                  key={day}
                  sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase" }}
                  align="center"
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(grouped).map(([layanan, dokters]) => (
              <React.Fragment key={layanan}>
                <TableRow>
                  <TableCell colSpan={7} sx={{ bgcolor: "#4aac90", color: "white", fontWeight: "bold" }}>
                    Klinik Spesialis {layanan}
                  </TableCell>
                </TableRow>

                {dokters.map((dokter) => (
                  <TableRow key={dokter.id}>
                    <TableCell sx={{ fontWeight: 500, color: "#234974" }}>
                      {dokter.nama_dokter}
                    </TableCell>
                    {days.map((d) => (
                      <TableCell key={d} align="center">
                        {dokter.jadwal?.[d] ? (
                          dokter.jadwal[d]
                        ) : (
                          <span
                            style={{
                              backgroundColor: "#fecaca",
                              color: "#b91c1c",
                              fontSize: "0.75rem",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "0.375rem",
                              display: "inline-block",
                            }}
                          >
                            TIDAK PRAKTEK
                          </span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
