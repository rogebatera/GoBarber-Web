import React, {useCallback} from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp:React.FC = () => {

    const handleSubmit = useCallback(async (data:object) => {
        try {

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome Obrigatorio'),
                email: Yup.string().required('Email Obrigatorio').email('Digite um Email Valido'),
                password: Yup.string().min(6, 'Senha no Minimo 6 Digitos')
            });

            await schema.validate(data, { 
                abortEarly: false
            });
            
        } catch (err) {
           console.log(err); 
        }
    }, []);

    return(
        <Container>
            <Background />

            <Content>
                <img src={logoImg} alt="GoBarber"/>

                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>

                    <Input 
                        name="name" 
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