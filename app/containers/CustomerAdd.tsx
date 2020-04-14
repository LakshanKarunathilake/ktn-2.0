import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateForm } from '../actions/user';
import { inventoryStoreType } from '../reducers/types';
import CustomerAdd from '../components/Customer/CustomerAdd';

function mapStateToProps(state: inventoryStoreType) {
  console.log('login state', state);
  const { loginForm } = state;
  return {
    loginForm
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      updateForm
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAdd);
