import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { inventoryStoreType } from '../reducers/types';
import { updateForm } from '../actions/purchase';
import View from '../components/Purchaising/View';

function mapStateToProps(state: inventoryStoreType) {
  const { purchase } = state;
  return {
    purchase
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

export default connect(mapStateToProps, mapDispatchToProps)(View);
