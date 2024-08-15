import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { Button, Input, Box, Grid, Image, Text } from '@chakra-ui/react';

const EventsPage = () => {
  const { events } = useContext(EventContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (e) => setFilter(e.target.value);

  const filteredEvents = events
    .filter(event => event.title.toLowerCase().includes(search.toLowerCase()))
    .filter(event => event.categories.includes(filter));

  return (
    <Box p={5}>
      <Input placeholder="Search events" value={search} onChange={handleSearch} mb={4} />
      <Input placeholder="Filter by category" value={filter} onChange={handleFilter} mb={4} />
      <Button as={Link} to="/add-event" colorScheme="teal">Add Event</Button>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6} mt={4}>
        {filteredEvents.map(event => (
          <Box key={event.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={event.image} alt={event.title} />
            <Box p={4}>
              <Text fontWeight="bold" fontSize="lg">
                {event.title}
              </Text>
              <Text mt={2}>
                {event.description}
              </Text>
              <Button as={Link} to={`/event/${event.id}`} mt={2} colorScheme="teal">
                View Details
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default EventsPage;
