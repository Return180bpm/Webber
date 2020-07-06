import axios from "./axios";
import { sendEmail } from "./ses";

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

            sendEmail(
                "Th.Szwaja@gmail.com",
                "Heres your password reset code",
                "918273ysdhbvj"
            )
                .then((res) => {
                    console.log("Email sent", res);
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .post(`/${path}`, self.state)
                .then((res) => {
                    console.log("Res from server", res);
                    if (res.data.success) {
                        location.replace("/");
                    } else {
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
