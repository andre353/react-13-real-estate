import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';
import noresult from '../assets/images/noresult.svg';
import { fetchApi, baseUrl } from '../utils/fetchApi';

const Search = ({properties}) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter(); // we need it, as router contains url, and url contains parameters

  return (
    <Box>
      <Flex
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)} // setSearchFilters toggles on/off (shows/hides the SearchFilters component)- means if we are filtering smth and we click we stop filtering and vv = if we aren't filtering, we click and then filtering starts
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft='2' w='7' as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
          Properties {router.query.purpose}
      </Text>
      <Flex flexWrap='wrap'>
          {properties.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
      {
          properties.length === 0 && (
              <Flex justifyContent="center" alignItems="center" flexDir='column' marginTop='5' marginBottom='5'>
                  <Image src={noresult} />
                  <Text fontSize='xl' marginTop='3'>No Result Found</Text>
              </Flex>
          )
      }      
    </Box>
  );
};

export default Search;
// "query" as parameter coming to getServerSideProps is coming from url
export async function getServerSideProps({query}) {
  // creating variables to get values (we want to filter by) from url and setting default values
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
    // adding to props object the property 'properties'
    return {
      props: {
        properties: data?.hits,
      },
    };
  }