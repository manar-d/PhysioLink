import './App.css'

//Routers
import Routers from "./Router";

//material ui
import { Box, StyledEngineProvider } from "@mui/material";


//fonts
import "./assets/fonts/Cairo-Light.ttf";
import "./assets/fonts/Cairo-Regular.ttf";
import "./assets/fonts/Cairo-Black.ttf";
import "./assets/fonts/Cairo-Bold.ttf";
import "./assets/fonts/Cairo-ExtraLight.ttf";
import "./assets/fonts/Cairo-SemiBold.ttf";

function App() {

  return (
    <>
      <StyledEngineProvider injectFirst>
            <Routers />
      </StyledEngineProvider>
    </>
  )
}

export default App
