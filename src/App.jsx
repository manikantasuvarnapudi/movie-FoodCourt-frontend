import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import FoodItemDetails from "./components/FoodItemDetails";
import Cart from "./components/Cart";

export const CartContext = createContext(null)

function App() {
  const itemsLocal = JSON.parse(localStorage.getItem("Items"))
  const [cartArray, setCartArray] = useState( itemsLocal !== null ? itemsLocal :  [])
  console.log(cartArray)
  useEffect(() => {
    localStorage.setItem("Items", JSON.stringify(cartArray))
  })

  return (
    <Router>
      <CartContext.Provider value={{cartArray,setCartArray}}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food/:id/" element={<FoodItemDetails/>} />
          <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </CartContext.Provider>
    </Router>
  )
}

export default App;