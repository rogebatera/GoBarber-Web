import React from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp:React.FC = () => {

    function handleSubmit(data:object):void{
        console.log(data);
    }

    return(
        <Container>
            <Background />

            <Content>
                <img src={logoImg} alt="GoBarber"/>

                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>

                    <Input 
                        name="nome" 
                        placeholder="Nome" 
                        icon={FiUser}
                    />

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
                </Form>

                <a href="#">
                    <FiArrowLeft />
                    Voltar para Logon
                </a>
            </Content>

        </Container>
    );
};

export default SignUp;