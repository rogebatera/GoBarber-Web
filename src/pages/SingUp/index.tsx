import React, {useCallback, useRef} from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors'

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp:React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data:object) => {
        try {

            //zerar validação
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome Obrigatorio'),
                email: Yup.string().required('Email Obrigatorio').email('Digite um Email Valido'),
                password: Yup.string().min(6, 'No Mínimo 6 Digitos')
            });

            await schema.validate(data, { 
                abortEarly: false
            });
            
        } catch (err){

            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);

        }
    }, []);

    return(
        <Container>
            <Background />

            <Content>
                <img src={logoImg} alt="GoBarber"/>

                <Form ref={formRef} onSubmit={handleSubmit}>
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