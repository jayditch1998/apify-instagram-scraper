<?php

namespace App\Http\Controllers;

use App\Services\ApifyService;
use Illuminate\Http\Request;

class InstagramScraperController extends Controller
{
  public function __construct(private ApifyService $apifyService) { }

  public function createRun(Request $request)
  {
    try {
      $service =  new $this->apifyService;
      $service->setUsername($request->username);
      return $service->scrapeInstagramData();
    } catch (\Throwable $throwable) {
      return response()->json([
        'message' => $throwable->getMessage(),
      ], status: 500);
    }
  }

  public function getDataSet(string $id)
  {
    try {
      return (new $this->apifyService)->fetchDataset($id);
    } catch (\Throwable $throwable) {
      return response()->json([
        'message' => $throwable->getMessage(),
      ], status: 500);
    }
  }

  public function checkRunStatus(string $id)
  {
    try {
      return (new $this->apifyService)->checkRunStatus($id);
    } catch (\Throwable $throwable) {
      return response()->json([
        'message' => $throwable->getMessage(),
      ], status: 500);
    }
  }

  public function proxyImage(Request $request)
  {
    try {
      return (new $this->apifyService)->proxyImage($request->image_url);
    } catch (\Throwable $throwable) {
      return response()->json([
        'message' => $throwable->getMessage(),
      ], status: 500);
    }
  }
}
