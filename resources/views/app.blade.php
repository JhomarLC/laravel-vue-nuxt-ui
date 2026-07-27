<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#ffffff">

        {{-- Bootstrap color mode before paint (vueuse storage + Laravel appearance cookie) --}}
        <script>
            (function() {
                var cookieAppearance = '{{ $appearance ?? "system" }}';
                var appearance = localStorage.getItem('appearance') || cookieAppearance || 'system';
                var mode;

                if (appearance === 'system') {
                    mode = 'auto';
                    localStorage.setItem('vueuse-color-scheme', 'auto');
                } else if (appearance === 'light' || appearance === 'dark') {
                    mode = appearance;
                    localStorage.setItem('vueuse-color-scheme', appearance);
                } else {
                    mode = localStorage.getItem('vueuse-color-scheme') || 'auto';
                }

                var dark = mode === 'dark'
                    || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

                document.documentElement.classList.toggle('dark', !!dark);
                document.querySelector('meta[name="theme-color"]').setAttribute('content', dark ? '#18181b' : '#ffffff');
            })();
        </script>

        <style>
            html {
                background-color: #ffffff;
            }

            html.dark {
                background-color: #18181b;
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @vite(['resources/css/app.css', 'resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <div class="isolate">
            <x-inertia::app />
        </div>
    </body>
</html>
