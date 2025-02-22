import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { config } from '../config/config';

interface SearchProps {
  onSearch: (city: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  return (
    <div className="mb-8">
      <GooglePlacesAutocomplete
        apiKey={config.PLACES_API_KEY}
        selectProps={{
          className: "text-gray-800",
          placeholder: 'Search for a city...',
          onChange: (place) => {
            if (place) {
              onSearch(place.label);
            }
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.5rem',
              padding: '0.25rem',
            }),
            input: (provided) => ({
              ...provided,
              color: 'white',
            }),
            placeholder: (provided) => ({
              ...provided,
              color: 'rgba(255, 255, 255, 0.5)',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'white',
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: 'white',
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: 'rgb(31, 41, 55)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.5rem',
            }),
          },
        }}
       
      />
    </div>
  );
};

export default Search;