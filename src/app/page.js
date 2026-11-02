"use client";

import { useState, useEffect } from "react";

import { extractText } from "../lib/ocr";
import { parseRecipe } from "../lib/parser";

import OCRPanel from "../components/OCRPanel";
import RecipeLibrary from "../components/RecipeLibrary";
import RecipeDetails from "../components/RecipeDetails";

export default function Home() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipevault");

    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "recipevault",
      JSON.stringify(recipes)
    );
  }, [recipes]);

  async function handleFile(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setLoading(true);

    try {
      const ocrText = await extractText(file);

      setText(ocrText);

      const parsedRecipe = parseRecipe(ocrText);

      parsedRecipe.image = imageUrl;

      setRecipe(parsedRecipe);
      setSelectedRecipe(null);
    } catch (error) {
      console.error(error);
      alert("OCR failed");
    }

    setLoading(false);
  }

  function saveRecipe() {
    if (!recipe) return;

    const newRecipe = {
      id: Date.now(),
      ...recipe,
      image,
      rawText: text,
    };

    setRecipes((prev) => [newRecipe, ...prev]);
  }

  function deleteRecipe(id) {
    setRecipes((prev) =>
      prev.filter((item) => item.id !== id)
    );

    if (selectedRecipe?.id === id) {
      setSelectedRecipe(null);
    }
  }

  function updateRecipe(field, value) {
    if (selectedRecipe) {
      setSelectedRecipe((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setRecipe((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  }

  const filteredRecipes = recipes.filter((item) =>
    item.recipeName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const displayRecipe = selectedRecipe || recipe;

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-orange-400">
            📖 RecipeVault
          </h1>

          <p className="mt-2 text-slate-300">
            Scan, organise and search your recipes.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">

          <h2 className="mb-4 text-2xl font-semibold">
            📷 Scan Recipe
          </h2>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFile}
          />

          {loading && (
            <div className="mt-4 rounded-lg bg-orange-500/20 p-3 text-orange-300">
              Reading recipe...
            </div>
          )}

          {image && (
            <img
              src={image}
              alt="Recipe"
              className="mt-4 max-h-80 rounded-xl border border-slate-600"
            />
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr_1fr]">

          <RecipeLibrary
            recipes={filteredRecipes}
            search={search}
            setSearch={setSearch}
            setSelectedRecipe={setSelectedRecipe}
            deleteRecipe={deleteRecipe}
          />

          <OCRPanel
            text={text}
            setText={setText}
          />

          <RecipeDetails
            displayRecipe={displayRecipe}
            selectedRecipe={selectedRecipe}
            saveRecipe={saveRecipe}
            updateRecipe={updateRecipe}
          />

        </div>

      </div>
    </main>
  );
}