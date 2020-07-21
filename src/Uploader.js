import React, { Fragment } from "react";
import axios from "./axios";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err: false,
        };
    }

    handleFileChange({ target }) {
        var myFile = target.files[0];
        this.setState({
            userImg: myFile,
            userImgSrc: URL.createObjectURL(myFile),
        });

        //////////

        // const fileReader = new FileReader();
        // const name = target.accept.includes("image") ? "images" : "videos";
        // // const self = this;

        // fileReader.readAsDataURL(target.files[0]);
        // fileReader.onload = (e) => {
        //     this.setState((prevState) => ({
        //         [name]: [...prevState[name], e.target.result],
        //     }));
        // };
    }

    handleUsrImgSubmit(e) {
        var formData = new FormData();
        var self = this;

        e.preventDefault();
        formData.append("file", this.state.userImg);

        axios
            .post("/uploadUserImg", formData)
            .then(function (response) {
                console.log("im getting  a new url", response);
                self.props.setProfilePicUrl(response.data.profile_pic_url);
            })
            .catch(function (err) {
                console.log("something went wrong", err);
            });
    }

    // render() {
    //     return (
    //         <Collapse in={this.props.toggle}>
    //             <>
    //                 <input
    //                     accept="image/*"
    //                     // className={classes.input}
    //                     style={{ display: "none" }}
    //                     id="raised-button-file"
    //                     type="file"
    //                     onChange={(e) => this.handleFileChange(e)}
    //                 />
    //                 <label htmlFor="raised-button-file">
    //                     <Button
    //                         variant="raised"
    //                         component="span"
    //                         // className={classes.button}
    //                     >
    //                         Upload
    //                     </Button>
    //                 </label>
    //             </>
    //         </Collapse>
    //     );
    // }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                {/* <input
                    accept="image/*"
                    //    className={classes.input}
                    id="icon-button-photo"
                    onChange={(e) => this.handleFileChange(e)}
                    type="file"
                />
                <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                <Button
                    variant="raised"
                    component="span"
                    onClick={(e) => this.handleUsrImgSubmit(e)}
                >
                    Upload image
                </Button> */}

                {/* <Button variant="contained" component="label"> */}
                {/* Upload Photo */}
                <input
                    onChange={(e) => this.handleFileChange(e)}
                    type="file"
                    accept="image/*"
                    id="upload-profile-pic"
                    style={{ display: "none" }}
                />
                <Button
                    variant="outlined"
                    component="span"
                    onClick={(e) => this.handleUsrImgSubmit(e)}
                >
                    Upload image
                </Button>
                <label htmlFor="upload-profile-pic">
                    <IconButton color="primary" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
            </Fragment>
        );
    }
}
