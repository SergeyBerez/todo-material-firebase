import React, { useState, useEffect, useContext } from "react"
import firebase from "../Firebase/firebaseConfig"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Context from "../Context/Context"
const AuthUser = () => {
    const { auth, authisLogged, authIsExit } = useContext(Context)
    const [messageFirebase, SetmessageFirebase] = useState("")
    const [valueInputs, SetvalutInputs] = useState({ email: "", password: "" })
    const onHandleInputs = (e) => {
        SetvalutInputs({
            ...valueInputs,
            [e.target.type]: e.target.value,
        })
    }

    useEffect(() => {}, [])
    const createUserInFirebase = (e) => {
        e.preventDefault()
        const { email, password } = valueInputs
        console.log(valueInputs)
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
                authisLogged(true)
                console.log("login user", data.user)
                SetvalutInputs({
                    email: "",
                    password: "",
                })
                localStorage.setItem(
                    "LOGIN_USER",
                    JSON.stringify({
                        id: data.user.uid,
                        localId: data.user.l,
                        email: data.user.email,
                    })
                )
                SetmessageFirebase(data.user.email)
            })
            .catch((error) => {
                var messageFirebase = error.message
                console.log(messageFirebase)
                SetmessageFirebase(messageFirebase)
            })
    }
    const onLogInAuthHandle = (e) => {
        e.preventDefault()
        const { email, password } = valueInputs
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                authisLogged()
                SetvalutInputs({
                    email: "",
                    password: "",
                })

                SetmessageFirebase(data.user.email)
                localStorage.setItem(
                    "LOGIN_USER",
                    JSON.stringify({
                        id: data.user.uid,
                        localId: data.user.l,
                        email: data.user.email,
                    })
                )
            })
            .catch((error) => {
                var messageFirebase = error.message
                SetmessageFirebase(messageFirebase)
            })
    }
    const authExit = () => {
        console.log("exit")
        authIsExit()
        SetmessageFirebase("")
    }
    return (
        <div>
            {auth ? (
                <div>
                    <p> {messageFirebase}</p>
                    <Button value="exit" color="inherit" onClick={authExit}>
                        exit
                    </Button>
                </div>
            ) : (
                <form>
                    {messageFirebase}
                    <TextField
                        id="outlined-Email-input"
                        label="email"
                        value={valueInputs.email}
                        type="Email"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange={onHandleInputs}
                        color="primary"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="password"
                        value={valueInputs.password}
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange={onHandleInputs}
                        color="primary"
                    />

                    <Button type="submit" value="login" color="inherit" onClick={onLogInAuthHandle}>
                        Login
                    </Button>
                    <Button type="submit" value="signIn" color="inherit" onClick={createUserInFirebase}>
                        Sign Up
                    </Button>
                </form>
            )}
        </div>
    )
}
export default AuthUser
