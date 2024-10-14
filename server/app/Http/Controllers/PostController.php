<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends BaseController
{
    // public static function middleware()
    // {
    //     return [
    //         new Middleware('auth:sanctum', except: ['index', 'show'])
    //     ];
    // }
    public function index()
    {
        $posts = Post::with('creator')->get();
        return $this->sendResponse($posts, 'Posts retrieved successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $post = Post::create([
         //   'creator_id' => Auth::id(),
            'creator_id' => 1,

            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        return $this->sendResponse($post, 'Post created successfully', 201);
    }

    public function show($id)
    {
        $post = Post::with('creator')->find($id);

        if (!$post) {
            return $this->sendError('Post not found', [], 404);
        }

        return $this->sendResponse($post, 'Post retrieved successfully');
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
        ]);

        $post->update($validated);

        return $this->sendResponse($post, 'Post updated successfully');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return $this->sendResponse([], 'Post deleted successfully');
    }
}
