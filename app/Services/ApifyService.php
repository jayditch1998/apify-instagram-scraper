<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Http;

class ApifyService
{
  protected $actorId;
  protected $token;
  protected $client;
  protected $username;
  protected $resultLimit;

  public function __construct()
  {
    $this->actorId = config('apify.actor_id');
    $this->token = config('apify.token');
    $this->resultLimit = config('apify.result_limit');
  }

  public function setUsername(string $username)
  {
    return $this->username = $username;
  }

  public function scrapeInstagramData()
  {
    $actor = $this->actorId;
    $username = $this->username;
    $token = $this->token;

    $response = Http::withOptions([
      'verify' => false,
    ])->post("https://api.apify.com/v2/acts/$actor/runs?token=$token", [
          'directUrls' => [
            "https://www.instagram.com/$username/"
          ],
          'resultsType' => 'posts',
          'resultsLimit' => intval($this->resultLimit),
          'searchType' => 'hashtag',
          'searchLimit' => 1,
          'addParentData' => false,
        ]);

    return $response->json();
  }

  public function fetchDataset(string $datasetId)
  {
    $response = Http::withOptions([
      'verify' => false,
    ])->get("https://api.apify.com/v2/datasets/$datasetId/items?clean=true&format=json&limit=1000");

    return $response->json();
  }

  public function checkRunStatus(string $id)
  {
    $token = $this->token;

    $response = Http::withOptions([
      'verify' => false,
    ])->get("https://api.apify.com/v2/actor-runs/$id?token=$token");

    return $response->json()['data'];
  }

  public function proxyImage($imageUrl)
  {
    $response = Http::withOptions([
      'verify' => false,
    ])->get($imageUrl);

    if ($response->successful()) {
      return response($response->body(), $response->status())
        ->header('Content-Type', $response->header('Content-Type'));
    } else {
      return response()->json(['error' => 'Failed to fetch image'], $response->status());
    }
  }
}