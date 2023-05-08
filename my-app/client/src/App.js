import {NewMessage} from './pages/NewMessage'
import {Home} from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';
import './styles/normalize.css';
import './styles/skeleton.css';
import {Navbar} from './components/Navvbar.js'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="Container">
      <BrowserRouter>
        <header className="container">
          <Navbar />
        </header>
        <Routes>
          <Route 
            path="/new-message"
            element={<NewMessage />}
          />
          <Route 
            path="/"
            element={<Home />}
          />
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/signup" 
            element={<Signup />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
    </ApolloProvider>
  );
}

export default App;
