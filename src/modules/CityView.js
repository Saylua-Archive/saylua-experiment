import React from 'react';
import PropTypes from 'prop-types';

import './WildernessView.css';

export default function CityView(props) {
  const { region, className } = props;

  const bgStyle = `url('img/wilderness/${region.canonName}.jpg')`;

  return (
    <div
      className={`wilderness-background ${className}`}
      style={{
        backgroundImage: bgStyle,
      }}
    >
      { region.name }
    </div>
  );
}

CityView.propTypes = {
  region: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CityView.defaultProps = {
  className: '',
};
