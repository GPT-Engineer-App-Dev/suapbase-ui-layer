import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Box,
  Button,
  Container,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Crud = () => {
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    question_id: "",
    grade: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from("your_table_name").select("*");
    if (error) console.error("Error fetching data:", error);
    else setData(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleAddEntry = async () => {
    const { data: newData, error } = await supabase
      .from("your_table_name")
      .insert([newEntry]);
    if (error) console.error("Error adding data:", error);
    else setData([...data, ...newData]);
  };

  const handleDeleteEntry = async (id) => {
    const { error } = await supabase.from("your_table_name").delete().eq("id", id);
    if (error) console.error("Error deleting data:", error);
    else setData(data.filter((entry) => entry.id !== id));
  };

  const handleEditEntry = async (id, updatedEntry) => {
    const { error } = await supabase
      .from("your_table_name")
      .update(updatedEntry)
      .eq("id", id);
    if (error) console.error("Error updating data:", error);
    else {
      const updatedData = data.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      );
      setData(updatedData);
    }
  };

  return (
    <Container maxW="container.lg" mt={10}>
      <VStack spacing={4}>
        <Box>
          <Input
            placeholder="Question ID"
            name="question_id"
            value={newEntry.question_id}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Grade"
            name="grade"
            value={newEntry.grade}
            onChange={handleInputChange}
          />
          <Button onClick={handleAddEntry}>Add Entry</Button>
        </Box>
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
                    onChange={(e) =>
                      handleEditEntry(entry.id, {
                        ...entry,
                        question_id: e.target.value,
                      })
                    }
                  />
                </Td>
                <Td>
                  <Input
                    value={entry.grade}
                    onChange={(e) =>
                      handleEditEntry(entry.id, {
                        ...entry,
                        grade: e.target.value,
                      })
                    }
                  />
                </Td>
                <Td>{entry.created_at}</Td>
                <Td>
                  <Button onClick={() => handleDeleteEntry(entry.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Crud;