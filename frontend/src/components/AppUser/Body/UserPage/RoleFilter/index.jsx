import styles from './roleFilter.module.css';

const RoleFilter = ({ usersArray = [], activeFilter, setActiveFilter }) => {
    return (
        <>
            <button
                className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
                onClick={() => setActiveFilter('all')}
            >
                Todos ({usersArray.length || 0})
            </button>
            <button
                className={`${styles.filterButton} ${activeFilter === 'admin' ? styles.active : ''}`}
                onClick={() => setActiveFilter('admin')}
            >
                Admins ({usersArray.filter((user) => user.roles === 'admin').length})
            </button>
            <button
                className={`${styles.filterButton} ${activeFilter === 'user' ? styles.active : ''}`}
                onClick={() => setActiveFilter('user')}
            >
                Users ({usersArray.filter((user) => user.roles === 'user').length})
            </button>
        </>
    );
};

export default RoleFilter;
export default RoleFilter;