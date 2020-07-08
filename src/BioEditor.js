import React from "react";
import axios from "./axios";

import Profile from "./Profile";
import Uploader from "./Uploader";

export default class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            draftBio: "",
            bioEditorIsVisible: false,
            err: false,
        };
    }

    render() {
        return <h1>Bio editor</h1>;
    }
}
