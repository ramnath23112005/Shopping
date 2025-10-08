import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { artistName } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate backend or adjust for actual fetch
    const data = {
      name: artistName,
      avatar: 'https://i.scdn.co/image/ab6761610000e5eb4e4d6b59dbf594c8fe3ef9c1',
      bio: `Welcome to ${artistName}'s profile.`,
      playlists: [`${artistName} Essentials`, `${artistName} Ballads`],
      likedSongs: [
        {
          title: 'Sample Track',
          artist: artistName,
          image: 'https://i1.sndcdn.com/artworks-000408801946-h7oq2u-t500x500.jpg',
        },
      ],
    };

    setUser(data);
  }, [artistName]);

  if (!user) return <div className="profile">Loading...</div>;

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={user.avatar} alt="User avatar" className="avatar" />
        <div className="user-info">
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
        </div>
      </div>

      <section className="profile-section">
        <h2>Playlists</h2>
        <ul className="playlist-list">
          {user.playlists.map((playlist, index) => (
            <li key={index}>🎵 {playlist}</li>
          ))}
        </ul>
      </section>

      <section className="profile-section">
        <h2>Liked Songs</h2>
        <div className="liked-songs">
          {user.likedSongs.map((song, index) => (
            <div key={index} className="liked-song-card">
              <img src={song.image} alt={song.title} />
              <div>
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
