import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import SignUp from '../components/Signup/Signup';
import { updateForm } from '../actions/user';
import { inventoryStoreType } from '../reducers/types';

function mapStateToProps(state: inventoryStoreType) {
  console.log('state', state);
  const { signupForm } = state;
  return {
    signupForm
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
