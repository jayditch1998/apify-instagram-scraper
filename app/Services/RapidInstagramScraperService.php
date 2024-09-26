<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class RapidInstagramScraperService
{
  protected $key;
  protected $host;
  protected $username;

  public function __construct()
  {
    $this->key = config('rapid.key');
    $this->host = config('rapid.host');
  }

  public function setUsername(string $username)
  {
    $this->username = $username;
  }

  public function getUserReels()
  {
    $username = $this->username;
    $response = Http::withOptions([
      'verify' => false,
    ])->withHeaders([
      'x-rapidapi-key' => '73927eb1aamsh60e6a5e86e90867p13ec6bjsn42c1f0ff4631',
      'x-rapidapi-host' => 'instagram-scraper-api3.p.rapidapi.com',
    ])->get("https://instagram-scraper-api3.p.rapidapi.com/user_reels?username_or_id=$username");

    return $response->json();
  }

}