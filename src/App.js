import React from 'react';
import { Stack } from 'react-bootstrap';
import NavigationBar from './containers/NavigationBar';
import MapContainer from './containers/MapContainer';
import About from './components/About';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <NavigationBar />
      <Stack as="main" direction="vertical">
        <MapContainer />
        <About />
        <Footer />
      </Stack>
    </div>
  );
};

export default App;
