import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateForm, updateFullForm, setFormDisabled } from '../actions/user';
import { inventoryStoreType } from '../reducers/types';
import CustomerAdd from '../components/Customer/CustomerAdd';

function mapStateToProps(state: inventoryStoreType) {
  console.log('login state', state);
  const { addItem } = state;
  addItem.formDisabled =
    addItem.formDisabled === undefined ? true : addItem.formDisabled;
  return {
    addItem
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
