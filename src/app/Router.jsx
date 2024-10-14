import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Page1 from '../pages/movieInfo';
import BookJournal from '../pages/Bookjournal'
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/movieInfo' element={<Page1 />} />
                <Route path="*" element={<div>404 - Not Found</div>} />
                <Route path="/book-journal" element={<BookJournal />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
