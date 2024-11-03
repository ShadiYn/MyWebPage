import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Page1 from '../pages/movieInfo';
import BookJournal from '../pages/Bookjournal'
import Create from '../pages/bookCreate'
import SeeMessages from '../pages/SeeMessages'
import WriteMessage from '../pages/WriteMessage'
import Mensajes from '../pages/Mensajes'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />

                <Route path='/movieInfo' element={<Page1 />} />
                <Route path="*" element={<div>404 - Not Found</div>} />
                <Route path="/book-journal" element={<BookJournal />}></Route>
                <Route path='create' element={<Create></Create>}></Route>

                <Route path="/seeMessages" element={<SeeMessages />} />

                <Route path="/writeMessage" element={<WriteMessage />} />

                   <Route path="/mensajes" element={<Mensajes />} />





            </Routes>
        </BrowserRouter>
    );
};

export default Router;
