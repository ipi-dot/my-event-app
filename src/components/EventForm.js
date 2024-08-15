import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { Button, Input, FormControl, FormLabel, Textarea, Box } from '@chakra-ui/react';

const EventForm = () => {
  const { id } = useParams();
  const { events, addEvent, updateEvent } = useContext(EventContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    startTime: '',
    endTime: '',
    categories: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundEvent = events.find(event => event.id === id);
      if (foundEvent) {
        setFormData({
          title: foundEvent.title,
          description: foundEvent.description,
          image: foundEvent.image,
          startTime: foundEvent.startTime,
          endTime: foundEvent.endTime,
          categories: foundEvent.categories,
        });
      }
    }
  }, [id, events]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateEvent(id, formData);
    } else {
      addEvent(formData);
    }
    navigate('/');
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input name="title" value={formData.title} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={formData.description} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Image URL</FormLabel>
          <Input name="image" value={formData.image} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Start Time</FormLabel>
          <Input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>End Time</FormLabel>
          <Input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Categories (comma separated)</FormLabel>
          <Input name="categories" value={formData.categories} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="teal">Save</Button>
      </form>
    </Box>
  );
};

export default EventForm;
