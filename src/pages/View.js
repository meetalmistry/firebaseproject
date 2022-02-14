import React, {useState, useEffect} from 'react';
import fireDb from "../firebase";
import {useParams, Link} from "react-router-dom";
import './View.css';

const View = () => {
  const [user, setUser] = useState({});
  const {id} = useParams();

  useEffect(() => {
    fireDb.child(`Products/${id}`).get().then((snapshot)=> {
      if(snapshot.exists()){
        setUser({...snapshot.val()})
      } else {
        setUser({});
      }
    });
  }, [id]);

  console.log("user", user);

  return (
    <div style={{ marginTop: "150px"}}>
      <div className='.card__view'>
        <div className='card-header'>
          <p>Product Detail</p>
        </div>
        <div className='container'>
            <strong>ID:</strong>
            <span>{id}</span>
            <br />
            <br />
        </div>
        <div className='container'>
            <strong>Product Title:</strong>
            <span>{user.productTitle}</span>
            <br />
            <br />
        </div>
        <div className='container'>
            <strong>Product Description:</strong>
            <span>{user.productDescription}</span>
            <br />
            <br />
        </div>
        <div className='container'>
            <strong>Price:</strong>
            <span>{user.price}</span>
            <br />
            <br />
        </div>
        <div className='container'>
            <strong>Stars:</strong>
            <span>{user.starts}</span>
            <br />
            <br />
        </div>
        <div className='container'>
            <strong>Rating:</strong>
            <span>{user.rating}</span>
            <br />
            <br />
        </div>
        <div className='container'>
            <strong>Reviews:</strong>
            <span>{user.reviews}</span>
            <br />
            <br />
            <Link to="/">
              <button className='btn btn-edit'>Go Back</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default View;