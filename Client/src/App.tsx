import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeatherRecommend from './pages/WeatherRecommend';
import { RouteConst } from './interface/RouteConst';
import Mypage from './pages/Mypage';
import Community from './pages/Community';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={RouteConst.WeatherRecommend}
          element={<WeatherRecommend />}
        />
        <Route path={RouteConst.MyPage} element={<Mypage />} />
        <Route path={RouteConst.Community} element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
