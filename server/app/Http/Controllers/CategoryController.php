<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
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
        $categories = Category::orderBy('id', 'asc')->get();
        return $this->sendResponse($categories, 'Categories retrieved successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255'
        ]);
        $category = Category::create($validated);

        return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
    }

    public function show($id)
    {
        $category = Category::find($id); // Load items if needed

        if (!$category) {
            return $this->sendError('Category not found', 404);
        }

        return $this->sendResponse($category, 200);
    }

    public function update(Request $request, Category $category)
    {
        $user = Auth::user()->role;

        $validated = $request->validate([
            'category' => 'string|max:255',
        ]);
        if ($user === 'admin') {
            $category->update($validated);
            return $this->sendResponse(['message' => 'Category updated successfully', 'category' => $category], 200);
        } else {
            return $this->sendError('User not Authenticated', [], 401);
        }
    }

    public function destroy(Category $category)
    {
        $user = Auth::user()->role;
        if ($user === 'admin') {
            $category->delete();
            return $this->sendResponse(['message' => 'Category deleted successfully'], 200);
        } else {
            return $this->sendError('User not Authenticated', [], 401);
        }
    }
}
