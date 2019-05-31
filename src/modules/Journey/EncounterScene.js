import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import WildernessIllustration from './WildernessIllustration';

import { addTreat } from '../../reducers/gameReducer';

function EncounterScene(props) {
  const { encounter } = props;
  return (
    <div className="interaction-container">
      <WildernessIllustration
        region={{
          name: 'Sayleus',
          canonName: 'sayleus',
          overlayColor: { r: 140, g: 190, b: 200, a: 0.3 },
          horizon: 0.3,
        }}
        activeSprite={encounter.sprite}
      />
      <div className="interaction-content">

        <h2>
          Treats:
          {props.treatCount}
        </h2>

        <ReactMarkdown source={encounter.text} />
        {encounter.choices.map(choice => (
          !choice.requirement || choice.requirement({ treatCount: props.treatCount })
            ? (
              <button
                className="button"
                type="button"
                key={choice.text}
                onClick={
                  () => {
                    if (choice.outcome) {
                      choice.outcome();
                    }
                    if (choice.next) {
                      props.addEncounter(choice.next);
                    }
                    props.finish();
                  }
                }
              >
                {choice.text}
              </button>
            )
            : null
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  treatCount: state.game.treatCount,
});

const mapDispatchToProps = {
  addTreat,
};

EncounterScene.propTypes = {
  treatCount: PropTypes.number.isRequired,
  encounter: PropTypes.object.isRequired,
  finish: PropTypes.func.isRequired,
  addEncounter: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EncounterScene);
