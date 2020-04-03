import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import SignUp from '../components/Signup/Signup';
import { updateSignup } from '../actions/user';
import { counterStateType } from '../reducers/types';

function mapStateToProps(state: counterStateType) {
  const { counter,name } = state;
  return {
    counter,name
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      updateSignup
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
