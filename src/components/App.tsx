import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const App = () => {
  return (
    <Box display='flex' flexDirection='column' height={1} width={1}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>Simple Web AR</Typography>
        </Toolbar>
      </AppBar>
      <Box flexGrow={1} overflow='hidden'>
        <Box height={1} overflow='scroll'>
          <Box display='flex' flexDirection='column' p={3}>
            <Typography>Some content</Typography>
            <model-viewer
              alt='model-viewer'
              ar
              ar-modes='webxr scene-viewer quick-look'
              camera-controls
              id='first'
              src={'gold-cube.glb'}
              style={{ backgroundColor: '#00000020', display: 'block', height: '24rem', width: '24rem' }}
            ></model-viewer>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
