import { FormControl, FormLabel, Select, chakra } from '@chakra-ui/react'
import React, { memo } from 'react'

const SelectOptions = ({ label, options, value, setValue, type, reset, name, invalidFields, setInvalidFields, ...rest }) => {

    const handldErrorText = () => {
        let nameInvalid = invalidFields?.find(item => item.name === name)
        let addressInvalid = invalidFields?.find(item => item.name === 'address')

        return `${nameInvalid ? nameInvalid.message : ''}` || `${addressInvalid ? addressInvalid.message : ''}`
    }

    return (
        <FormControl>
            <FormLabel htmlFor={label}>{label}</FormLabel>
            <Select
                value={reset ? '' : value}
                onChange={(e) => !name ? setValue(e.target.value) : setValue(prev => ({ ...prev, [name]: e.target.value }))}
                id={label}
                onFocus={() => setInvalidFields([])}
                {...rest}
            >
                <option value=''>{`-- Chọn ${label} --`}</option>
                {options?.map(item => {
                    return (
                        <option
                            key={
                                type === 'province' ? item?.code :
                                    type === 'district' ? item?.code :
                                        type === 'ward' ? item?.code : item?.id
                            }
                            value={
                                type === 'province' ? item?.code :
                                    type === 'district' ? item?.code :
                                        type === 'ward' ? item?.code : item?.id
                            }
                        >
                            {
                                type === 'province' ? item?.name :
                                    type === 'district' ? item?.name :
                                        type === 'ward' ? item?.name : item?.value
                            }
                        </option>
                    )
                })}
            </Select>
            {invalidFields && <chakra.small textColor='red.500'>
                {handldErrorText()}
            </chakra.small>}
        </FormControl>
    )
}

export default memo(SelectOptions)