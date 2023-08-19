import "../index.css";
import EditProfilePopup from "./EditProfilePopup";
import { useState, useEffect } from "react";
import { ChangeAvatarPopup } from "./ChangeAvatarPopup";
import { ImagePopup } from "./ImagePopup";
import { InfoTooltip } from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import { AddCardPopup } from "./AddCardPopup";
import { DeleteCardPopup } from "./DeleteCardPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { api } from "../utils/Api";
import { auth } from "../utils/auth";
import Main from "./Main";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwt"));
  const [email, setEmail] = useState(" ");

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  useEffect(() => {}, [cards]);

  const [editProfilePopupIsOpened, setEditProfilePopupIsOpened] =
    useState(false);
  const [infoTooltipIsOpened, setInfoTooltipIsOpened] = useState(false);
  const [addCardPopupIsOpened, setAddCardPopupIsOpened] = useState(false);
  const [changeAvatarPopupIsOpened, setChangeAvatarPopupIsOpened] =
    useState(false);
  const [deleteCardPopupIsOpened, setDeleteCardPopupIsOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (e) => {
    setSelectedCard({ name: e.target.alt, link: e.target.src });
  };
  const closeAllPopups = (e) => {
    setEditProfilePopupIsOpened(false);
    setAddCardPopupIsOpened(false);
    setChangeAvatarPopupIsOpened(false);
    setDeleteCardPopupIsOpened(false);
    setInfoTooltipIsOpened(false);
    setSelectedCard({});
  };

  const handleClosePopup = (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("button-close")
    ) {
      closeAllPopups();
    }
  };

  const handleEditProfile = () => setEditProfilePopupIsOpened(true);
  const handleAddCard = () => setAddCardPopupIsOpened(true);
  const handleEditAvatar = () => setChangeAvatarPopupIsOpened(true);
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  async function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((newCards) => newCards.filter((c) => card._id !== c._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(name, about) {
    api
      .editProfile({ name: name, about: about })
      .then((newInfo) => {
        setCurrentUser(newInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(URL) {
    api
      .changeAvatar(URL)
      .then((newInfo) => {
        setCurrentUser(newInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace(card) {
    api
      .addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleSignUp(email, password) {
    auth
      .signUp(email, password)
      .then((res) => {
        setTooltipIsOk(true);
        setInfoTooltipIsOpened(true);
      })
      .catch((err) => {
        setTooltipIsOk(false);
        setInfoTooltipIsOpened(true);
      });
  }

  function handleSignIn(email, password) {
    auth
      .signIn(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setEmail(email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setTooltipIsOk(false);
        setInfoTooltipIsOpened(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setEmail(" ");
    setLoggedIn(false);
    navigate("/login");
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          setTooltipIsOk(true);
          setInfoTooltipIsOpened(true);
          console.log(err);
        });
    }
  }, []);

  const [tooltipIsOk, setTooltipIsOk] = useState(true);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header handleLogout={handleLogout} email={email} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main
                cards={cards}
                onEditProfile={handleEditProfile}
                onAddCard={handleAddCard}
                onEditAvatar={handleEditAvatar}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login handleSignIn={handleSignIn} />} />
        <Route
          path="/register"
          element={<Register handleSignUp={handleSignUp} />}
        />
      </Routes>
      <Footer />

      <InfoTooltip
        isOpened={infoTooltipIsOpened}
        onClose={handleClosePopup}
        isOk={tooltipIsOk}
      />
      <ImagePopup onClose={handleClosePopup} card={selectedCard} />
      <ChangeAvatarPopup
        isOpened={changeAvatarPopupIsOpened}
        onClose={handleClosePopup}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpened={editProfilePopupIsOpened}
        onClose={handleClosePopup}
        onUpdateUser={handleUpdateUser}
      />
      <AddCardPopup
        isOpened={addCardPopupIsOpened}
        onClose={handleClosePopup}
        onAddPlace={handleAddPlace}
      />
      <DeleteCardPopup
        isOpened={deleteCardPopupIsOpened}
        onClose={handleClosePopup}
      />
    </CurrentUserContext.Provider>
  );
}
