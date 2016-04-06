import React, { Component } from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import joid from 'joid';

class CreateCouponForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form className="form--modal" onSubmit={this.props.onSubmit}>
        <h1>Create New Coupon</h1>

        <fieldset className="form-group">
          <label htmlFor={joid.link(true, 'input')}>Coupon Name</label>
          <input
            type="text"
            className="form-control"
            id={joid.link(false, 'input')}
            placeholder="Buy 1 Get 1 Free (1 For 1)"
            {...fields.couponName}/>
        </fieldset>

        <div className="row">
          <div className="col-xs-12">
            <label htmlFor={joid.link(true, 'input')}>Validity</label>
          </div>
          <div className="col-xs-12 col-sm-6">
            <fieldset className="form-group">
              <div className="input-group">
                <DateTimeField
                  mode="date"
                  placeholder="From"
                  buttonIcon="icons8-date-from"
                  onChange={fields.validityFrom.onChange}
                  defaultText={fields.validityFrom.value}
                  inputProps={{
                    id: joid.link(false, 'input')
                  }}/>
              </div>
            </fieldset>
          </div>
          <div className="col-xs-12 col-sm-6">
            <fieldset className="form-group">
              <label className="sr-only" htmlFor={joid.link(true, 'input')}>From</label>
              <div className="input-group">
                <DateTimeField
                  mode="date"
                  placeholder="To"
                  buttonIcon="icons8-date-to"
                  onChange={fields.validityTo.onChange}
                  defaultText={fields.validityTo.value}
                  inputProps={{
                    id: joid.link(false, 'input')
                  }}/>
              </div>
            </fieldset>
          </div>
        </div>

        <fieldset className="form-group">
          <label htmlFor={joid.link(true, 'input')}>Discount Code</label>
          <input
            type="text"
            className="form-control"
            id={joid.link(false, 'input')}
            placeholder="B1G1F"
            {...fields.discountCode}/>
        </fieldset>

        <div className="row">
          <div className="col-xs-6">
            <button type="button" className="btn btn-block btn-secondary">Preview</button>
          </div>

          <div className="col-xs-6">
            <button type="submit" className="btn btn-block btn-primary">Save</button>
          </div>
        </div>
      </form>
    );
  }
};

export default CreateCouponForm;