"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import {
  Button,
  Container,
  Box,
  Popper,
  Paper,
  Typography,
  Fade,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  FaGraduationCap,
  FaPhoneAlt,
  FaBars,
  FaChevronDown,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Hospital, Information, MedicalReport, Message } from "./icons";

const Navbar = () => {
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [careerPosts, setCareerPosts] = useState([]);

  const navItems = [
    {
      name: "Profil",
      icon: () => <Hospital width={24} height={24} />,
      children: [
        {
          name: "Visi & Misi",
          href: "/profil/visi-misi",
          description: "Visi dan misi RSUD Cilincing.",
        },
        {
          name: "Penghargaan",
          href: "/profil/penghargaan",
          description: "Penghargaan yang sudah diterima RSUD Cilincing"
        }
      ],
    },
    {
      name: "PELAYANAN",
      href: "/pelayanan",
      icon: () => <Image src="/pelayanan.png" alt="Icon Pelayanan" width={24} height={24} />,
    },
    {
      name: "JADWAL DOKTER",
      href: "/jadwal-dokter",
      icon: () => <MedicalReport width={24} height={24} />,
    },
    {
      name: "INFORMASI",
      icon: () => <Information width={24} height={24} />,
      children: [
        // {
        //   name: "Pelayanan",
        //   description:
        //     "Informasi tentang layanan yang tersedia di RSUD Cilincing.",
        // },
        {
          name: "KARIR",
          href: "/informasi/karir",
          description: "Informasi lowongan pekerjaan di RSUD Cilincing.",
        },
        {
          name: "PPID",
          href: "http://ppid.rsudcilincing.id/",
          description: "Informasi Publik RSUD Cilincing.",
        },
        {
          name: "SURVEY KEPUASAN MASYARAKAT",
          href: "/informasi/survey-kepuasan-masyarakat",
          description: "Isi survei kepuasan masyarakat RSUD Cilincing.",
        },
        {
          name: "WHISTLE BLOWING SYSTEM",
          href: "http://wbs.rsudcilincing.id/",
          description: "Laporkan dugaan pelanggaran di RSUD Cilincing.",
        },
        {
          name: "UNIT PENGENDALIAN GRATIFIKASI",
          href: "http://wbs.rsudcilincing.id/app/gratifikasi",
          description: "Informasi tentang unit pengendalian gratifikasi.",
        },
      ],
    },
    {
      name: "EDUKASI",
      icon: () => <FaGraduationCap size={24} color="#359d9e" />,
      children: [
        {
          name: "Video",
          href: "/edukasi/video",
          description: "Tonton video edukasi kesehatan.",
        },
        {
          name: "Library",
          href: "https://drive.google.com/drive/folders/1JQfNluFIGfEZcalL0B63CSmBew5ai6WB",
          description: "Lihat infografis kesehatan informatif.",
        },
      ],
    },
    {
      name: "KANAL ADUAN",
      href: "/kanal-aduan",
      icon: () => <Message width={24} height={24} />,
    },
    // {
    //   name: "KARIR",
    //   icon: () => <FaBriefcase size={24} color="#f9e181" />,
    //   children:
    //     careerPosts.length > 0
    //       ? careerPosts.map((post) => ({
    //           name: post.title,
    //           href: `/karir/${post.slug}`,
    //           description: post.excerpt,
    //         }))
    //       : [],
    // },
  ];

  const fetchPostCareer = async () => {
    try {
      const response = await fetch("/api/karir");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch career posts:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchPostCareer();
      setCareerPosts(posts);
    };
    fetchData();
  }, []);

  const handleHoverOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setOpenIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenIndex(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const isChildActive = (children) =>
    children?.some((child) => pathname.startsWith(child.href));

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <Container maxWidth="xl">
        <div className="flex justify-between items-center px-0 py-4">
          <Link href="/">
            <Image
              src={logo}
              width={220}
              alt="Logo RSUD Cilincing"
              className="w-[220px] lg:w-[270px]"
            />
          </Link>

          {/* Desktop Menu */}
          <Box className="hidden md:flex gap-2 items-center">
            {navItems.map((item, index) => {
              const active = isChildActive(item.children);

              return item.children ? (
                <Box
                  key={item.name}
                  onMouseEnter={(e) => handleHoverOpen(e, index)}
                  onMouseLeave={handleClose}
                  sx={{ position: "relative" }}
                >
                  <Button
                    variant="text"
                    sx={{
                      fontWeight: "semibold",
                      color: active ? "#4aac90" : "text.primary",
                      borderBottom: active
                        ? "2px solid #4aac90"
                        : "2px solid transparent",
                      borderRadius: 0,
                      "&:hover": {
                        color: "#4aac90",
                        borderBottom: "2px solid #4aac90",
                      },
                    }}
                    startIcon={item.icon ? <item.icon size={16} /> : null}
                  >
                    <p className="text-xs lg:text-base font-medium text-center">
                      {item.name}
                    </p>
                  </Button>
                  <Popper
                    open={openIndex === index}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    disablePortal
                    transition
                    modifiers={[
                      { name: "offset", options: { offset: [0, 8] } },
                    ]}
                    sx={{ zIndex: 1500 }}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={200}>
                        <Paper
                          elevation={3}
                          sx={{
                            mt: 1,
                            px: 2,
                            py: 2,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                            minWidth: 280,
                          }}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleClose}
                            >
                              <Box
                                sx={{
                                  px: 1,
                                  py: 1,
                                  borderRadius: 1,
                                  transition: "background 0.2s",
                                  "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                  },
                                }}
                              >
                                <Typography
                                  fontWeight="bold"
                                  variant="subtitle2"
                                >
                                  {child.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {child.description}
                                </Typography>
                              </Box>
                            </Link>
                          ))}
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </Box>
              ) : (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  variant="text"
                  sx={{
                    fontWeight: "semibold",
                    color: active ? "#4aac90" : "text.primary",
                    borderBottom: active
                      ? "2px solid #4aac90"
                      : "2px solid transparent",
                    borderRadius: 0,
                    "&:hover": {
                      color: "#4aac90",
                      borderBottom: "2px solid #4aac90",
                    },
                  }}
                  startIcon={item.icon ? <item.icon size={16} /> : null}
                >
                  <p className="text-xs lg:text-base font-medium text-center">
                    {item.name}
                  </p>
                </Button>
              );
            })}
          </Box>

          {/* Phone Button */}
          <a
            href="tel:0214412889"
            className="hidden md:flex items-center gap-2 bg-[#ed8423] hover:bg-[#234974] text-white font-bold hover:text-white transition px-3 py-2 rounded-full text-base text-nowrap"
          >
            <FaPhoneAlt />
            <span>(021) 4412 889</span>
          </a>

          {/* Mobile Menu Button */}
          <div className="block md:hidden">
            <IconButton onClick={toggleDrawer}>
              <FaBars />
            </IconButton>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 280 }} className="p-4 space-y-2">
          {navItems.map((item) =>
            item.children ? (
              <Box key={item.name}>
                <Button
                  onClick={() => toggleSubmenu(item.name)}
                  endIcon={<FaChevronDown />}
                  fullWidth
                  sx={{
                    justifyContent: "space-between",
                    textTransform: "none",
                  }}
                >
                  {item.name}
                </Button>
                <Collapse
                  in={openSubmenus[item.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List dense>
                    {item.children.map((child) => (
                      <ListItem
                        button
                        key={child.href}
                        component={Link}
                        href={child.href}
                        onClick={toggleDrawer}
                      >
                        <ListItemText primary={child.name} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <ListItem
                button
                key={item.href}
                component={Link}
                href={item.href}
                onClick={toggleDrawer}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            )
          )}
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
