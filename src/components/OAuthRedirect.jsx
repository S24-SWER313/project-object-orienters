import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { Button, FormControl, FormLabel, Input, FormErrorMessage, Container, Center, Box } from '@chakra-ui/react';
import { AuthContext, useAuth } from './AuthProvider';


function OAuthRedirect() {
    const location = useLocation();

    // Extract the query parameters
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const error = searchParams.get('error');
    const provider = searchParams.get('provider');
    const [username, setUsername] = useState('');
    const { oauthLoginAction } = useAuth();


    const handleOauthSignup = async (username) => {

        oauthLoginAction({id, username, provider})
    }

    const isUsernameTaken = async (value) => {
        // check if username already exists
        const response = await fetch('http://localhost:8080/auth/usernameExists/' + value);
        return response.status == 400;

    };

    async function validateUsername(value) {
        let error;
        if (!value) {
            error = 'Username is required';
        } else if (value.length < 4) {
            error = 'Username must be at least 4 characters';
        } else if (await isUsernameTaken(value)) {
            error = 'Username already exists';
        }
        return error;
    }

    return (
        <Box minH='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Center width='100%' textAlign='center'>
                {error ? (
                    <>
                        <div>Error Occured: {error}</div>
                        <Button href="/login">Go back to login</Button>
                    </>
                ) : (


                    <Formik
                        initialValues={{ name: '' }}
                          validateOnChange={true}

                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                handleOauthSignup(values.name);
                                actions.setSubmitting(false);
                            }, 1000);
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name='name' validate={validateUsername} validateOnChange={true}>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                                            <Box alignItems='center' display='flex' flexDir='column'>
                                                <FormLabel>Enter a username</FormLabel>
                                                <Input {...field} placeholder='username' onChange={(e) => {
                                                    setUsername(e.target.value);
                                                    form.setFieldValue('name', e.target.value);
                                                }}
                                                    w='30vw' />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </Box>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    mt={4}
                                    colorScheme='teal'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >
                                    Complete
                                </Button>
                            </Form>
                        )}
                    </Formik>

                )}
            </Center>
        </Box>
    );
}

export default OAuthRedirect;
