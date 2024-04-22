import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const TrackingSearch = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/track/${trackingNumber}`);
  };

  return (
    <div className="search-tracking">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese su número de seguimiento"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default TrackingSearch;
