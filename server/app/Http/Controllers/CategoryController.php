<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class CategoryController extends BaseController implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    public function index()
    {
        $categories = Category::all();
        return $this->sendResponse($categories, 'Categories retrieved successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255',
        ]);

        $category = Category::create($validated);

        return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
    }

    public function show($id)
    {
        $category = Category::with('items')->find($id); // Load items if needed

        if (!$category) {
            return $this->sendError('Category not found', 404);
        }

        return $this->sendResponse($category, 200);
    }

    public function update(Request $request, Category $category)
    {
        Gate::authorize('modify', $category);

        $validated = $request->validate([
            'name' => 'string|max:255',
        ]);

        $category->update($validated);

        return $this->sendResponse(['message' => 'Category updated successfully', 'category' => $category], 200);
    }

    public function destroy(Category $category)
    {
        Gate::authorize('modify', $category);

        $category->delete();

        return $this->sendResponse(['message' => 'Category deleted successfully'], 200);
    }
}
