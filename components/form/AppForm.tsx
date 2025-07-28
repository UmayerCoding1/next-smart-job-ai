'use client';
import React from 'react';
import { Input as DefaultInput } from '../ui/input';

type AppFormProps = {
    children: React.ReactNode
}
const AppForm = ({children}: AppFormProps) => {
    return (
        <form>
            {children}
        </form>
    );
};

export default AppForm;



export const Input = () => {
    return (
        <DefaultInput/>
    );
}