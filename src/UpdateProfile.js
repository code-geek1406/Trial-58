import React, { useState } from "react";
import "./UpdateProfile.css"
import UploadImage from "./UploadImage";
import firebase from "firebase"




function UpdateProfile(){
    const db= firebase.firestore();
    const storage= firebase.storage();
    const [data, setData]= useState({
    firstname:"",
    lastname:"",
    email:"",
    dateofbirth:"",
    address:"",
    image:null
});



    function HandleChange(e){
        e.preventDefault();
        const{name,value}=e.target;
        setData((prev)=>{
            return{...prev,[name]:value};
            });
    }
    function RegisterUser(e){
        e.preventDefault();
        const uploadTask= storage.ref("Users"+data.image.name).put(data.image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                let progress;
                progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(progress);
            },
            (err)=>{
                console.log(err)
            },
            ()=>{
                storage.ref("Users")
                .child(data.image.name)
                .getDownloadURL()
                .then((imageUrl)=>{
                    db.collection("UserData")
                    .doc(data.name)
                    .set({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                        dateofbirth: data.date,
                        address: data.address,
                        image: imageUrl,
                    })
                    .then(()=>{
                        setData({
                            firstname:"",
                            lastname:"",
                            email:"",
                            dateofbirth:"",
                            address:"",
                            image:null

                        })
                    })
                })
            }
        )
    }





    return(
        <div className="update-profile-main">
            <div className = "container" id= "container">
                <div className ="form-container registration-container">
                    <form action="#">
                        <input type= "text" onChange={HandleChange} placeholder="First Name" name="firstname" value= {data.firstname}></input>
                        <input type= "text" onChange={HandleChange} placeholder="Last Name" name="lastname" value={data.lastname}></input>
                        <input type= "email" onChange={HandleChange} placeholder="Email Address" name="email" value={data.email}></input>
                        <input type="date" onChange={HandleChange} placeholder="Date of Birth" name= "dateofbirth" value={data.date}></input>
                        <input type= "text" onChange={HandleChange} placeholder="Address" name="address"value={data.address}></input>
                        <button style= {{marginTop: "10px"}}onClick={RegisterUser}>Update Profile</button>
                    </form>
                </div>
                <div className="overlay-container">
                            <div className="overlay">
                                <div className= "overlay-panel overlay-right">
                                    <UploadImage setData={setData}/>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    )
}
export default UpdateProfile;