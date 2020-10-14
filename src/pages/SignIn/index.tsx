import React from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn:React.FC = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="GoBarber"/>

            <form>
                <h1>Faça seu logon</h1>

                <Input 
                    name="email" 
                    placeholder="Email" 
                    icon={FiMail}
                />
                
                <Input 
                    name="password" 
                    type="password" 
                    placeholder="Senha" 
                    icon={FiLock}
                />

                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha Senha</a>
            </form>

            <a href="#">
                <FiLogIn />
                Criar Conta
            </a>
        </Content>
        <Background />

    </Container>
);

export default SignIn;