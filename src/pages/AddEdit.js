import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import './AddEdit.css';
import fireDb from "../firebase";

const initialState = {
    productTitle:"",
    price:"",
    stars:"",
    rating:"",
    reviews:"",
    productDescription:""
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});
    
    const {productTitle, productDescription, price, stars, rating, reviews} = state;
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        fireDb.child("Products").on("value", (snapshot)=> {
            if(snapshot.val() !== null) {
                setData({...snapshot.val()});
            }else{
                setData({});
            }
        });

        return () => {
            setData({});
        };
    }, [id]);

    useEffect(() => {
        if(id) {
            setState({...data[id]});
        }else{
            setState({...initialState});
        }

        return () => {
            setState({...initialState});
        };
    }, [id, data]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!productTitle || productDescription || !price || !stars || !rating || !reviews){
            console.error("Please provide values in each input field")
        } else {
            if (!id) {
                fireDb.child("Products").push(state, (err) => {
                    if(err) {
                        console.error(err);
                    } else {
                        console.success("Product Added Successfully");
                    }
                });
            } else {
                fireDb.child(`Products/${id}`).set(state, (err) => {
                    if(err) {
                        console.error(err);
                    } else {
                        console.success("Product Updated Successfully");
                    }
                });
            }
            setTimeout(() => navigate("/"), 500);
        }
    };

  return (<div style={{marginTop: "100px"}}>
      <form 
      style={{
          margin:"auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent:"center",
      }}
      onSubmit={handleSubmit}
      >
        <label htmlFor='productTitle'>Product Title</label>
        <input  
        type="text"
        id="productTitle"
        name="productTitle"
        placeholder='Enter Product Title'
        value={productTitle || ""}
        onChange={handleInputChange}
        />
        <label htmlFor='productDescription'>Product Title</label>
        <input  
        type="text"
        id="productDescription"
        name="productDescription"
        placeholder='Enter Product Description'
        value={productDescription || ""}
        onChange={handleInputChange}
        />
        <label htmlFor='price'>Product Price</label>
        <input  
        type="text"
        id="price"
        name="price"
        placeholder='Enter Product price'
        value={price || ""}
        onChange={handleInputChange}
        />
        <label htmlFor='stars'>Product Stars</label>
        <input  
        type="text"
        id="stars"
        name="stars"
        placeholder='Enter Product stars'
        value={stars || ""}
        onChange={handleInputChange}
        />
        <label htmlFor='rating'>Product rating</label>
        <input  
        type="text"
        id="rating"
        name="rating"
        placeholder='Enter Product rating'
        value={rating || ""}
        onChange={handleInputChange}
        />
        <label htmlFor='reviews'>Product review</label>
        <input  
        type="text"
        id="reviews"
        name="reviews"
        placeholder='Enter Product reviews'
        value={reviews || ""}
        onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"}/>

      </form>
  </div>
  );
};

export default AddEdit;
