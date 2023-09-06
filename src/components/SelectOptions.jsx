import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React, { memo } from 'react'

const SelectOptions = ({ label, options, value, setValue, type, reset }) => {

    return (
        <FormControl>
            <FormLabel htmlFor={label}>{label}</FormLabel>
            <Select
                value={reset ? '' : value}
                onChange={(e) => setValue(e.target.value)}
                id={label}>
                <option value=''>{`-- Chọn ${label} --`}</option>
                {options?.map(item => {
                    return (
                        <option
                            key={type === 'province' ? item?.province_id :
                                type === 'district' ? item?.district_id :
                                    type === 'ward' ? item?.ward_id : item?.code}
                            value={type === 'province' ? item?.province_id :
                                type === 'district' ? item?.district_id :
                                    type === 'ward' ? item?.ward_id : item?.code}
                        >
                            {type === 'province' ? item?.province_name :
                                type === 'district' ? item?.district_name :
                                    type === 'ward' ? item?.ward_name : item?.value}
                        </option>
                    )
                })}
            </Select>
        </FormControl>
    )
}

export default memo(SelectOptions)