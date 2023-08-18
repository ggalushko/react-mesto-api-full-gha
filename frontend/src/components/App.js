import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditCardPopup from './EditCardPopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import ImagePopup from './ImagePopup.js'
import InfoTooltipPopup from './InfoTooltipPopup.js'
import api from '../utils/Api.js';
import CurrentUserContext from '../context/CurrentUserContext.js'
import Register from './Register.js'
import Login from './Login.js'
import ProtectedRouteElement from './ProtectedRoute.js';
import * as ApiAuth from '../utils/ApiAuth.js';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [success, setSuccess] = React.useState();

  function showError(err) {
    console.log('Error: ' + err);
  }

  function showErrorAuth(err) {
    setSuccess(false);
    console.log('Error: ' + err);
    handleAddCompleteClick();
  }

React.useEffect(() => {

  if (loggedIn) {
  
    api.load()
    .then(([{name, about, avatar, _id}, cards]) => {
      setCurrentUser({name, about, avatar, _id});
      setCards(cards);
    })
    .catch((err) => showError(err));
  }
}, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleAddCompleteClick() {
    setIsInfoTooltipPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard({name: '', link: ''})
  }

  React.useEffect(() => {

    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {

      document.addEventListener('keydown', handleEscClose);

      function handleEscClose(e) {

        if (e.key === 'Escape') {

          closeAllPopups();
          document.removeEventListener('keydown', handleEscClose);
        }
      }
    }

  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard])

  function closeClickPopup(event) {
    
    if (event.target.closest('.button-close') || !event.target.closest('[class*="container"]')) closeAllPopups();
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {

      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    
    }).catch((err) => showError(err))
  }

  function handleCardDelete(id) {

    api.deleteCard(id)
    .then((data) => {
      setCards((cards) => cards.filter(card => card._id !== id));
    })
    .catch((err) => showError(err))
  }

  function handleUpdateUser(data) {

    api.editProfile(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups()
    })
    .catch((err) => showError(err))
  }

  function handleUpdateAvatar(data) {

    api.updateAvatar(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups()
    })
    .catch((err) => showError(err))
  }

  function handleUpdateCard(data) {

    api.addCard(data)
    .then((data) => {
      setCards([data, ...cards]);
      closeAllPopups()
    })
    .catch((err) => showError(err))
  }

  function handleLogin(email, password) {
    ApiAuth.login(email, password).then((res) => {
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);
      setEmail(email);
      navigate('/')
    })
    .catch((err) => showErrorAuth(err));
  }

  function handleRegister(email, password) {
    ApiAuth.register(email, password).then((res) => {
      navigate('/sign-in', { replace: true })
      setSuccess(true);
      handleAddCompleteClick();
    })
    .catch((err) => showErrorAuth(err));
  }

  React.useEffect(() => {
  
    const jwt = localStorage.getItem('jwt');
  
    if (jwt){
  
      ApiAuth.tokenCheck(jwt).then((res) => {
  
        if (res){
  
          setLoggedIn(true);
          setEmail(res.email)
          navigate("/", {replace: true})
        }
      }).catch((err) => showErrorAuth(err));
    }
}, [])

  function signOut() {
    ApiAuth.exit()
    .then(() => {
      localStorage.removeItem('jwt');
      setLoggedIn(false)
      navigate('/')
    })
    .catch((err) => showErrorAuth(err));
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
    
        <Header email={email} onClick={signOut}/>

        <Routes>
          <Route path="/" element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />}
          />
            
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>

        <Footer />
    
      </div>
    
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onCloseClick={closeClickPopup} onUpdateAvatar={handleUpdateAvatar} />
    
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onCloseClick={closeClickPopup} onUpdateUser={handleUpdateUser} />
    
      <EditCardPopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCloseClick={closeClickPopup} onUpdateCard={handleUpdateCard}/>
    
      <ImagePopup card={selectedCard} onClose={closeAllPopups} onCloseClick={closeClickPopup} />

      <InfoTooltipPopup isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} onCloseClick={closeClickPopup} success={success} />

  </CurrentUserContext.Provider>

  );
}

export default App;