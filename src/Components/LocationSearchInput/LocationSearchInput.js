import React, {useState} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './LocationSearchInput.css';
 
const LocationSearchInput = (props) => {
  const [address,setAddress] = useState();
  const [latLng, setLatLng] = useState([]);

  const handleChange = (text) => {
    console.log(text);
    setAddress(text);
  };

  const handleSelect = async address => {
    let latlng = await geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          console.log('Success', latLng);
          return latLng;
        }).catch(error => console.error('Error', error));
    setLatLng([latlng.lat,latlng.lng]);
    let geocode = await geocodeByAddress(address);
    let town = geocode[0].formatted_address;
    setAddress(town);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(latLng[0],latLng[1]);
  }
  
    return (
    <>
      <form onSubmit={handleSubmit}>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="input__dropdown">
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span className="dropdown__suggestion">{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <button className="search">search</button>
        </form>
    </>
    );
}

export default LocationSearchInput;