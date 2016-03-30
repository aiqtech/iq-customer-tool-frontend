import React, { Component } from 'react';
import _ from 'lodash';

class CampaignTypeSelectorOptions extends Component {
  render() {
    return (
      <div className="selector__option">
        <button type="button" onClick={this.props.onOptionClick}>
          {this.props.label}
        </button>
      </div>
    );
  }
};

export default CampaignTypeSelectorOptions;