<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemSpecification;
use Illuminate\Http\Request;

class ItemSpecificationController extends Controller
{
    public function store(Request $request, Item $item)
    {
        $validated = $request->validate([
            'specifications' => 'required|array',
            'specifications.*.spec_name' => 'required|string',
            'specifications.*.spec_value' => 'required|string',
        ]);

        foreach ($validated['specifications'] as $specification) {
            ItemSpecification::create([
                'item_id' => $item->id,
                'spec_name' => $specification['spec_name'],
                'spec_value' => $specification['spec_value'],
            ]);
        }

        return response()->json(['message' => 'Specifications added successfully'], 201);
    }

    public function update(Request $request, ItemSpecification $specification)
    {
        $validated = $request->validate([
            'spec_name' => 'required|string',
            'spec_value' => 'required|string',
        ]);

        $specification->update($validated);

        return response()->json(['message' => 'Specification updated successfully'], 200);
    }

    public function destroy(ItemSpecification $specification)
    {
        $specification->delete();

        return response()->json(['message' => 'Specification deleted successfully'], 200);
    }
}
