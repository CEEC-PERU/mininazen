import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface SidebarAdminProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ showSidebar, setShowSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50 h-full">
      <div
        className={`bg-cyan-900  text-white transition-all transform h-full rounded-r-lg ${
          isOpen ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <nav className="flex flex-col h-full">
          <ul>
            <li>
              <button
                onClick={() => handleNavigation('/admin')}
                className="flex items-center p-4 hover:bg-blue-500 w-full text-left"
              >
                <PeopleIcon />
                {isOpen && <span className="ml-2">Estudiantes</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/admin/user-enterprise')}
                className="flex items-center p-4 hover:bg-blue-500 w-full text-left"
              >
                <BusinessIcon />
                {isOpen && <span className="ml-2">Empresas</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/admin/users')}
                className="flex items-center p-4 hover:bg-blue-500 w-full text-left"
              >
                <GroupIcon />
                {isOpen && <span className="ml-2">Usuarios</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/admin/requirements')}
                className="flex items-center p-4 hover:bg-blue-500 w-full text-left relative"
              >
                <AssignmentIcon />
                {isOpen && <span className="ml-2">Requerimientos</span>}
                {requirements.length > 0 && (
                  <span className="absolute right-4 top-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {requirements.length}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/admin/student/AssignStudents')}
                className="flex items-center p-4 hover:bg-blue-500 w-full text-left"
              >
                <AssignmentIcon />
                {isOpen && <span className="ml-2">Asignación de Estudiantes</span>}
              </button>
            </li>
            <li>
              <button
                className="flex items-center p-4 hover:bg-blue-500 w-full text-left"
              >
                <ExitToAppIcon />
                {isOpen && <span className="ml-2">Cerrar Sesión</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarAdmin;
