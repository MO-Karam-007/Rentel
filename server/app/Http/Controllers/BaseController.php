<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    //

    public function sendResponse($result, $msg)
    {
        $response = [
            'success' => true,
            'data' => $result,
            'message' => $msg
        ];
        return response()->json($response, 200);
    }



    public function sendError($error, $error_msgs = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error
        ];

        if (!empty($error_msgs)) {
            $response['data'] = $error_msgs;
        }

        return response()->json($response, $code);
    }
}
