import * as React from "react";
import {useEffect} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {NavLink, Redirect} from "react-router-dom";
import {Input} from "../UIElements/Input";
import {Button} from "../UIElements/Button";
import {Checkbox} from "../UIElements/Checkbox";
import {ReactComponent as SignUpPic} from "../svgs/signup.svg";
import {useAppSelector, useAppDispatch} from "../../store/Hooks";
import {userSelector, signupUser, clearState} from "../../store/Slice";
import styles from "./styles.module.css";

type InputsSignUp = {
    userName: string;
    login: string;
    password: string;
    passwordRepeat: string;
    acceptAgreement: boolean;
}

export type signUpType = {
    userName: string;
    login: string;
    password: string;
}

export function SingUpPage(): React.ReactElement {
    const {register, handleSubmit} = useForm<InputsSignUp>();
    const dispatch = useAppDispatch();
    const {token, isSuccess, isError, errorMessage} = useAppSelector(userSelector);

    const onSubmit: SubmitHandler<InputsSignUp> = data => {
        let signUpData: signUpType = {
            userName: "",
            login: "",
            password: ""
        };
        if (data.password === data.passwordRepeat && data.acceptAgreement) {
            signUpData.userName = data.userName;
            signUpData.login = data.login;
            signUpData.password = data.password;
        }
        dispatch(signupUser(signUpData));
    }

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
        }

        if (isError) {
            console.log(errorMessage);
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    return (
        !!token ? <Redirect to="/teams"/> :
            <div className={styles.signinPage}>
                <div className={styles.signinSide}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.signinWords}>Sign Up</div>
                        <Input name="userName" ref={register} inputLineName="Name" inputType="login"/>
                        <Input name="login" ref={register} inputLineName="Login" inputType="login"/>
                        <Input name="password" ref={register} inputLineName="Password" inputType="pswd"/>
                        <Input name="passwordRepeat" ref={register} inputLineName="Enter your password again"
                               inputType="pswd"/>
                        <Checkbox name="acceptAgreement" checkboxText="I accept the agreement" id="acceptAgr"
                                  ref={register}/>
                        <Button buttonName="Sign In" buttonType="signin"/>
                        <div className={styles.moveToSignUp}>
                            <p>Already a member? <NavLink to="/" className={styles.moveToSignUpLink}>Sign
                                in</NavLink>
                            </p>
                        </div>
                    </form>
                </div>
                <div className={styles.pictureSide}>
                    <SignUpPic className={styles.picture}/>
                </div>
            </div>
    )
}
