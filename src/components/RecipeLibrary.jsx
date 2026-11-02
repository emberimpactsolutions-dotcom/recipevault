export default function RecipeLibrary({
  recipes,
  search,
  setSearch,
  setSelectedRecipe,
  deleteRecipe,
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">

      <h2 className="mb-4 text-2xl font-semibold">
        📚 Recipe Library
      </h2>

      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border border-slate-600 bg-slate-900 p-3"
      />

      {recipes.length === 0 ? (
        <p className="text-slate-400">
          No recipes saved yet.
        </p>
      ) : (
        <div className="space-y-2">

          {recipes.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-slate-700 bg-slate-900 p-3"
            >
              <button
                onClick={() => setSelectedRecipe(item)}
                className="w-full text-left"
              >
                <div className="font-semibold">
                  {item.recipeName}
                </div>

                <div className="text-sm text-slate-400">
                  {item.category}
                </div>
              </button>

              <button
                onClick={() => deleteRecipe(item.id)}
                className="mt-2 text-sm text-red-400"
              >
                Delete
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}