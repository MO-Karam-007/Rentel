<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use App\Notifications\offeritem;

class PostController extends BaseController implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    public function index(Request $request)
    {
        $posts = Post::with('creator');

        if ($request->has('search')) {
            $search = $request->input('search');
            $posts->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        $perPage = $request->input('limit', 10);
        $posts = $posts->paginate($perPage);

        return $this->sendResponse($posts, 'Posts retrieved successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $user = Auth::user(); // Authenticated user
        if (!$user) {
            return $this->sendError('User not authenticated', [], 401);
        }

        $validated['creator_id'] = $user->id;

        $post = Post::create($validated);

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
        $user = Auth::user()->role;
        if ($user === 'admin') {
            $post->delete();
            return $this->sendResponse([], 'Post deleted successfully');
        } else {
            return $this->sendError('User not authorized to delete this post', [], 403);
        }
    }

    public function offer($postId, $itemId)
    {
        // Retrieve the post
        $post = Post::with('creator')->find($postId);

        // Check if the post exists
        if (!$post) {
            return $this->sendError('Post not found', [], 404);
        }

        // Get the authenticated user (the one making the offer)
        $authUser = Auth::user();

        if (!$authUser) {
            return $this->sendError('User not authenticated', [], 401);
        }

        // Get the creator of the post
        $creator = $post->creator;

        // Check if the creator exists and isn't the same as the authenticated user
        if ($creator && $creator->id !== $authUser->id) {
            // Send notification to the creator of the post via the database channel
            $creator->notify(new offeritem($authUser, $post, $itemId));
        }

        return $this->sendResponse([], 'Offer made and notification sent successfully');
    }
}
