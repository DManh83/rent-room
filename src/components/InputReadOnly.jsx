import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const InputReadOnly = ({ label, value, id }) => {
    return (
        <FormControl>
            <FormLabel htmlFor='exactly-address'>
                {label}
            </FormLabel>
            <Input
                type='text'
                id={id}
                readOnly
                bg='gray.100'
                // defaultValue='Địa chỉ: '
                value={value || ''}
            />
        </FormControl>
    )
}

export default InputReadOnly