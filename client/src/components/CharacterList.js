import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('Skywalker');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get(`https://swapi.dev/api/people/?search=${search}`);
      setCharacters(response.data.results);
    };
    if (search) {fetchCharacters();}
  }, [search]);

  const toggleFavorite = (character) => {
    const updatedFavorites = favorites.includes(character)
      ? favorites.filter(fav => fav !== character)
      : [...favorites, character];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');    
    localStorage.removeItem('favorites');    
    navigate('/login'); 
  };

  if (localStorage.getItem('token') == null) {
    navigate('/login'); 
  }
  return (
    <div class="container">
      
      <div class="row mb-2 bg-dark py-2">
        <div class="col-10 text-white"><h2>Starwars: Personagens</h2></div>
        <div class="col-2">
          <button onClick={handleLogout} class="btn btn-danger">
            Logout 
            <i class="bi bi-box-arrow-right mx-2"/>
          </button></div>
      </div>
      
      <input class="form-control" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Busque os personagens.." />

      <div class="row mt-4 g-3">
        {characters.map(character => (
          <div class="col-2">
            <div class="character-card card shadow">
              <div class="card-header p-2 bg-light">
                <strong>{character.name} </strong> 
              </div>       
              <div class="card-body p-3">
              <small>{character.height}cm | {character.mass}kg</small>   
                <a class="mx-2" onClick={() => toggleFavorite(character)} href="#">
                  <i class={favorites.includes(character)?'bi bi-heart-fill text-danger':'bi bi-heart text-danger'}></i>
                </a>             
            </div> 
          </div>
        </div>
        ))}
      </div>

      <div class="row mt-4">
        <h4>Favoritos:</h4>
        <div class="row">
          {favorites.map(character => (
            <div key={character.name} class="col-2">
              <div class="card p-2 shadown">
                <a class="icon-link icon-link-hover" href="#" onClick={() => toggleFavorite(character)}>
                {character.name}<br/>
                <i class="bi bi-trash text-danger"/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default CharacterList;
