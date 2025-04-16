import { Container } from "@mui/material";
import Typography from "../Theme/Typography";
// import Link from "next/link";

export default function Footer() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#" },
    { name: "Hostels", href: "/hostels" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <div position="static" className="mt-auto">
      <Container maxWidth="lg" className="py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-1 text-BackgroundColor">
            <div className="w-6 h-6 sm:w-4 sm:h-4 bg-cyan-400 rounded-full ml-1"></div>
            <span className="text-xl sm:text-base font-semibold">HMS</span>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-AccentColor3 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="w-full h-px bg-PrimaryColor my-1"></div>

          {/* Copyright */}
          <Typography variant="body2" className="text-AccentColor3 text-sm">
            Copyright 2024 | All Rights Reserved
          </Typography>
        </div>
      </Container>
    </div>
  );
}
