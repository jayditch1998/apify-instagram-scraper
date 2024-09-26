<?php

namespace App\Http\Controllers;

use App\Services\RapidInstagramScraperService;
use Illuminate\Http\Request;

class RapidApiController extends Controller
{
  public function getUserReels(Request $request)
  {
    try {
      $service = new RapidInstagramScraperService();
      $service->setUsername($request->username);
      return $service->getUserReels();
    } catch (\Throwable $throwable) {
      return response()->json([
        'message' => $throwable->getMessage(),
      ], status: 500);
    }
  }
}
