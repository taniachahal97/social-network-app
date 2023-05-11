import {NewMessage} from './pages/NewMessage'
import {Home} from './pages/Home'
import {Chat} from './pages/Chat'
import Signup from './pages/Signup';
import Login from './pages/Login';
import './styles/normalize.css';
import './styles/skeleton.css';
import {Navbar} from './components/Navvbar.js'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});


// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
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
          <Route 
            path="/chat/:chatId"
            element={<Chat />}
          />
        </Routes>
      </BrowserRouter>
    </div>
    </ApolloProvider>
  );
}

export default App;
