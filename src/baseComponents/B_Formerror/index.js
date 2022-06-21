import React, { useState } from 'react'
import { AlertIcon } from '@primer/octicons-react'
import { showClientDevelopmentErros } from 'config'
import { useSpring, animated } from 'react-spring'
import { TriangleDownIcon, TriangleUpIcon } from '@primer/octicons-react'

const index = ({ error }) => {
  const [showErrorStack, setShowErrorStack] = useState(false)
  const animatedError = useSpring({
    height: showErrorStack ? 'auto' : 0
  })
  return (
    <div className="flash flash-error py-1 px-2" style={{overflow: 'hidden'}}>   
      <div style={{overflow: 'hidden', maxWidth: '100%'}}>        
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
            <div style={{display: 'flex', alignItems: 'center'}}><AlertIcon />{error.message}</div>
          { showClientDevelopmentErros && 
              <button className="btn-link" type="button" onClick={() => setShowErrorStack(!showErrorStack)}>
                Details { !showErrorStack ? <TriangleDownIcon /> : <TriangleUpIcon /> }
              </button>
          }
        </div>
        <animated.div style={{ height: 0, ...animatedError}}>
          { <p style={{marginTop: '0.5rem'}}> { error.stack } </p> }
        </animated.div>
      </div>
    </div>
  );
};

export default index

const ShowError = () => {
  return (
  <div className="Box Box--overlay d-flex flex-column anim-fade-in fast">
    <div className="Box-footer">
      <button type="button" className="btn btn-block" data-close-dialog>Okidoki</button>
    </div>
  </div>

  )
}