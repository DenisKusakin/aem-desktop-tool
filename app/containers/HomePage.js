import {connect} from 'react-redux'
import Home from '../components/Home';
import {homePageMount} from './../actions';

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(homePageMount())
})

export default connect(null, mapDispatchToProps)(Home)