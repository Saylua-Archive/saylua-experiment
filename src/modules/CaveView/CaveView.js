import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './CaveView.css';
import { randomChoice } from '../../utils/utils';
import { getActiveSprite } from '../../reducers/spriteReducer';
import SpritePortrait from '../../sharedComponents/SpritePortrait/SpritePortrait';

const COLORS = [
  '#FFCDD2',
  '#F8BBD0',
  '#E1BEE7',
  '#D1C4E9',
  '#C5CAE9',
  '#BBDEFB',
  '#B3E5FC',
  '#B2EBF2',
  '#B2DFDB',
  '#C8E6C9',
  '#DCEDC8',
  '#F0F4C3',
  '#FFF9C4',
  '#FFECB3',
  '#FFE0B2',
  '#FFCCBC',
  '#D7CCC8',
  '#F5F5F5',
  '#CFD8DC',
];

const WIDTH = 50;
const HEIGHT = 50;

class CaveView extends Component {
  constructor(props) {
    super(props);

    const size = WIDTH * HEIGHT;
    const map = Array(size).fill(0).map(() => randomChoice(COLORS));
    this.state = {
      map,
      position: 0,
    };
  }

  render() {
    const { region, activeSprite } = this.props;
    const { map, position } = this.state;
    return (
      <div>
        <div className="cave-map">
          {
            map.map((tile, i) => (
              <div className="cave-tile" style={{ backgroundColor: tile }}>
                { position === i ? <SpritePortrait sprite={activeSprite} /> : ''}
              </div>
            ))
          }
        </div>
        { region.name }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeSprite: getActiveSprite(state),
});

CaveView.propTypes = {
  region: PropTypes.object.isRequired,
  activeSprite: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps
)(CaveView);
