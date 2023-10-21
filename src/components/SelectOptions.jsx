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
                                type === 'province' ? item?.province_id :
                                    type === 'district' ? item?.district_id :
                                        type === 'ward' ? item?.ward_id : item?.id
                            }
                            value={
                                type === 'province' ? item?.province_id :
                                    type === 'district' ? item?.district_id :
                                        type === 'ward' ? item?.ward_id : item?.id
                            }
                        >
                            {
                                type === 'province' ? item?.province_name :
                                    type === 'district' ? item?.district_name :
                                        type === 'ward' ? item?.ward_name : item?.value
                            }
                        </option>
                    )
                })}
            </Select>
            <chakra.small textColor='red.500'>
                {handldErrorText()}
            </chakra.small>
        </FormControl>
    )
}

export default memo(SelectOptions)