import React from 'react';
import data from './data';

function App() {
  return (
    <div className="grid-container">
            <header className="row">
                <div>
                    <a href="Index.html" className="brand">420Pipes&Glass</a>
                </div>
                <div>
                    <a href="Cart.html">Cart</a>
                    <a href="SignIn.html">Sign In</a>
                </div>
            </header>
            <main>
               <div className="row center">

               {
                   data.products.map(product=>(

                    <div key={product._id} className="card">
                      
                       <a href={`/product/${product._id}`}>
                           <img  className="medium" src={product.image} alt={product.name}/>
                       </a>

                       <div className="card-body">
                       <a href={`/product/${product._id}`}>
                               <h2>{product.name}</h2>
                           </a>

                           <div className="rating">
                               <span>
                                   <i className="fa fa-star"></i>
                               </span>

                               <span>
                                <i className="fa fa-star"></i>
                               </span>

                                <span>
                                <i className="fa fa-star"></i>
                                </span>

                                <span>
                                <i className="fa fa-star-half-o"></i>
                                </span>

                                <span>
                                <i className="fa fa-star-o"></i>
                                </span>
                           </div>

                           <div className="price">${product.price}</div>

                         </div>
                         </div>

                   ))
               }
                   
                  

                  

                    
                </div>

               
            </main>
            <footer className="row center">
                Sansil is the Creator of this Awesome Project
            </footer>
        </div>
  );
}

export default App;
