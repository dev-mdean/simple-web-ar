import { ModelViewerElement } from '@google/model-viewer'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isAndroid, isMobile, isMobileSafari } from 'react-device-detect'

interface Model {
  name: string
  scale: string
}

const models = {
  robot: {
    name: 'robot-operator',
    scale: '0.1 0.1 0.1',
  } as Model,
  cube: {
    name: 'gold-cube',
    scale: '0.1 0.1 0.1',
  } as Model,
}

const App = () => {
  const modelViewerRef = useRef<ModelViewerElement>(null)
  const [model, setModel] = useState(models.cube)
  const price = '$1,000,000'
  const [quickLookButtonTapped, setQuickLookButtonTapped] = useState(false)

  const handleActivateAR = useCallback(() => {
    console.log('Activating AR')
    modelViewerRef.current?.activateAR()
  }, [])

  const handleExitAR = useCallback(() => {
    console.log('Exiting AR')
  }, [])

  const handleModelSwitch = useCallback(() => {
    setModel((previous) => {
      if (previous === models.robot) return models.cube
      return models.robot
    })
  }, [])

  const handleQuickLookButtonTapped = useCallback(() => {
    setQuickLookButtonTapped(true)
  }, [])

  const otherModel = useMemo(() => {
    if (model === models.robot) return models.cube
    return models.robot
  }, [model])

  useEffect(() => {
    const modelViewer = modelViewerRef.current

    modelViewer?.addEventListener('quick-look-button-tapped', handleQuickLookButtonTapped)

    return () => {
      modelViewer?.removeEventListener('quick-look-button-tapped', handleQuickLookButtonTapped)
    }
  }, [handleQuickLookButtonTapped])

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
              ios-src={`${model.name}.usdz#applePayButtonType=buy&checkoutTitle=Buy%20Now&checkoutSubtitle=The%20best%20thing%20since%20sliced%20bread&price=${price}`}
              ref={modelViewerRef}
              scale={model.scale}
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
            {((isMobile && isAndroid) || isMobileSafari) && (
              <Button onClick={handleActivateAR} variant='contained'>
                View in AR
              </Button>
            )}
            {quickLookButtonTapped && <Typography>{price} has been deducted from your bank account</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
