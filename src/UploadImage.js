import React, {useState, useEffect, useRef} from "react";
import "/UploadImage.css";
import { Button } from "react-bootstarp";
import { MdModeEdit } from "react-icons/md"


function UploadImage(props){
    const [file,setFile] = useState();
    const[previewUrl, setpreviewUrl] = useState();
    const filePickerRef = useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader= new FileReader();
        fileReader.onload=()=>{
            setpreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
        },[file]);
        function pickedHandler(event){
            let pickedFile;
            if(event.target.files && event.target.files.length===1){
                pickedFile= event.target.files[0];
                setFile(pickedFile);
                props.setData((prev)=>{
                    return{...prev, image:pickedFile};
                });
            }
        }

        function pickedImageHandler(){
            filePickerRef.current.click();
        }
        return(
            <div className = "form-control center">
                <input
                id= {props.id}
                ref= {filePickerRef}
                style= {{display: "none"}}>
                type= "file"
                accept= ".jpg, .png, .jpeg"
                onChange= {pickedHandler}</input>
                
              <div className={`image-upload ${props.center && "center"}`}>
              <div className= "image-upoad_preview">
                  {previewUrl && <img src={previewUrl} alt="preview"/>}
                  {!previewUrl &&(
                      <div className= "center">
                        <Button className="image-upload-button" type= "button" onClick={pickedImageHandler}>+</Button>
                        </div> 
                  )}
                  </div>          
                  <div>
                      {previewUrl &&(
                          <div className= "center">
                              <Button className= "image-upload-button" type="button" onClick={pickedImageHandler}>
                                  <MdModeEdit className= "icon"></MdModeEdit>
                              </Button>
                              </div>
                      )}
                      </div>     
            </div>
</div>
        )}
export default UploadImage;
