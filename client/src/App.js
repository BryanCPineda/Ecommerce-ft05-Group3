import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import CarouselBootstrap from "./components/Carousel/Carousel.jsx"

function App() {
  return (
    <div>
      <SearchBar />
      <CarouselBootstrap />
    </div>
  );
}

export default App;
