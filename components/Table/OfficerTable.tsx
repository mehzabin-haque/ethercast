import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import user from '../../model/user';
import Form from '../UpdatedForm/ChairmanUpdate';

interface Voter {
  id: string;
  org_name: string;
  employee_id: string;
  name: string | null ; // Add the name property here
  email: string | null ; // Add the email property here
  userId: string;
}



const ChairmanTable = () => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const fetchOfficers = async () => {
    try {
      const response = await axios.get('/api/data/Officer/createdVoter');
      setVoters(response.data);
      setLoading(false);
    } catch (error) {
      setError('Something went wrong while fetching Voters.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
    const interval = setInterval(fetchOfficers, 50);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleEdit = (id: string) => {
    const voter = voters.find((voter) => voter.id === id);
    setSelectedVoter(voter !== undefined ? voter : null);
    toggleForm();
  };

  const handleUpdate = async (updatedVoter: Voter) => {
    try {
      await axios.put(`/api/data/Voter/${updatedVoter.id}`, updatedVoter);
      fetchOfficers(); // Fetch the updated data after updating
      setSelectedVoter(null);
      toggleForm();
    } catch (error) {
      console.log('Something went wrong while updating Officer.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/data/Officer/${id}`);
      fetchOfficers(); // Fetch the updated data after deleting
    } catch (error) {
      console.log('Something went wrong while deleting Officer.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <div>
    {showForm && (
        <Form
          buttonName="Update User"
          officer={selectedVoter}
          onUpdate={handleUpdate}
        />
      )}
    </div>
    <br /><br />
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Organization Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Employee Code
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {voter.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {voter.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {voter.org_name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {voter.employee_id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button type="button" onClick={() => handleEdit(voter.id)}>
                    <BiEdit size={25} color="rgb(0, 131, 143)" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(voter.id)}
                  >
                    <BiTrashAlt size={25} color="rgb(244,63,94)" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ChairmanTable;
