<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <!-- Styles -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="font-sans antialiased dark:bg-black dark:text-white/50">
      <div id="app"></div>
    </body>
</html>
