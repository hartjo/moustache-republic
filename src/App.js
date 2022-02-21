import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, NavDropdown, Row, Col, Image, Alert } from 'react-bootstrap';
import { useState } from 'react';

function App() {

  const [selectedSize, setSelectedSize] = useState('');

  const [cart, setCart] = useState([]);

  const [errorSize, setErrorSize] = useState(false);

  const [itemAdded, setItemAdded] = useState(false);

  const selectSizeHandler = (size) => {

    if (size === selectedSize) {
      setSelectedSize('');
    } else {
      setSelectedSize(size)
    }

  }

  const addToCart = () => {

    if (selectedSize === '') {
      setErrorSize(true);
      setItemAdded(false);
    } else {
      setErrorSize(false);

      let cartResult = cart.find(item => item.size === selectedSize);

      if (cartResult) {
        const cartIndex = cart.indexOf(cartResult);
        cart[cartIndex].count = cart[cartIndex].count + 1;
        // setCart(prevValue => cart);
        setCart(prevState => [...cart]);
      } else {

        let addedItem = {
          size: selectedSize,
          name: "Classic Tee",
          count: 1
        };

        setCart(prevState => [...prevState, addedItem]);
      }

      setItemAdded(true);
      setSelectedSize('');

      setTimeout(() => {
        setItemAdded(false);
      }, 3000);

    }
    

  }

  const removeItem = (selectedCart) => {
    const cartIndex = cart.indexOf(selectedCart);

    cart.splice(cartIndex, 1);

    setCart(prevState => [...cart]);

  }

  return (
    <Container className='main-container'>

      <Navbar bg="light" className='main-header mt-3'>
        <Container>
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav className="ms-auto">
              <NavDropdown title={"My Cart( " + (cart.length) + " )"} id="basic-nav-dropdown">
                <div className='cart'>
                  {
                    cart.map((cart, i) => {
                      return <div className='cart-item' key={i} >
                        <div className='cart-remove' onClick={() => removeItem(cart)}>remove</div>
                        <div className='cart-item-image'>
                          <img src='img/classic-tee.jpg' alt='sample'></img>
                        </div>
                        <div className='cart-item-desc'>
                          <p>{cart.name}</p>

                          <p>{cart.count}x <b>$75.00</b></p>

                          <p>Size: {cart.size}</p>
                        </div>
                      </div>
                    })
                  }
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className='item-container'>
        <Row >

          <Col md={6} className="item-image-container">

            <Image src='img/classic-tee.jpg' fluid></Image>

          </Col>


          <Col md={6}>

            <div className='item-title'>Classic Tee</div>

            <hr></hr>

            <div className='item-price'>$75.00</div>

            <hr></hr>

            <p className='item-desc'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor sapien, scelerisque faucibus suscipit ullamcorper, vehicula ut velit. Pellentesque et magna mi. Etiam sit amet fringilla nunc. Vestibulum venenatis lacus vitae magna lacinia, at cursus libero aliquet. Nunc in gravida nibh. Nulla elit sapien, tempus sed interdum non, facilisis eget ex.
            </p>

            <div className='item-size-container'>
              <div>
                SIZE<span className='item-required-indicator'>*</span>
              </div>

              <div className='item-size-selection'>

                <div className={selectedSize === 'S' ? 'item-size selected' : 'item-size'} onClick={() => selectSizeHandler('S')}>
                  <span className='item-text'>S</span>
                </div>

                <div className={selectedSize === 'M' ? 'item-size selected' : 'item-size'} onClick={() => selectSizeHandler('M')}>
                  <span className='item-text'>M</span>
                </div>

                <div className={selectedSize === 'L' ? 'item-size selected' : 'item-size'} onClick={() => selectSizeHandler('L')}>
                  <span className='item-text'>L</span>
                </div>

              </div>
            </div>

            {
              errorSize ?
                (
                  <Alert key="danger" variant="danger" className='mt-3'>
                    Please select size in order to add your item!
                  </Alert>
                ) :
                ""
            }

            {
              itemAdded ?
                (
                  <Alert key="success" variant="success" className='mt-3'>
                    Item Added!
                  </Alert>
                ) :
                ""
            }


            <div className='item-controls'>

              <button className='btn' onClick={addToCart}>ADD TO CART</button>
            </div>

          </Col>

        </Row>
      </Container>

    </Container>
  );
}

export default App;
