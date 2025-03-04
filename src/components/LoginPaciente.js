import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { msg: this.props.location.query.msg };
    }

    envia(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ email: this.email.value, password: this.password.value }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch("https://albert-einstein-agenda-api.herokuapp.com/pacienteLogin", requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('E-mail e/ou senha incorretos!');
                }
            }).then(myJson => {
                console.log(JSON.stringify(myJson));
                localStorage.setItem('userId', myJson.userId);
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                browserHistory.push('/homePaciente');
            })
            .catch(error => {
                this.setState({ msg: error.message });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="login-box">
                    <h2 className="header-logo">LOGIN PACIENTE</h2>
                    <span>{this.state.msg}</span>
                    <form onSubmit={this.envia.bind(this)}>
                        <input placeholder="E-mail" type="text" ref={(input) => this.email = input} />
                        <input placeholder="Senha" type="password" ref={(input) => this.password = input} />
                        <input className="pure-control-group left" type="submit" label="Login" value="Login" />
                        <Link to='/'><input className="pure-control-group right" type="submit" label="Cadastro" value="Cadastro" /></Link>
                     </form>
                    <Link to='/'><input className="pure-control-group right" type="submit" label="Voltar" value="Voltar" /> </Link>
                </div>
            </div>
        );
    }
}