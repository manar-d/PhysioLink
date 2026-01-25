import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";


import useLocale from "../hooks/useLocale.js";
import { rtlTheme, theme } from "../theme/appTheme.js";

export default function MUIProvider(props) {
  const { children } = props;
  const { isRtl } = useLocale();

  const localizedTheme = isRtl ? rtlTheme : theme
  
  const cacheLtr = createCache({
  key: "muiltr",
});

  const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

return (
<CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
  <ThemeProvider theme={localizedTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
</CacheProvider>

);
}