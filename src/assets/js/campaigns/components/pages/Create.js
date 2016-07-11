import React from 'react';
import DefaultLayout from 'app/common/components/layouts/Default';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import CampaignTitlebar from '../components/CampaignTitlebar';
import Constants from 'app/common/Constants';

import SteptrackerContainer from '../containers/SteptrackerContainer';
import Avatar from 'app/common/components/Avatar';
import Campaign from '../components/Campaign';
import BrandSelectorContainer from '../containers/BrandSelectorContainer';
import CampaignTypeSelectorContainer from '../containers/CampaignTypeSelectorContainer';

const Create = (props) => {
  if(this.props.selectedBrandId == null) {
    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar
              title="Select a Brand"
              ctas={[(
                <button
                  className="btn btn-secondary btn-radius-lg btn-block"
                  type="button"
                  onClick={this.props.actions.openAddBrandModal}>
                  Add New Brand
                </button>
              )]}/>
          );
        }}>
        <div className="container container--gutter">
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
            <Titlebar
              title="Choose a Campaign Type"
              avatars={[
                { src: this.props.selectedBrand.imgPreview }
              ]}/>
          );
        }}>
        <div className="container container--gutter">
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
          <CampaignTitlebar
            flow="create"
            campaignType={this.props.selectedCampaignTypeId >> 0}
            brand={this.props.selectedBrand}/>
        );
      }}>
      <div className="container container--gutter">
        <Campaign
          campaignType={this.props.selectedCampaignTypeId >> 0}
          selectedBrandId={this.props.selectedBrandId}/>
      </div>
    </DefaultLayout>
  );
};
Create.displayName = 'CampaignsCreatePage';
Create.propTypes = {

};

export default Create;
