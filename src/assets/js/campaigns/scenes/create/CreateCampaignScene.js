import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import { updateUI } from 'redux-ui/transpiled/action-reducer';
import Titlebar from 'app/common/components/layout/Titlebar';
import { loadCampaignCreatePage, selectBrand, selectCampaignType, resetCampaignCreate } from '../../actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

import BrandSelectorContainer from '../../containers/BrandSelectorContainer';
import CampaignTypeSelectorContainer from '../../containers/CampaignTypeSelectorContainer';
import CreateCampaignContainer from '../../containers/CreateCampaignContainer';

import Steptracker from 'app/common/components/Steptracker';
import Avatar from 'app/common/components/Avatar';

class CreateCampaign extends Component {
  componentDidMount() {
    if(this.props.routeParams.brandId) {
      this.props.actions.selectBrand(this.props.routeParams.brandId);
    }

    if(this.props.routeParams.campaignTypeId) {
      this.props.actions.selectCampaignType(this.props.routeParams.campaignTypeId);
    }

    if(this.props.routeParams.brandId == null && this.props.routeParams.campaignTypeId == null) {
      this.props.actions.reset();
    }

    this.props.actions.load();
    this.props.actions.closeMenu();
  }

  componentWillUpdate(nextProps) {
    if(nextProps.routeParams.brandId && nextProps.routeParams.brandId !== this.props.routeParams.brandId) {
      nextProps.actions.selectBrand(nextProps.routeParams.brandId);
    }

    if(nextProps.routeParams.campaignTypeId && nextProps.routeParams.campaignTypeId !== this.props.routeParams.campaignTypeId) {
      nextProps.actions.selectCampaignType(nextProps.routeParams.campaignTypeId);
    }

    if(nextProps.routeParams.brandId == null && nextProps.routeParams.campaignTypeId == null) {
      if(this.props.selectedBrandId || this.props.selectedCampaignTypeId) {
        nextProps.actions.reset();
      }
    }

  }

  render() {
    if(this.props.selectedBrandId == null) {
      return (
        <DefaultLayout
          titleRender={_ => {
            return (
              <div className="container-fluid">
                <div className="row">
                  <Titlebar className="col-xs-12">
                    <div className="row">
                      <div className="col-xs-6">
                        <h1>Select a Brand</h1>
                      </div>
                      <div className="col-xs-2 col-xs-push-4">
                        <button
                          className="btn btn-secondary btn-radius-lg btn-block"
                          type="button"
                          onClick={this.props.actions.openAddBrandModal}>
                          Add New Brand
                        </button>
                      </div>
                    </div>
                  </Titlebar>
                </div>
              </div>
            );
          }}>
          <div className="container">
            <BrandSelectorContainer/>
          </div>
        </DefaultLayout>
      );
    }

    if(this.props.selectedCampaignTypeId == null) {
      if(this.props.selectedBrand == null) {
        return (
          <div>Loading...</div>
        );
      }

      return (
        <DefaultLayout
          titleRender={_ => {
            return (
              <div className="container-fluid">
                <div className="row">
                  <Titlebar className="col-xs-12">
                    <div className="row">
                      <div className="col-xs-12">
                        <Avatar
                          src={this.props.selectedBrand.imgPreview}/>
                        <h1>Choose a Campaign Type</h1>
                      </div>
                    </div>
                  </Titlebar>
                </div>
              </div>
            );
          }}>
          <div className="container">
            <CampaignTypeSelectorContainer/>
          </div>
        </DefaultLayout>
      );
    }

    if(this.props.selectedBrand == null) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <div className="container-fluid">
              <div className="row">
                <Titlebar className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-12">
                      <Avatar
                        src={this.props.selectedBrand.imgPreview}/>

                      <Avatar
                        icon={'test'}/>

                      <h1>Create Campaign</h1>
                      <Steptracker
                        steps={[
                          {
                            label: 'Step 1',
                            isActive: this.props.steptrackerStep === 0,
                            isPast: this.props.steptrackerStep > 0
                          },
                          {
                            label: 'Step 2',
                            isActive: this.props.steptrackerStep === 1,
                            isPast: this.props.steptrackerStep > 1
                          },
                          {
                            label: 'Step 3',
                            isActive: this.props.steptrackerStep === 2,
                            isPast: this.props.steptrackerStep > 2
                          }
                        ]}/>
                    </div>
                  </div>
                </Titlebar>
              </div>
            </div>
          );
        }}>
        <div className="container">
          <CreateCampaignContainer
            selectedBrandId={this.props.selectedBrandId}
            selectedCampaignTypeId={this.props.selectedCampaignTypeId}/>
        </div>
      </DefaultLayout>
    );
  }

};

const mapStateToProps = (state, ownProps) => {
  const selectedBrandId = state.campaigns.getIn(['create', 'selectedBrandId']);
  let selectedBrand;
  if(selectedBrandId) {
    selectedBrand = state.entities.getIn(['brands', selectedBrandId]);

    if(selectedBrand) {
      selectedBrand = selectedBrand.toJS();
    }
  }
  console.log(selectedBrand);

  return {
    steptrackerStep: state.ui.getIn(['scene', 'createCampaignPrint', 'step']),
    selectedBrandId,
    selectedBrand,
    selectedCampaignTypeId: state.campaigns.getIn(['create', 'selectedCampaignTypeId'])
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      load: () => {
        dispatch(loadCampaignCreatePage());
      },
      closeMenu: _ => {
        dispatch(updateUI(['scene', 'drawNav'], 'isOpen', false));
      },
      selectBrand: (brandId) => {
        dispatch(selectBrand(brandId));
      },
      selectCampaignType: (campaignTypeId) => {
        dispatch(selectCampaignType(campaignTypeId));
      },
      reset: _ => dispatch(resetCampaignCreate()),

      openAddBrandModal: _ => {
        dispatch(updateModalPath('addBrand'));
        dispatch(updateModalData({
        }));
        dispatch(openModal());
      }
    }
  };
};

let DecoratedComponent = CreateCampaign;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'scene',
  state: {
  }
})(DecoratedComponent);

export default DecoratedComponent;