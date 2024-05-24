import { useState, useEffect } from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, IconButton } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

const Crud = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newEntry, setNewEntry] = useState({ question_id: "", grade: "" });

  const fetchData = async () => {
    const response = await fetch("https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/your_table", {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    });
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    const response = await fetch("https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/your_table", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(newEntry),
    });
    if (response.ok) {
      fetchData();
      setNewEntry({ question_id: "", grade: "" });
    }
  };

  const handleEdit = async (id) => {
    const entry = data.find((item) => item.id === id);
    const response = await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/your_table?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(entry),
    });
    if (response.ok) {
      fetchData();
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`https://jjfebbwwtcxyhvnkuyrh.supabase.co/rest/v1/your_table?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    });
    if (response.ok) {
      fetchData();
    }
  };

  return (
    <Box p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Question ID</Th>
            <Th>Grade</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>
                {editingId === item.id ? (
                  <Input
                    value={item.question_id}
                    onChange={(e) => setData(data.map((d) => (d.id === item.id ? { ...d, question_id: e.target.value } : d)))}
                  />
                ) : (
                  item.question_id
                )}
              </Td>
              <Td>
                {editingId === item.id ? (
                  <Input
                    value={item.grade}
                    onChange={(e) => setData(data.map((d) => (d.id === item.id ? { ...d, grade: e.target.value } : d)))}
                  />
                ) : (
                  item.grade
                )}
              </Td>
              <Td>
                {editingId === item.id ? (
                  <>
                    <IconButton icon={<CheckIcon />} onClick={() => handleEdit(item.id)} />
                    <IconButton icon={<CloseIcon />} onClick={() => setEditingId(null)} />
                  </>
                ) : (
                  <>
                    <IconButton icon={<EditIcon />} onClick={() => setEditingId(item.id)} />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(item.id)} />
                  </>
                )}
              </Td>
            </Tr>
          ))}
          <Tr>
            <Td>
              <Input
                placeholder="Question ID"
                value={newEntry.question_id}
                onChange={(e) => setNewEntry({ ...newEntry, question_id: e.target.value })}
              />
            </Td>
            <Td>
              <Input
                placeholder="Grade"
                value={newEntry.grade}
                onChange={(e) => setNewEntry({ ...newEntry, grade: e.target.value })}
              />
            </Td>
            <Td>
              <Button leftIcon={<AddIcon />} onClick={handleAdd}>
                Add
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default Crud;