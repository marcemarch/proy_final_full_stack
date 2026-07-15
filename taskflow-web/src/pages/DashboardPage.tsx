import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import type { Project } from '../types';

import ProjectsPage from './ProjectsPage';
import ProjectDetailPage from './ProjectDetailPage';

type View =
  | 'inicio'
  | 'proyectos'
  | 'detalleProyecto'
  | 'tareas'
  | 'configuracion';

const menuItems: {
  label: string;
  icon: string;
  view: View;
}[] = [
  {
    label: 'Inicio',
    icon: '🏠',
    view: 'inicio',
  },
  {
    label: 'Tareas',
    icon: '📋',
    view: 'tareas',
  },
  {
    label: 'Proyectos',
    icon: '📁',
    view: 'proyectos',
  },
  {
    label: 'Configuración',
    icon: '⚙️',
    view: 'configuracion',
  },
];

export default function DashboardPage() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [view, setView] = useState<View>('inicio');

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setView('detalleProyecto');
  };

  const handleBackProjects = () => {
    setSelectedProject(null);
    setView('proyectos');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">

      {/* HEADER */}

      <header className="bg-white border-b border-slate-200 shadow-sm">

        <div className="h-16 px-6 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-xl text-slate-600 hover:text-slate-800"
            >
              ☰
            </button>

            <h1 className="text-xl font-bold">
              TaskFlow
            </h1>

          </div>

          <div className="flex items-center gap-4">

            <span className="text-sm text-slate-600">
              {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Cerrar sesión
            </button>

          </div>

        </div>

      </header>

      {/* BODY */}

      <div className="flex flex-1">

        {/* SIDEBAR */}

        <aside
          className={`bg-white border-r border-slate-200 shadow-sm transition-all duration-300 ${
            sidebarOpen
              ? 'w-60'
              : 'w-0 overflow-hidden'
          }`}
        >

          <nav className="p-4 space-y-2">

            {menuItems.map(item => (

              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`w-full text-left rounded-lg px-4 py-2 transition ${
                  view === item.view
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >

                <span className="mr-2">
                  {item.icon}
                </span>

                {item.label}

              </button>

            ))}

          </nav>

        </aside>

        {/* CONTENIDO */}

        <main className="flex-1 overflow-auto">

          {view === 'inicio' && (

            <div className="p-8">

              <div className="bg-white rounded-xl shadow p-8">

                <h2 className="text-2xl font-bold mb-2">
                  Bienvenido al DashBoard de Proyectos, {user?.name}
                </h2>

                <p className="text-slate-500">
                  Este es el panel principal de TaskFlow.
                </p>

              </div>

            </div>

          )}

          {view === 'proyectos' && (

            <ProjectsPage
              onOpenProject={handleOpenProject}
            />

          )}

          {view === 'detalleProyecto' &&
            selectedProject && (

              <ProjectDetailPage
                projectId={selectedProject.id}
                onBack={handleBackProjects}
              />

            )}

          {view === 'tareas' && (

            <div className="p-8">

              <div className="bg-white rounded-xl shadow p-8">

                <h2 className="text-xl font-bold">
                  Tareas
                </h2>

                <p className="text-slate-500 mt-2">
                  Próximamente...
                </p>

              </div>

            </div>

          )}

          {view === 'configuracion' && (

            <div className="p-8">

              <div className="bg-white rounded-xl shadow p-8">

                <h2 className="text-xl font-bold">
                  Configuración
                </h2>

                <p className="text-slate-500 mt-2">
                  Próximamente...
                </p>

              </div>

            </div>

          )}

        </main>

      </div>

      {/* FOOTER */}

      <footer className="bg-white border-t border-slate-200 py-4">

        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} TaskFlow
        </p>

      </footer>

    </div>
  );
}