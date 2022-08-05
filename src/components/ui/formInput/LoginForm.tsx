import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { string as yupString, object as yupObject } from 'yup';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import './LoginForm.css';

const validationSchema = yupObject({
    email: yupString().email('Entrer un email valide').required('Email Obligatoire'),
    password: yupString().required("Mot de passe Obligatoire")    
});

export const LoginForm = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit:values => {
                const loginValues = {
                    email: values.email,
                    password: values.password
                }
            }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <Input placeholder="email" 
            value={formik.values.email}
            onChange={formik.handleChange}
            />
            <Input placeholder="password"
            value={formik.values.password}
            onChange={formik.handleChange} />
            <Button className="workee" type="submit">Login</Button>
        </form>
    );
}