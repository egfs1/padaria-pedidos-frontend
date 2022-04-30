import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { ProductEdit } from './pages/Products/ProductEdit';
import { ProductIndex } from './pages/Products/ProductIndex';
import { ProductNew } from './pages/Products/ProductNew';

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<ProductIndex />}/>
          <Route path="/products/new" element={<ProductNew />}/>
          <Route path="/products/edit/:id" element={<ProductEdit />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
