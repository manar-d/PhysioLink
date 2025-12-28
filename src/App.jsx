import './App.css'

//Routers
import Routers from "./Router";

//material ui
import { Box, StyledEngineProvider } from "@mui/material";




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
