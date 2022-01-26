import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/filterData';

const SearchFilters = () => {
    // we preset our filters with values from filterData.js, we don't need to pass it via props, as we have a direct access from the import
    const [filters, setFilters] = useState(filterData);
    const router = useRouter();
    // the choosen filter items are to change the state, so once we update the item.value we are to update the state right here, and we are doing it by updating the url 
    const searchProperties = (filterValues) => {
        const path = router.pathname;
        // console.log(router); // {}
        // console.log(router.pathname); // "/search"
        const {query} = router;
        // console.log(query); // Object of parameters = filter items chosen 

        // filterValues = [filter.queryName]: e.target.value
        const values = getFilterValues(filterValues);
         //console.log(values); // Array of objects [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}], 
         //0: {name: 'purpose', value: undefined}
         // 1: {name: 'rentFrequency', value: undefined}
         // 2: {name: 'minPrice', value: '10000'} - the value of the filter item chosen

        values.forEach((item) => {
            // updating the query
            // console.log(item.value); // 10000
            //  console.log(filterValues?.[item.name]); // minPrice
            if(item.value && filterValues?.[item.name]) {
                query[item.name] = item.value
              }
        })
        // passing query parameters to the router to add them to the url
        router.push({ pathname: path, query })
    }
    return (
        <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
            {filters.map((filter) => (
                <Box key={filter.queryName}>
                    <Select
                        placeholder={filter.placeholder}
                        w="fit-content"
                        p="2" 
                        onChange={(e) => searchProperties({ [filter.queryName]: e.target.value})}
                    >
                        {filter?.items?.map((item) => (
                            <option value={item.value} key={item.value}>{item.name}</option>
                        ))}
                         
                    </Select>
                </Box>
            ))}
        </Flex>
    )
}

export default SearchFilters;