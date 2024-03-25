import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useCallback, useMemo, useState } from 'react'

interface Model {
  name: string
  scale: string
}

const models = {
  robot: {
    name: 'robot-operator',
    scale: '0.5 0.5 0.5',
  } as Model,
  cube: {
    name: 'gold-cube',
    scale: '0.1 0.1 0.1',
  } as Model,
}

const App = () => {
  const [model, setModel] = useState(models.cube)

  const handleModelSwitch = useCallback(() => {
    setModel((previous) => {
      if (previous === models.robot) return models.cube
      return models.robot
    })
  }, [])

  const otherModel = useMemo(() => {
    if (model === models.robot) return models.cube
    return models.robot
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
              ar-scale={model.scale}
              camera-controls
              id='first'
              ios-src={`${model.name}.usdz`}
              scale={model.scale}
              src={`${model.name}.glb`}
              style={{ backgroundColor: '#00000020', display: 'block', height: '50vh', width: '100%' }}
            >
              <Button className='ar-button' slot='ar-button' variant='contained'>
                View in AR
              </Button>
              <Box display='flex' height={1} sx={{ pointerEvents: 'none' }} width={1}>
                <Box display='flex' flexDirection='column-reverse' flexGrow={1} p={2}>
                  <Button onClick={handleModelSwitch} variant='contained' sx={{ pointerEvents: 'auto' }}>
                    Switch to {otherModel.name}
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
