import './App.css';
import Navbar from './components/Navbar';
import millennium from './png/millennium.png'

function App() {
  return (
    <>
      <Navbar />
      <div>
        {/* <div>
          <h2>"Never Tell Me The Odds!"</h2>
          <p>An extensively modified Corellian light freighter, the Millennium Falcon is a legend in smuggler circles and is coveted by many for being the fastest hunk of junk in the galaxy.</p>
          <button>Shop now</button>
        </div> */}
      </div>
      <img className='w-full mt-14' src={ millennium } alt="" />
    </>
  );
}

export default App;
