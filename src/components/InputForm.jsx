import { FormControl, FormLabel, Input, InputGroup, InputRightAddon, chakra } from '@chakra-ui/react'
import React from 'react'

const InputForm = ({ type, id, label, unit, value, setValue, name, small, invalidFields, setInvalidFields, ...rest }) => {

    return (
        <FormControl>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <InputGroup {...rest}>
                <Input
                    type={type}
                    id={id}
                    value={value}
                    onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                    onFocus={() => setInvalidFields([])}
                />
                {unit && <InputRightAddon children={unit} />}
            </InputGroup>
            {small && <chakra.small opacity={70}>{small}</chakra.small>}
            <chakra.small textColor='red.500' display='block'>
                {invalidFields?.some(item => item.name === name) && invalidFields?.find(item => item.name === name)?.message}
            </chakra.small>
        </FormControl >
    )
}

export default InputForm