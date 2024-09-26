<?php

use App\Http\Controllers\InstagramScraperController;
use App\Http\Controllers\RapidApiController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::controller(InstagramScraperController::class)->prefix('apify')->group(function (){
  Route::post('/run-actor', 'createRun');
  Route::get('/dataset/{id}', 'getDataSet');
  Route::get('/run-status/{id}', 'checkRunStatus');
  Route::get('/proxy-image', 'proxyImage');
});

Route::controller(RapidApiController::class)->prefix('rapidapi')->group(function() {
  Route::get('/get-reels', 'getUserReels');
});