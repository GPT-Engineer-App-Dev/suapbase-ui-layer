import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input, Box, VStack, HStack } from '@chakra-ui/react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const CRUD = () => {
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({ question_id: '', grade: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/your_table`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addEntry = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/your_table`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(newEntry),
      });
      if (response.ok) {
        fetchData();
        setNewEntry({ question_id: '', grade: '' });
      }
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const updateEntry = async (id, updatedEntry) => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/your_table?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(updatedEntry),
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/your_table?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <HStack>
          <Input
            placeholder="Question ID"
            value={newEntry.question_id}
            onChange={(e) => setNewEntry({ ...newEntry, question_id: e.target.value })}
          />
          <Input
            placeholder="Grade"
            type="number"
            value={newEntry.grade}
            onChange={(e) => setNewEntry({ ...newEntry, grade: e.target.value })}
          />
          <Button onClick={addEntry}>Add Entry</Button>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Question ID</Th>
              <Th>Grade</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((entry) => (
              <Tr key={entry.id}>
                <Td>{entry.id}</Td>
                <Td>
                  <Input
                    value={entry.question_id}
                    onChange={(e) => updateEntry(entry.id, { ...entry, question_id: e.target.value })}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={entry.grade}
                    onChange={(e) => updateEntry(entry.id, { ...entry, grade: e.target.value })}
                  />
                </Td>
                <Td>{entry.created_at}</Td>
                <Td>
                  <Button colorScheme="red" onClick={() => deleteEntry(entry.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default CRUD;