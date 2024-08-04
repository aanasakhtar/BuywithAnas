import res from "./setup";
import { useState } from "react";
import "../styles/cart.css";

let cartfn = res.cartFunctionality;

export default function Cart() {
    const [num, setNum] = useState(cartfn.getLength());
    let ref = cartfn.getLength();

    return (
        <div className="cart-container">
            <div className="heading">
                <div>{num === ref ? num : ref} Games</div>
                <button onClick={() => {
                    cartfn.clearCart();
                    setNum((prev) => {return prev + 1})
                }}>Clear</button>
            </div>
            <main>
                {
                    cartfn.getCart().map((obj) => {
                        return (
                            <div className="cartitem" key={obj.id}>
                                <div className="itemimage" style={{backgroundImage: 'url(' + obj.image + ')'}}></div>
                                <div>
                                    <button onClick={() => {
                                        cartfn.removeFromCart(obj.id);
                                        setNum(cartfn.getLength());
                                    }}>X</button>
                                    <span>{obj.name}</span>
                                    <span>${obj.price}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </main>
            <div className="bottom">Total: ${cartfn.getTotalPrice()}</div>
        </div>
    );
}