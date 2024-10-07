<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemImageController extends BaseController
{
   
    public function store(Request $request, $itemId)
    {
        $request->validate([
            'item_images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $item = Item::findOrFail($itemId);

        if ($request->hasFile('item_images')) {
            foreach ($request->file('item_images') as $image) {
                $path = $image->store('item_images', 'public');  
                ItemImage::create([
                    'item_id' => $item->id,
                    'image_path' => $path,
                ]);
            }
        }

        return response()->json(['message' => 'Images uploaded successfully'], 201);
    }

   
    public function show($itemId)
    {
        $item = Item::with('itemImages')->findOrFail($itemId);

        return response()->json(['images' => $item->itemImages], 200);
    }

    public function update(Request $request, $imageId)
    {
        $request->validate([
            'item_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $image = ItemImage::findOrFail($imageId);

        if (Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }

        $path = $request->file('item_image')->store('item_images', 'public');

        $image->update(['image_path' => $path]);

        return response()->json(['message' => 'Image updated successfully'], 200);
    }

    public function destroy($imageId)
    {
        $image = ItemImage::findOrFail($imageId);

        if (Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }

       
        $image->delete();

        return response()->json(['message' => 'Image deleted successfully'], 200);
    }
}
