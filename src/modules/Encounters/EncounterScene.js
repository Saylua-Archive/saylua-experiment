import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

export default function EncounterScene(props) {
  const { encounter } = props;
  const { viewComponent, viewComponentProps } = encounter.props;
  const stats = encounter.getRelevantStats();
  return (
    <div className="interaction-container">
      {
        React.createElement(viewComponent, {
          encounterState: encounter.state,
          interactions: encounter.getInteractions(),
          ...viewComponentProps,
        })
      }
      <div className="interaction-content">
        <h2>{encounter.getTitle()}</h2>

        {stats.length ? (
          <p>
            {stats.map(stat => `${stat.name}: ${stat.value} `)}
          </p>
        ) : ''}

        <ReactMarkdown source={encounter.state.text} />
        {encounter.getAvailableInteractions().map(interaction => (
          <button
            className="button"
            type="button"
            key={interaction.type}
            onClick={encounter._runInteraction.bind(encounter, interaction.interact)}
          >
            {interaction.buttonText}
          </button>
        ))}
      </div>
    </div>
  );
}

EncounterScene.propTypes = {
  encounter: PropTypes.object.isRequired,
};
