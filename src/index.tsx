import './index.scss';
import ReactDOM from 'react-dom/client';
import App from "./app"
import { Provider } from 'react-redux';
import store from './provider/store';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './utils/authProvider';
import PathCreator from './utils/pathCreator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
 <Provider store={store}>
     <BrowserRouter>
       <AuthProvider>
          <PathCreator/>
          <App />
       </AuthProvider>
     </BrowserRouter>
 </Provider>
);
