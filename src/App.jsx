import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/Home";
import FoodItemDetails from "./components/FoodItemDetails";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";

export const CartContext = createContext(null)

function App() {
  const itemsLocal = JSON.parse(localStorage.getItem("Items"))
  const [cartArray, setCartArray] = useState( itemsLocal !== null ? itemsLocal :  [])

  useEffect(() => {
    localStorage.setItem("Items", JSON.stringify(cartArray))
  })

  const removeCartItem = (id) => {
      const updatedCartItems = cartArray.filter((each) => each.id !== id)
      setCartArray(updatedCartItems)
  }

  return (
    <Router>
      <CartContext.Provider value={{cartArray,setCartArray,removeCartItem}}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food/:id/" element={<FoodItemDetails/>} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="*" element={<NotFound/>} />
      </Routes>
      </CartContext.Provider>
    </Router>
  )
}

export default App;