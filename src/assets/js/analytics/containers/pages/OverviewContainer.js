import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import ui from 'redux-ui/transpiled';
import { analyticsLoadOverviewPage } from '../signals';
import { getUI } from 'app/core/selectors/ui';
import AuthenticationRequiredContainer from 'app/common/containers/AuthenticationRequiredContainer';
import OverviewPage from '../../components/pages/Overview';

class OverviewContainer extends Component {

  componentDidMount() {
    this.props.actions.load();
  }

  render() {
    return (
      <OverviewPage {...this.props}/>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const ui = _.get(getUI(state), 'scene');

  const dropdownUI = _.find(ui, (x, key) => {
    return _.startsWith(key, 'Dropdown');
  });

  const filters = state.analytics.filters;

  return {
    filters,
    isCampaignSelected: !!filters.campaignId,
    dropdownOpen: _.get(dropdownUI, 'open'),
    numberOfResults: _.size(state.analytics.data.allSearches)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      load: analyticsLoadOverviewPage,
      analyticsFilterFormSubmit,
      analyticsFiltersUpdate,
      analyticsDownloadCSV
    })
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onFilterRemoveClick: (filter) => {
      dispatchProps.actions.analyticsFiltersUpdate({
        [filter]: null
      });
    },
    onCSVDownloadClick: (filters) => {
      dispatchProps.actions.analyticsDownloadCSV({
        filters
      });
    }
  });
};

let DecoratedComponent = OverviewContainer;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
// DecoratedComponent = ui({
//   key: 'scene',
//   state: {
//   }
// })(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;