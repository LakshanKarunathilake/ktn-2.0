import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  updateForm,
  updateFullForm,
  setFormDisabled
} from '../actions/customer';
import { inventoryStoreType } from '../reducers/types';
import CustomerAdd from '../components/Customer/CustomerAdd';

function mapStateToProps(state: inventoryStoreType) {
  console.log('login state', state);
  const { addCustomer } = state;
  addCustomer.formDisabled =
    addCustomer.formDisabled === undefined ? true : addCustomer.formDisabled;
  return {
    addCustomer
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      updateFullForm,
      updateForm,
      setFormDisabled
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAdd);
