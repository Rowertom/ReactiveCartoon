import logo from './logo.svg';
import './App.css';
import { CardList } from '../cardList/CardList';

function App() {
  return (
    <>
      <header className='container'>

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
      </header>
      <main className='container'>
        <CardList/>
      </main>
      <footer className='container'>
        footer
      </footer>
    </>
  );
}

export default App;
