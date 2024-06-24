import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  LoginPage, 
  Resetpage, 
  SignPage, 
  HomePage, 
  Recoverpage, 
  Allcategorypage, 
  Forgetpasswordpage, 
  Aboutpage,
  Profilepage,
  Sellpage,
  Choosecategorypage,
  CategoryListpage,
  Contactpage,
  Accountpage,
  Settingspage,
  ChangePasswordpage,
  Editprofilepage,
  Airjordpage,
  Dashboardpage
} from './Routes.js'; // Adjust this path based on your project structure

function App() {
  return (
    <div>  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/Sign' element={<SignPage />} />
          <Route path='/fogetpassword' element={<Forgetpasswordpage />} />
          <Route path='/reset' element={<Resetpage />} />
          <Route path='/recovered' element={<Recoverpage />} />
          <Route path='/Allcategorypage' element={<Allcategorypage />} />
          <Route path='/Aboutpage' element={<Aboutpage />} />
          <Route path='/Profilepage' element={<Profilepage />} />
          <Route path='/post-ad/:categoryId/:subcategoryId' element={<Sellpage />} />
          <Route path='/category/:categoryId' element={<Choosecategorypage />} />
          <Route path='/CategoryListpage' element={<CategoryListpage />} />
          <Route path='/Settingspage' element={<Settingspage />} />
          <Route path='/Accountpage' element={<Accountpage />} />
          <Route path='/ChangePasswordpage' element={<ChangePasswordpage />} />
          <Route path='/Editprofilepage' element={<Editprofilepage />} />
          <Route path='/Contactpage' element={<Contactpage />} />
          <Route path='/product/:id' element={<Airjordpage />} />
          <Route path='/Dashboardpage' element={<Dashboardpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
