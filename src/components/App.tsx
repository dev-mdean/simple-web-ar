import { ModelViewerElement } from '@google/model-viewer'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isMobileSafari } from 'react-device-detect'

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
    scaleAR: '0.25 0.25 0.25',
    scaleThreeD: '1 1 1',
  } as Model,
  cube: {
    name: 'gold-cube',
    scaleAR: '0.1 0.1 0.1',
    scaleThreeD: '1 1 1',
  } as Model,
}

const App = () => {
  const modelViewerRef = useRef<ModelViewerElement>(null)
  const [model, setModel] = useState(models.cube)
  const [viewingMode, setViewingMode] = useState(ViewingMode.ThreeD)

  const handleActivateAR = useCallback(() => {
    console.log('Activating AR')
    modelViewerRef.current?.activateAR()
    setViewingMode(ViewingMode.AR)
  }, [])

  const handleExitAR = useCallback(() => {
    console.log('Exiting AR')
    setViewingMode(ViewingMode.ThreeD)
  }, [])

  const handleBeforeRender = useCallback(() => {
    console.log('Before Render Called')
    setViewingMode(ViewingMode.ThreeD)
  }, [])

  const handleQuickLookTapped = useCallback(() => {
    console.log('Quick Look Tapped')
    setViewingMode(ViewingMode.AR)
  }, [])

  const handleProgress = useCallback((event: unknown) => {
    console.log('Progress Occurred: ', event)
  }, [])

  useEffect(() => {
    const element = modelViewerRef.current

    element?.addEventListener('before-render', handleBeforeRender)
    element?.addEventListener('quick-look-button-tapped', handleQuickLookTapped)
    element?.addEventListener('progress', handleProgress)

    return () => {
      element?.removeEventListener('before-render', handleBeforeRender)
      element?.removeEventListener('quick-look-button-tapped', handleQuickLookTapped)
      element?.removeEventListener('progress', handleProgress)
    }
  }, [handleBeforeRender, handleProgress, handleQuickLookTapped])

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
          <Box display='flex' flexDirection='column' rowGap={2} p={3}>
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
              <div slot='ar-button' />
              <Button onClick={handleExitAR} slot='exit-webxr-ar-button' variant='contained'>
                Exit AR
              </Button>
              <Box display='flex' height={1} sx={{ pointerEvents: 'none' }} width={1}>
                <Box display='flex' flexDirection='column-reverse' flexGrow={1} p={2}>
                  <Button onClick={handleModelSwitch} variant='contained' sx={{ pointerEvents: 'auto' }}>
                    Switch to {otherModel.name}
                  </Button>
                </Box>
              </Box>
            </model-viewer>
            {(modelViewerRef.current?.canActivateAR || isMobileSafari) && (
              <Button onClick={handleActivateAR} variant='contained'>
                View in AR
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
