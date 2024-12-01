import { useContext, useState } from "react"
import { CartContext } from "../../App"
import Header from "../Header"
import "./index.css"
import CartItems from "./CartItems"
import OtpPopup from "./OtpPopup"
import OrderConfirmationPopup from "./OrderConformation"
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Cart = () => {
    const { cartArray } = useContext(CartContext)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isOtpOpen, setOtpOpen] = useState(false);
    const [error, setError] = useState('');
    const [orderId,setOrderId] = useState("")
    const [showPopup, setShowPopup] = useState(false);

    const totalAmmount = cartArray.reduce((accumeletor, cuurent) => accumeletor + cuurent.price * cuurent.quantity, 0)
    console.log(totalAmmount)
    const onSubmitingForm = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${backendUrl}/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: phoneNumber, email: email }),
            });
            if (response.ok) {
                const data = await response.json();
                //console.log(data.message);
                setOtpOpen(true)
            } else {
                const error = await response.json();
                console.error("Error requesting OTP:", error.message);
            }
        } catch (error) {
            console.error("Network error:", error.message);
        }


    }

    const onChangeNumber = (event) => {
        setPhoneNumber(event.target.value)
    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleVerify =  async (otp) => {
        try {
            const response = await fetch(`${backendUrl}/verify-otp`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ phone:phoneNumber, otp:otp ,email:email }),
            });
            const data = await response.json();
            if (data.success) {
                console.log(data)
                setOrderId(data.orderId)
                setShowPopup(true)
              console.log('OTP verified successfully!')
              setError('');
            } else {
               console.log('Invalid OTP. Please try again.')
              setError(data.message || 'Invalid OTP. Please try again.');
            }
          } catch (err) {
            console.log('Error verifying OTP: ' + err.message)
            setError('Error verifying OTP: ' + err.message);
          }

        setOtpOpen(false);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
      };
    

    return <div>
        <Header />
        <div className="cart-continer">
            <ul className="cart-list-ul-container">
                {cartArray.map((each) => <CartItems cartitem={each} key={each.id} />)}
            </ul>
            <div className="proced-container">
                <div className="proced-buton-container">

                    <p className="total">Total</p>
                    <p className="total-ammount">&#8377; {totalAmmount}</p>
                </div>
            </div>
            <form className="checkout-form-container" onSubmit={onSubmitingForm} >
                <input type="text" value={name} onChange={onChangeName} className="input-feild" minLength="4" placeholder="name" required />
                <input type="email" value={email} onChange={onChangeEmail} className="input-feild" placeholder="email" required />
                <input type="tel" value={phoneNumber} pattern="[0-9]{10}" onChange={onChangeNumber} className="input-feild" inputMode="numeric" minLength="10" maxLength="10" placeholder="Enter phone number" required />
                <button className="proceed-button" type="submit" >Proceed</button>
            </form>
        </div>
        <div>
            <OtpPopup
                isOpen={isOtpOpen}
                onClose={() => setOtpOpen(false)}
                onVerify={handleVerify}
            />
         {showPopup && <OrderConfirmationPopup orderId={orderId} onClose={handleClosePopup} />}

        </div>
    </div>
}

export default Cart