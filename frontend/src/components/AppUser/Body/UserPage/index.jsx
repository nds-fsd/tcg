import styles from './userPage.module.css';
import '@fontsource/doto';
import '@fontsource/micro-5';
import '@fontsource/metamorphous';
import { useState, useEffect, useMemo } from 'react';
import { fetchUsers, createUser, deleteUser } from '../../../../lib/utils/apiUser';
import PageTitle from '../Generic/PageTitle';
import InfoContainer from './InfoContainer';
import UserList from './UserList';
import CreateUser from './CreateUser';

const UserPage = () => {
  // State de los usuarios
  const [usersArray, setUsersArray] = useState([]);

  // States del formulario para crear nuevo usuario
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ userName: '', email: '', password: '', level: '', roles: 'user' });

  // Almacena el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Filtro activo: "all", "admin", "user"
  const [activeFilter, setActiveFilter] = useState('all');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Fetch Users
  useEffect(() => {
    fetchUsersList();
  }, []);

  // Obtiene la lista de usuarios desde la API
  const fetchUsersList = async () => {
    try {
      const { data } = await fetchUsers();
      setUsersArray(data);
    } catch (error) {
      alert(JSON.stringify({ message: error.message, stack: error.stack }));
    }
  };

  const openModal = () => setIsModalOpen(true);

  // Combinación de los distintos filtros de la app
  const filteredUsers = useMemo(() => {
    return usersArray.filter((user) => {
      const matchesSearch =
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = activeFilter === 'all' || user.roles === activeFilter;
      return matchesSearch && matchesRole;
    });
  }, [usersArray, searchTerm, activeFilter]);

  // Paginación: calcula los usuarios visibles para la página actual
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Filtro del Sort
  const handleSortChange = ({ field, order }) => {
    const sortedUsers = [...usersArray].sort((a, b) => {
      if (order === 'asc') return a[field] > b[field] ? 1 : -1;
      return a[field] < b[field] ? 1 : -1;
    });
    setUsersArray(sortedUsers);
  };

  // Create User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: newUser } = await createUser(form);
      setUsersArray([...usersArray, newUser]);
      setIsModalOpen(false);
      setForm({ userName: '', email: '', password: '', level: '', roles: 'user' });
    } catch (error) {
      alert(`Error al crear el usuario: ${error.message}`);
    }
  };

  // Editar User
  const handleUpdate = (updatedUser) => {
    setUsersArray(usersArray.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
  };

  // Delete Users
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsersList();
    } catch (error) {
      alert(JSON.stringify({ message: error.message, stack: error.stack }));
    }
  };

  return (
    <>
      <div className={styles.bodyUserPageContainer}>
        <PageTitle
          title='Usuarios'
          showAddIcon={true}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          openModal={openModal}
          placeholder='Escribe el nombre del usuario...'
        />

        <InfoContainer
          usersArray={usersArray}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          handleSortChange={handleSortChange}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />

        <UserList filteredUsers={paginatedUsers} handleUpdate={handleUpdate} handleDelete={handleDelete} />
      </div>

      {/* Renderiza el modal si está abierto */}
      {isModalOpen && (
        <CreateUser form={form} setForm={setForm} handleSubmit={handleSubmit} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default UserPage;
