import React, {useCallback, useRef} from 'react';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp:React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data:SignUpFormData) => {
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

            await api.post('/users', data);
            
            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro Realizado!',
                description:'Você já pode fazer seu logon no GoBarber!'
            });
            
        } catch (err){
            //verifica se não é um erro no Yup
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }

            //disparar um toast
            addToast({
                type: 'error',
                title: 'Erro no Cadastro',
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente.'
            });
        }
    }, [addToast, history]);

    return(
        <Container>

            <Background />

            <Content>
                <AnimationContainer>

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

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para Logon
                    </Link>

                </AnimationContainer>
            </Content>

        </Container>
    );

};

export default SignUp;