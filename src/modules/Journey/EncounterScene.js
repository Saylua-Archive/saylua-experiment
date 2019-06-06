import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import WildernessIllustration from './WildernessIllustration';

import { addTreat } from '../../reducers/gameReducer';

function EncounterScene(props) {
  const { encounter } = props;
  const choices = encounter.choices || [
    {text: 'Okay'}
  ];
  return (
    <div className="interaction-container">
      <WildernessIllustration
        region={props.region}
        activeSprite={encounter.sprite}
      />
      <div className="interaction-content">

        <h2>
          Treats:
          {props.treatCount}
        </h2>

        <ReactMarkdown source={encounter.text} />
        {choices.map(choice => (
          !choice.requirement || choice.requirement({ treatCount: props.treatCount })
            ? (
              <button
                className="button"
                type="button"
                key={choice.text}
                onClick={
                  () => {
                    const next = choice.next || encounter.next;
                    if (next) {
                      props.addEncounter(next);
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
  region: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EncounterScene);
