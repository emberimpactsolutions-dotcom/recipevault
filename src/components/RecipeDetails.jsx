export default function RecipeDetails({
  displayRecipe,
  selectedRecipe,
  saveRecipe,
  updateRecipe,
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">
        🍪 Recipe Details
      </h2>

      {displayRecipe ? (
        <div className="space-y-4">

          {displayRecipe.image && (
            <img
              src={displayRecipe.image}
              alt="Recipe"
              className="w-full rounded-xl border border-slate-600"
            />
          )}

          <div>
            <label className="mb-1 block font-semibold text-slate-300">
              Recipe Name
            </label>

            <input
              value={displayRecipe.recipeName || ""}
              onChange={(e) =>
                updateRecipe("recipeName", e.target.value)
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-900 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-300">
              Category
            </label>

            <input
              value={displayRecipe.category || ""}
              onChange={(e) =>
                updateRecipe("category", e.target.value)
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-900 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-300">
              Ingredients
            </label>

            <textarea
              rows={8}
              value={
                Array.isArray(displayRecipe.ingredients)
                  ? displayRecipe.ingredients.join("\n")
                  : ""
              }
              onChange={(e) =>
                updateRecipe(
                  "ingredients",
                  e.target.value.split("\n")
                )
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-900 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-300">
              Directions
            </label>

            <textarea
              rows={10}
              value={
                Array.isArray(displayRecipe.directions)
                  ? displayRecipe.directions.join("\n")
                  : ""
              }
              onChange={(e) =>
                updateRecipe(
                  "directions",
                  e.target.value.split("\n")
                )
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-900 p-3"
            />
          </div>

          {!selectedRecipe && (
            <button
              onClick={saveRecipe}
              className="w-full rounded-xl bg-orange-500 py-3 font-semibold hover:bg-orange-600"
            >
              💾 Save Recipe
            </button>
          )}

        </div>
      ) : (
        <div className="rounded-xl bg-slate-900 p-6 text-slate-400">
          Upload a recipe image to begin.
        </div>
      )}
    </div>
  );
}