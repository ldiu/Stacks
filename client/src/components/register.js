import React from "react";

export default function Register() {

    async function onSubmit(e) {
    }
    return (
        <div id='register'>
            <div className="header">Register</div>
            <form onSubmit={onSubmit}>
                <div className="formItems">
                    <label className="formLabel" htmlFor="name">Name:</label>
                    <input
                        className="formInput"
                        id="name"
                        required
                    />
                </div>

                <div className="formItems">
                    <label className="formLabel" htmlFor="email">Email:</label>
                    <input
                        className="formInput"
                        id="email"
                        required
                    />
                </div>

                <div className="formItems">
                    <label className="formLabel" htmlFor="password">Password:</label>
                    <input
                        className="formInput"
                        id="password"
                        required
                    />
                </div>

                <div className="formItems=">
                    <input
                        type="submit"
                        value="Register"
                        className="formButton"
                    />
                </div>
            </form>
        </div>
    )
}
