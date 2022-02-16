import { Provider } from 'react-redux';
import Head from './component/Head';
import store from './redux/course/store'
import CourseContainer from './component/CourseContainer';
//import Courselist from './component/Courselist';
import Body from './component/FilterBar';
import FilterBar from './component/FilterBar';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Head/>
        <div>
          <FilterBar/>
        </div>
        <div>
          <CourseContainer/>
        </div>
        <div>
          {/* <Courselist/> */}
          <Body/>
        </div>
        
      </div>
    </Provider>
    
  );
}

export default App;
