import { lifecycle, compose } from 'recompose';
import logo from './logo.svg';
import './App.css';

const App = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit
        <code>
          src/App.js
        </code>
        and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

const enhance = compose(
  lifecycle({
    async componentDidMount() {
      const options = process.env.NODE_ENV === 'development' ? { headers: { 'x-api-key': process.env.REACT_APP_API_KEY } } : {};
      await fetch(
        // 'https://sushirowaiting.tszyanalau.com/api/healthCheck',
        `${process.env.REACT_APP_API_URL}/api/healthCheck`,
        options,
      );
    },
  }),
);

export default enhance(App);
