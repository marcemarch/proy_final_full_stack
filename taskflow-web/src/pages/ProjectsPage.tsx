import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

import { useAuth } from '../context/AuthContext';
import { projectsService } from '../api/projects.service';

import type { Project } from '../types';

interface ProjectsPageProps {
  onOpenProject: (project: Project) => void;
}

export default function ProjectsPage({
  onOpenProject,
}: ProjectsPageProps) {

  const { user } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);

      const data = await projectsService.getAll();

      setProjects(data);

    } catch {

      setError('No se pudieron cargar los proyectos');

    } finally {

      setLoading(false);

    }
  }

  const handleCreate = async (
    e: FormEvent
  ) => {

    e.preventDefault();

    if (!user) return;

    if (!name.trim()) return;

    setCreating(true);

    try {

      const project =
        await projectsService.create({

          name: name.trim(),

          description:
            desc.trim() || undefined,

          ownerId: user.id,

        });

      setProjects(prev => [
        project,
        ...prev,
      ]);

      setShowModal(false);

      setName('');
      setDesc('');

    } catch {

      setError(
        'No se pudo crear el proyecto'
      );

    } finally {

      setCreating(false);

    }

  };

  return (

    <div className="p-6">

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-2xl font-bold text-slate-800">
          Mis proyectos
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Nuevo Proyecto
        </button>

      </div>

      {loading && (

        <div className="text-center py-10 text-slate-400">
          Cargando proyectos...
        </div>

      )}

      {error && (

        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">
          {error}
        </div>

      )}

      {!loading &&
        projects.length === 0 && (

          <div className="text-center py-20">

            <div className="text-6xl mb-4">
              📋
            </div>

            <p className="text-slate-500">
              Aún no tienes proyectos.
            </p>

          </div>

        )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {projects.map(project => (

          <div
            key={project.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-5 cursor-pointer"
            onClick={() =>
              onOpenProject(project)
            }
          >

            <h2 className="font-semibold text-lg text-slate-800">

              {project.name}

            </h2>

            {project.description && (

              <p className="text-sm text-slate-500 mt-2 line-clamp-2">

                {project.description}

              </p>

            )}

            <div className="mt-4 flex justify-between items-center">

              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">

                {project._count?.tasks ?? 0} tareas

              </span>

            </div>

          </div>

        ))}

      </div>

      {showModal && (

        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={e => {

            if (e.target === e.currentTarget) {

              setShowModal(false);

            }

          }}
        >

          <div className="bg-white rounded-xl w-full max-w-md p-6">

            <h2 className="text-xl font-bold mb-5">

              Nuevo Proyecto

            </h2>

            <form
              onSubmit={handleCreate}
              className="space-y-4"
            >

              <div>

                <label className="block text-sm mb-1">

                  Nombre

                </label>

                <input
                  required
                  value={name}
                  onChange={e =>
                    setName(e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />

              </div>

              <div>

                <label className="block text-sm mb-1">

                  Descripción

                </label>

                <textarea
                  rows={3}
                  value={desc}
                  onChange={e =>
                    setDesc(e.target.value)
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />

              </div>

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                >

                  {creating
                    ? 'Creando...'
                    : 'Crear Proyecto'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}