"use client";

import type { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const emptyForm = {
  title: "",
  summary: "",
  problem: "",
  solution: "",
  result: "",
  techStack: "Next.js, TypeScript",
  liveUrl: "",
  githubUrl: "",
  imageUrl: "",
  accent: "#1647FF",
  featured: true,
  sortOrder: 0,
};

export function ProjectManager({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const input = "w-full rounded-xl border bg-transparent p-3 outline-none";

  function start(project?: Project) {
    setEditing(project ?? null);
    setError("");
    setForm(
      project
        ? {
            title: project.title,
            summary: project.summary,
            problem: project.problem,
            solution: project.solution,
            result: project.result,
            techStack: project.techStack.join(", "),
            liveUrl: project.liveUrl ?? "",
            githubUrl: project.githubUrl ?? "",
            imageUrl: project.imageUrl ?? "",
            accent: project.accent,
            featured: project.featured,
            sortOrder: project.sortOrder,
          }
        : emptyForm,
    );
    setOpen(true);
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = {
      ...form,
      techStack: form.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      sortOrder: Number(form.sortOrder),
    };
    const response = await fetch(
      editing ? `/api/projects/${editing.id}` : "/api/projects",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      setError("Unable to save. Check the required fields and URLs.");
      return;
    }

    setOpen(false);
    router.refresh();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function update(
    key: keyof typeof emptyForm,
    value: string | number | boolean,
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <>
      <div className="flex items-end justify-between gap-5">
        <h1 className="display text-6xl font-black">Projects.</h1>
        <button
          className="rounded-full bg-[var(--blue)] px-5 py-3 font-bold text-white"
          onClick={() => start()}
        >
          Add project
        </button>
      </div>
      <div className="panel mt-10 overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr>
              <th className="p-5">TITLE</th>
              <th>STACK</th>
              <th>FEATURED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr className="border-t" key={project.id}>
                <td className="p-5 font-bold">{project.title}</td>
                <td>{project.techStack.join(", ")}</td>
                <td>{project.featured ? "Yes" : "No"}</td>
                <td className="space-x-3">
                  <button onClick={() => start(project)}>Edit</button>
                  <button
                    className="text-[var(--red)]"
                    onClick={() => remove(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <form
            className="panel max-h-[92vh] w-full max-w-2xl overflow-auto rounded-[2rem] p-7"
            onSubmit={save}
          >
            <h2 className="text-2xl font-black">
              {editing ? "Edit project" : "New project"}
            </h2>
            <div className="mt-6 grid gap-3">
              <input
                className={input}
                required
                minLength={2}
                placeholder="Title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
              <textarea
                className={input}
                required
                minLength={10}
                placeholder="Short summary"
                value={form.summary}
                onChange={(e) => update("summary", e.target.value)}
              />
              <textarea
                className={input}
                required
                minLength={10}
                placeholder="Problem"
                value={form.problem}
                onChange={(e) => update("problem", e.target.value)}
              />
              <textarea
                className={input}
                required
                minLength={10}
                placeholder="Solution"
                value={form.solution}
                onChange={(e) => update("solution", e.target.value)}
              />
              <textarea
                className={input}
                required
                minLength={10}
                placeholder="Result"
                value={form.result}
                onChange={(e) => update("result", e.target.value)}
              />
              <input
                className={input}
                required
                placeholder="Next.js, NestJS, PostgreSQL"
                value={form.techStack}
                onChange={(e) => update("techStack", e.target.value)}
              />
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className={input}
                  type="url"
                  placeholder="Live URL"
                  value={form.liveUrl}
                  onChange={(e) => update("liveUrl", e.target.value)}
                />
                <input
                  className={input}
                  type="url"
                  placeholder="GitHub URL"
                  value={form.githubUrl}
                  onChange={(e) => update("githubUrl", e.target.value)}
                />
                <input
                  className={input}
                  type="url"
                  placeholder="Image URL"
                  value={form.imageUrl}
                  onChange={(e) => update("imageUrl", e.target.value)}
                />
                <input
                  className={input}
                  type="color"
                  value={form.accent}
                  onChange={(e) => update("accent", e.target.value)}
                />
                <input
                  className={input}
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => update("sortOrder", Number(e.target.value))}
                />
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => update("featured", e.target.checked)}
                  />{" "}
                  Featured
                </label>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <div className="mt-7 flex justify-end gap-3">
              <button type="button" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="rounded-full bg-[var(--red)] px-5 py-3 font-bold text-white">
                Save project
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
