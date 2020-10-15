import React, {useRef, useCallback} from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors'

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData{
    email: string;
    password: string;    
}

const SignIn:React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();

    // console.log(user);

    const handleSubmit = useCallback(async (data:SignInFormData) => {
        try {

            //zerar validação
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('Email Obrigatório').email('Digite um Email Valido'),
                password: Yup.string().required('Senha Obrigatória')
            });

            await schema.validate(data, { 
                abortEarly: false
            });

            await signIn({
                email: data.email,
                password:data.password
            });

        } catch (err){
            //verifica se não é um erro no Yup
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }

            //disparar um toast
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
            });
        }
    }, [signIn, addToast]);

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber"/>

                <Form ref={formRef} onSubmit={handleSubmit}> 
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
                </Form>

                <a href="dsada">
                    <FiLogIn />
                    Criar Conta
                </a>
            </Content>

            <Background />

        </Container>
    );
};

export default SignIn;