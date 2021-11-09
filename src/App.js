import './App.css';
import { Route, Link, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Layout from 'antd/lib/layout/layout';
import Home from './components/Home';
import { Space, Typography } from 'antd';
import Cryptocurrencies from './components/Cryptocurrencies';
import News from './components/News';
import CryptoDetails from './components/CryptoDetails';
import Exchanges from './components/Exchanges';

function App() {
  return (
  
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path='/cryptocurrencies' element={<Cryptocurrencies/>} />
                <Route path='/news' element={<News />} /> 
                <Route path='/crypto/:coinId' element={<CryptoDetails />} />
               <Route path='/exchanges' element={<Exchanges />} />
              </Routes>
            </div>
          </Layout>

          <div className="footer">
            <Typography.Title
              level={5}
              style={{ color: "white", textAlign: "center" }}
            >
              Cryptocoin <br />
              All rights reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
  
  );
}

export default App;
