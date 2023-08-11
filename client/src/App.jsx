import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// import { logo } from './assets';
import { Home, CreatePost } from './page';

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        {/* <img src={logo} alt="logo" className="w-28 object-contain" /> */}
        <h1 className="text-lg font-light">ART MONSTER</h1>
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-md">이미지 생성</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
