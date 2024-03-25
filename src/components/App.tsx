import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useCallback, useMemo, useState } from 'react'

const models = {
  car: 'Mercedes-Benz_G-Class',
  cube: 'gold-cube',
}

const App = () => {
  const [model, setModel] = useState('gold-cube')

  const handleModelSwitch = useCallback(() => {
    setModel((previous) => {
      if (previous === models.car) return models.cube
      return models.car
    })
  }, [])

  const otherModel = useMemo(() => {
    if (model === models.car) return models.cube
    return models.car
  }, [model])

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
              ios-src={`${model}.usdz`}
              src={`${model}.glb`}
              style={{ backgroundColor: '#00000020', display: 'block', height: '50vh', width: '100%' }}
            >
              <Button className='ar-button' slot='ar-button' variant='contained'>
                View in AR
              </Button>
              <Box display='flex' height={1} sx={{ pointerEvents: 'none' }} width={1}>
                <Box display='flex' flexDirection='column-reverse' flexGrow={1} p={2}>
                  <Button onClick={handleModelSwitch} variant='contained' sx={{ pointerEvents: 'auto' }}>
                    Switch to {otherModel}
                  </Button>
                </Box>
              </Box>
            </model-viewer>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
