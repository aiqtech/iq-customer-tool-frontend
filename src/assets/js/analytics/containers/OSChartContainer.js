import React, { Component } from 'react';
import { connect } from 'react-redux';
import rd3 from 'rd3';
import _ from 'lodash';
import fp from 'lodash/fp';
import moment from 'moment';
import colorScheme from '../colorScheme';

const render = (props) => {
  return (
    <rd3.PieChart
      data={props.chartData}
      width={props.width}
      height={props.width}
      radius={props.width / 2}
      innerRadius={(props.width / 4)}
      colors={segment => {
        return colorScheme[segment];
      }}
      showInnerLabels={false}
      showOuterLabels={false}
      title='OS'/>
  );
}

const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  const osData = fp.flow(
    // Need to merge bad values down to unknown
    fp.transform(
      (result, search) => {
        const deviceType = search.deviceType;

        if(deviceType == null || deviceType === 'deviceType' || deviceType === 'null') {
          search.deviceType = 'Unknown'
        }

        result.push(search);
      },
      []
    ),
    // Count each type
    fp.countBy(search => search.deviceType),
    // Converting the data to the chart format
    fp.reduce(
      (result, value, key) => {
        result.push({
          label: key,
          value
        });
        return result;
      },
      []
    )
  )(allSearches);

  return {
    chartData: osData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = render;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;