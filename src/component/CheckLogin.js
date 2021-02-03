import { useHistory } from "react-router-dom";

const CheckLogin = (props, field) => {
    let history = useHistory();
    const auth = props.children != null ? props.children : props;

    if (auth == null || auth.auth !== true) {
        history.push("/");
    } else {
        if (field > 0) {
            const character = auth.character;
            if (character != null && field > 0 && field < character.char_field) {
                history.push("/");
            }
        }
    }
}

export default CheckLogin;