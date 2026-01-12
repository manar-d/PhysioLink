import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import i18n from "i18next";

const languages = [
  { code: "ar", label: "العربية", flag: "sa" },
  { code: "en", label: "English", flag: "gb" },
  //   { code: "bn", label: "বাংলা", flag: "bd" },
  //   { code: "fil", label: "Tagalog", flag: "ph" },
  //   { code: "hi", label: "हिन्दी", flag: "in" },
  { code: "ur", label: "اردو", flag: "pk" },
];

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const current = i18n.language;

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <LanguageIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => {
              setAnchorEl(null);
              localStorage.setItem("lang", lang.code);
              i18n.changeLanguage(lang.code);
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Box
                component="img"
                src={`https://flagcdn.com/w40/${lang.flag}.png`}
                alt={lang.code}
                sx={{
                  width: 20,
                  height: 14,
                  borderRadius: "2px",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                }}
              />
            </ListItemIcon>

            <ListItemText
              primary={`${lang.label} (${lang.code.toUpperCase()})`}
            />

            {current === lang.code && <CheckIcon fontSize="small" />}
            
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
