import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { Combobox } from 'react-input-enhancements';
import DateTimeField from 'react-bootstrap-datetimepicker';
import AssetField from 'app/common/components/forms/AssetField';

class BasicDetailsForm extends Component {
  render() {
    const fields = this.props.fields;

    return (
      <div className="row">
        <form className="form--content" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          <div className="col-xs-12 col-sm-6">
            <div className="pane pane--filled">
              <AssetField
                onChange={fields.media.onChange}
                value={fields.media.value}/>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="pane pane--filled">
              <div className="pane__body">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>Basic Details</h2>

                    <fieldset className="form-group">
                      <label htmlFor={joid.link(true, 'input')}>Campaign Title</label>
                      <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="Demo Name" {...fields.campaignTitle}/>
                    </fieldset>

                    <fieldset className="form-group">
                      <label htmlFor={joid.link(true, 'input')}>Magazine Language</label>
                      <Combobox defaultValue={'English'}
                        options={['English', 'Korean']}
                        dropdownProps={{ style: { width: '100%' } }}
                        autocomplete>
                        {inputProps =>
                          <input {...inputProps}
                            id={joid.link(false, 'input')}
                            type='text'
                            className={`${inputProps.className} form-control`}
                            placeholder='English'
                            {...fields.magazineLanguage}/>
                        }
                      </Combobox>
                    </fieldset>


                    <div className="row">
                      <div className="col-xs-12">
                        <label htmlFor={joid.link(true, 'input')}>Campaign Period</label>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <fieldset className="form-group">
                          <div className="input-group">
                            <DateTimeField
                              mode="date"
                              id={joid.link(false, 'input')}
                              placeholder="From"
                              {...fields.campaignPeriodFrom}
                              buttonIcon="icons8-date-from"/>
                          </div>
                        </fieldset>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <fieldset className="form-group">
                          <label className="sr-only" htmlFor={joid.link(true, 'input')}>From</label>
                          <div className="input-group">
                            <DateTimeField
                              mode="date"
                              id={joid.link(false, 'input')}
                              placeholder="To"
                              {...fields.campaignPeriodTo}
                              buttonIcon="icons8-date-to"/>
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor={joid.link(true, 'input')}>Default Target</label>
                      <div className="row">
                        <div className="col-xs-8 col-md-9 col-lg-10">
                          <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="Default Target" {...fields.defaultTarget}/>
                        </div>
                        <div className="col-xs-4 col-md-3 col-lg-2">
                          <button type="button" className="btn btn-block btn-secondary-outline">
                            <i className="icons8-visible"/>
                          </button>
                        </div>
                      </div>
                    </div>

                    <hr/>
                    
                    <div className="row">
                      <div className="col-xs-6">
                        <button type="button" className="btn btn-block btn-secondary" onClick={this.props.onBackClick}>Back</button>
                      </div>

                      <div className="col-xs-6">
                        <button type="submit" className="btn btn-block btn-primary">Next</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default BasicDetailsForm;