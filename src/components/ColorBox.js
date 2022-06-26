import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
// import './ColorBox.css';
import classes from './ColorBox.module.css';

const ColorBox = (props) => {
  const {name, background, moreUrl, showingFullPalette} = props;
  const [copied, setcopied] = useState(false)
  console.log(showingFullPalette)
  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;

  useEffect(()=>{
    setTimeout(()=>{
      setcopied(false)
    },1500)
  },[copied])


  const changeCopyState = () => {
    setcopied(true)
  }

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div 
        style={{background}} 
        className={`${classes.ColorBox} ${showingFullPalette ? classes.colorBoxHeight : classes.SingleColorPalette}`}
        >
        <div style={{background}} className={`${classes.copyOverlay} ${copied && classes.show}`} />
        <div className={`${classes.copyMsg} ${copied && classes.show}`}>
          <h1>copied!</h1>
          <p className={`${isLightColor ? classes.darkText : ''}`}>{background}</p>
        </div>
        {/* ----------- */}
        <div className={classes.copyContainer}>
          <div className={classes.boxContent}>
            <span className={`${isDarkColor ? classes.lightText : ''}`}>{name}</span>
          </div>
          <button className={`${classes.copyButton} ${isLightColor ? classes.darkText : ''}`}>Copy</button>
        </div>
        {showingFullPalette && <Link to={moreUrl} onClick={e => e.stopPropagation()}>
          <span className={`${classes.seeMore} ${isLightColor ? classes.darkText : ''}`}>MORE</span>
        </Link>}
      </div>
    </CopyToClipboard>
  )
}

export default ColorBox