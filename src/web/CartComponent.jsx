import React,{ useEffect, useState }  from 'react'
import'../assets/css/web/Cart.css'
import { getCartByUserId,deleteCartItem } from '../services/CartService';
import { updateCartItemQuantity } from '../services/CartItemService';
import { useNavigate } from 'react-router-dom';
const CartComponent = () => {
    const [cart, setCart] = useState({
        cartItems: []
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const [quantity, setQuantity] = useState(2);

    useEffect(() => {
        loadCart();
    }, []);
    
    const loadCart = async () => {
        try {
            const res = await getCartByUserId();
            console.log(res.data);
            setCart(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(cart.cartItems.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };


    const handleIncrease = async (item) => {
        await updateCartItemQuantity(
            item.id,
            item.quantity + 1
        );
    
        loadCart();
    }
    const handleDecrease = async (item) => {

        if(item.quantity <= 1) return;
    
        await updateCartItemQuantity(
            item.id,
            item.quantity - 1
        );
    
        loadCart();
    }

    const totalPrice = cart?.cartItems?.reduce((sum, item) => {
        if (selectedItems.includes(item.id)) {
            return sum + item.product.price * item.quantity;
        }
        return sum;
    }, 0);


    const handleDelete = async (itemId) => {
        try {
            await deleteCartItem(itemId);
            // Tải lại giỏ hàng sau khi xóa
            loadCart();
            alert("Xóa sản phẩm thành công!");
        } catch (error) {
            console.error(error);
            alert("Xóa sản phẩm thất bại!");
        }
    };


    const navigate= useNavigate();

    const handleBuyNow = () => {

    if (selectedItems.length === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm!");
        return;
    }
    navigate("/checkout", {
        state: {
            cartItemIds: selectedItems
        }
    });
}

  return (
	<>
    <div className="container-cart">
        <div className="cart-header">
        <div className="check">
        <input
            type="checkbox"
            checked={
                cart?.cartItems?.length > 0 &&
                selectedItems.length === cart.cartItems.length
            }
            onChange={handleSelectAll}
        />
        </div>
        <div className="product">Sản phẩm</div>
        <div className="price">Đơn giá</div>
        <div className="quantity">Số lượng</div>
        <div className="total">Thành tiền</div>
        <div className="action">Thao tác</div>
        </div>
        {/* Product */}


    {cart?.cartItems?.map(item => (
    <div className="cart-item" key={item.id}>
        <div className="check">
        <input
            type="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={() => handleSelectItem(item.id)}
        />
        </div>

        <div className="product">
        <img
            src={`http://localhost:8080/uploads/${item.product.images?.[0]?.imageUrl}`}
            alt={item.product.name}
            style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px"
            }}
        />

            <div className="info">
                <h3>{item.product.name}</h3>
            </div>
        </div>

        <div className="price">
            {item.product.price.toLocaleString()}đ
        </div>

        <div className="quantity">
        <button onClick={() => handleDecrease(item)}>-</button>

            <input
                type="text"
                value={item.quantity}
                readOnly
            />

            <button onClick={() => handleIncrease(item)}>+</button>
        </div>

        <div className="total">
            {(item.product.price * item.quantity).toLocaleString()}đ
        </div>

        <div className="action">
            <button className="delete" onClick={() => handleDelete(item.id)} >
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
))}
    </div>
    <div className="checkout">
        <div>
        <input
            type="checkbox"
            checked={
                cart?.cartItems?.length > 0 &&
                selectedItems.length === cart.cartItems.length
            }
            onChange={handleSelectAll}
        />
        Chọn tất cả
        </div>
        <div className="checkout-right">
        <h2>
            Tổng cộng:
            <span>{totalPrice.toLocaleString()}đ</span>
        </h2>
        <button onClick={handleBuyNow}>Mua hàng</button>
        </div>
    </div>
    </>

  )
}

export default CartComponent