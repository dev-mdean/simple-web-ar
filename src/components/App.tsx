import { ARStatus } from '@google/model-viewer/lib/three-components/ARRenderer'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

enum ViewingMode {
  AR,
  ThreeD,
}

interface Model {
  name: string
  scaleAR: string
  scaleThreeD: string
}

const models = {
  robot: {
    name: 'robot-operator',
    scaleAR: '0.5 0.5 0.5',
    scaleThreeD: '0.5 0.5 0.5',
  } as Model,
  cube: {
    name: 'gold-cube',
    scaleAR: '0.1 0.1 0.1',
    scaleThreeD: '0.1 0.1 0.1',
  } as Model,
}

const App = () => {
  const modelViewerRef = useRef<HTMLElement>(null)
  const [model, setModel] = useState(models.cube)
  const [viewingMode, setViewingMode] = useState(ViewingMode.ThreeD)

  const handleARStatusChange = useCallback((event: Event) => {
    const customEvent = event as CustomEvent
    console.log(event)
    const arStatus: ARStatus = customEvent.detail.status

    if (arStatus === 'failed' || arStatus === 'not-presenting') setViewingMode(ViewingMode.AR)
    else setViewingMode(ViewingMode.ThreeD)
  }, [])

  useEffect(() => {
    const element = modelViewerRef.current

    element?.addEventListener('ar-status', handleARStatusChange)

    return () => {
      element?.removeEventListener('ar-status', handleARStatusChange)
    }
  }, [handleARStatusChange])

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

  const currentScale = useMemo(
    () => (viewingMode === ViewingMode.AR ? model.scaleAR : model.scaleThreeD),
    [model.scaleAR, model.scaleThreeD, viewingMode],
  )

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
              ios-src={`${model.name}.usdz`}
              ref={modelViewerRef}
              scale={currentScale}
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
