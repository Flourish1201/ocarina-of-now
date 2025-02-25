import React from 'react';
import '../input.css'; // Import the CSS file
import InteractiveOcarina from './InteractiveOcarina.jsx';
import ToneTest from './ToneTest.jsx';
import RecordButton from './RecordButton.jsx';
import SaveButton from './SaveButton.jsx';
import CommunityBoard from './CommunityBoard.jsx'
import axios from 'axios';

const App = () => {
  const [songs, setSongs] = React.useState([]);
  React.useEffect(() => {
    axios.get('http://localhost:3000/community/songs')
    .then(res => {
      setSongs(res.data);
    })

  }, []);
  const onRecord = (notes) => {
    axios.post('http://localhost:3000/community/songs', {data: notes})
    .then(res => {
      console.log(res);
      axios.get('http://localhost:3000/community/songs')
      .then(res => {
        setSongs(res.data);
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  return (
    <div>
      <h1>Welcome to Ocarina of Now</h1>
      <CommunityBoard songs={songs}/>
      <ToneTest onRecord={onRecord}/>
      <InteractiveOcarina />
      {/* <SongRecorder /> */}
      {/* <RecordButton />
      <SaveButton /> */}
    </div>
  )
};

export default App;