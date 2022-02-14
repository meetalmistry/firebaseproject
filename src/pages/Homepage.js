import React, {useState, useEffect} from "react";
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import './Homepage.css';

function Homepage() {
    const [data, setData] = useState({});

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
    }, []);

    const onDelete = (id) => {
        if (window.confirm("Are you sure ?")
        ) {
            fireDb.child(`Products/${id}`).remove();
        }
    };

    function Card(props){
        return(
            <div className="card">
                <div className="card__body">
                    <img src={props.img} alt="" className="card__img"/>
                    <h2 className="card__title">{props.productTitle}</h2>
                    <p className="card__description">{props.productDescription}</p>
                    <p className="card__price">{props.price}</p>
                    <p className="card__rating">{props.rating}</p>
                </div>
                
            </div>     
        );
    }

    return(
        <div className="wrapper">
            {Object.keys(data).map((id, index) => {
                    return (
                        <div>
                            <Card img="https://images.unsplash.com/photo-1574577458636-09dc294a0534?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                            productTitle={data[id].productTitle}
                            productDescription=""
                            price={data[id].price}
                            rating={data[id].rating}/>
                            <Link to={`/view/${id}`}>
                                <button className="card__btn">View</button>
                            </Link>
                        </div>
                    );
            }
            )
        }
        </div>);
  };
  
  export default Homepage;