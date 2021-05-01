import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import '../styles/form.scss';
import '../styles/lyrics.scss';
import '../styles/index.scss';

import getLyrics from '../helpers/data/lyricData';

function App() {
  const [showLyrics, setShowLyrics] = useState('');
  const [lyricObject, setLyricObject] = useState({
    artist: '',
    title: ''
  });
  const [showArtistTitle, setShowArtistTitle] = useState({
    artist: '',
    title: ''
  });

  const lyricTime = () => {
    getLyrics(lyricObject.artist, lyricObject.title).then((lyrics) => {
      setShowLyrics(lyrics);
    });
    setShowArtistTitle({
      artist: lyricObject.artist,
      title: lyricObject.title
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLyricObject({
      artist: '',
      title: ''
    });
    lyricTime();
  };

  const handleLyricObject = (e) => {
    setLyricObject({ ...lyricObject, [e.target.id]: e.target.value });
  };

  return (
    <div className="App">
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup id="formGroup">
          <Label for="artist">Artist</Label>
          <Input
            id="artist"
            placeholder="Band Of Horses"
            value={lyricObject.artist}
            onChange={handleLyricObject}
          ></Input>
        </FormGroup>
        <FormGroup id="formGroup">
          <Label for="title">Title</Label>
          <Input
            id="title"
            placeholder="Funeral"
            value={lyricObject.title}
            onChange={handleLyricObject}
          ></Input>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
      <div>
        <h2 id="artistInfo">
          {showArtistTitle.title}
          <br></br>
          {showArtistTitle.artist}
        </h2>
        <hr></hr>
        <p id="contentContainer">{showLyrics}</p>
      </div>
    </div>
  );
}

export default App;
