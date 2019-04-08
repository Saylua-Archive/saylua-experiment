import React, { Component } from 'react';
import PropTypes from 'prop-types';


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const overlayChannel = (original, overlay, alpha) => {
  // Compute a new value for a single color channel. ie: R, G, or B

  const delta = (overlay - original) * alpha;
  return original + delta;
};

// TODO: Support arbitrary image manipulation functions.
const overlayColorOnImage = (img, overlayColor) => {
  if (!img || !overlayColor) return '';

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);

  const pixels = imageData.data;

  // Iterate over red.
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = overlayChannel(pixels[i], overlayColor.r, overlayColor.a);
  }

  // Iterate over green.
  for (let i = 1; i < pixels.length; i += 4) {
    pixels[i] = overlayChannel(pixels[i], overlayColor.g, overlayColor.a);
  }

  // Iterate over blue.
  for (let i = 2; i < pixels.length; i += 4) {
    pixels[i] = overlayChannel(pixels[i], overlayColor.b, overlayColor.a);
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
};

export default class CanvasImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: undefined,
    };
  }

  componentWillMount() {
    this.loadImage(this.props.src);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      // Image changed.
      this.loadImage(nextProps.src);
    } else if (this.props.overlayColor !== nextProps.overlayColor) {
      // Color changed, but image did not change.
      const src = overlayColorOnImage(this.imageElement, nextProps.overlayColor);
      if (src) {
        this.setState({ src });
      }
    }
  }

  loadImage(imgSrc) {
    this.imageElement = document.createElement('img');
    this.imageElement.src = imgSrc;
    this.imageElement.onload = () => {
      const src = overlayColorOnImage(this.imageElement, this.props.overlayColor);
      if (src) {
        this.setState({ src });
      }
    };
  }

  render() {
    const { style, className, alt, title } = this.props;
    const src = this.state.src || this.props.src;
    return (
      <img
        src={src}
        className={className}
        alt={alt}
        title={title}
        style={style}
      />
    );
  }
}

CanvasImage.propTypes = {
  src: PropTypes.string.isRequired,
  overlayColor: PropTypes.object,
  alt: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

CanvasImage.defaultProps = {
  overlayColor: undefined,
  alt: '',
  title: '',
  style: undefined,
  className: '',
};
