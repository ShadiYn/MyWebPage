// src/components/Router.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Page1 from '../pages/movieInfo';
import BookJournal from '../pages/Bookjournal';
import Create from '../pages/bookCreate';
import SeeMessages from '../pages/SeeMessages';
import WriteMessage from '../pages/WriteMessage';
import Mensajes from '../pages/Mensajes';

const Router = ({ userId, setUserId }) => {  // Recibe userId y setUserId desde App.js

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/movieInfo" element={<Page1 />} />
                <Route path="*" element={<div>404 - Not Found</div>} />
                <Route path="/book-journal" element={<BookJournal />} />
                <Route path="create" element={<Create />} />
                <Route path="/seeMessages" element={<SeeMessages />} />
                <Route path="/writeMessage" element={<WriteMessage />} />

                {/* Pasa setUserId a Mensajes */}
                <Route path="/mensajes" element={<Mensajes setUserId={setUserId} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
