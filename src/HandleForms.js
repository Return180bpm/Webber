import axios from "./axios";

function HandleForms(Base) {
    return class WrappedForm extends Base {
        handleChange(e) {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }

        handleSubmit(e, path = null) {
            e.preventDefault();
            const self = this;

            axios
                .post(`/${path}`, self.state)
                .then((res) => {
                    console.log("Res from server", res);
                    if (res.data.success) {
                        if (path === "password/reset/start") {
                            this.setState({
                                currentDisplay: this.state.currentDisplay + 1,
                                // email: res.data.email,
                            });
                        }

                        if (path === "register" || path === "login") {
                            location.replace("/user/3");
                            // location.replace("/");
                        }
                    } else {
                        console.log(
                            "#### in handleSubmit before setstate(err:true)"
                        );

                        this.setState({
                            err: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log("Something went wrong!\n", err);
                    this.setState({
                        err: true,
                    });
                });
        }
        resetErr() {
            // console.log("heyhye");
            if (this.state.err) {
                this.setState({
                    err: false,
                });
            }
        }
    };
}

export default HandleForms;
