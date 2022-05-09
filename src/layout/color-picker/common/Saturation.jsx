import lodashThrottle from 'lodash/throttle';
import React, { useCallback, useRef } from 'react';

import * as saturation from '../helpers/saturation';

import { useOnChange } from './useOnChange';

const styles = {
  color: (borderRadius, hsl) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `hsl(${hsl.h},100%, 50%)`,
    borderRadius,
    userDraggle: 'none',
    userSelect: 'none',
  }),
  white: (borderRadius) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius,
    background: `linear-gradient(to right, #fff, rgba(255,255,255,0))`,
  }),
  black: (borderRadius, boxShadow) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow,
    borderRadius,
    background: `linear-gradient(to top, #000, rgba(0,0,0,0))`,
  }),
  pointer: (hsv) => ({
    position: 'absolute',
    top: `${-(hsv.v * 100) + 100}%`,
    left: `${hsv.s * 100}%`,
    cursor: 'default',
  }),
  circle: {
    width: '4px',
    height: '4px',
    boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
          0 0 1px 2px rgba(0,0,0,.4)`,
    borderRadius: '50%',
    cursor: 'hand',
    transform: 'translate(-2px, -2px)',
  },
};

const Saturation = (props) => {
  const { onChange, hsl } = props;

  const throttle = useRef(
    lodashThrottle((fn, data, e) => {
      fn(data, e);
    }, 50),
  ).current;

  const containerRef = useRef();

  const handleChange = useCallback(
    (e) => {
      if (onChange && typeof onChange === 'function') {
        throttle(
          onChange,
          saturation.calculateChange(e, hsl, containerRef.current),
          e,
        );
      }
    },
    [hsl, onChange, throttle],
  );

  const handleMouseDown = useOnChange(handleChange);

  const { color, white, black, pointer, circle, borderRadius, boxShadow } =
    props.style || {};

  return (
    <div
      style={{ ...styles.color(borderRadius, props.hsl), ...color }}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchMove={handleChange}
      onTouchStart={handleChange}
    >
      <div style={{ ...styles.white(borderRadius), ...white }}>
        <div style={{ ...styles.black(borderRadius, boxShadow), ...black }} />
        <div style={{ ...styles.pointer(props.hsv), ...pointer }}>
          {props.pointer ? (
            <props.pointer {...props} />
          ) : (
            <div style={{ ...styles.circle, ...circle }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Saturation;
