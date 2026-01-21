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
import useLocale from "../../hooks/useLocale";

const languages = [
  { code: "ar", label: "العربية", flag: "sa" },
  { code: "en", label: "English", flag: "gb" },
  { code: "ur", label: "اردو", flag: "pk" },
];

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { changeLanguage, currentLanguage } = useLocale();

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <LanguageIcon sx={{ color: "#9e9e9e" }}  />
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
              changeLanguage(lang.code);
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

            <ListItemText sx={{ mr: 1 }} primary={`${lang.label}`} />

            {currentLanguage === lang.code && <CheckIcon fontSize="small" />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
