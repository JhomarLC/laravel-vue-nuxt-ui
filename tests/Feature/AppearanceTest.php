<?php

namespace Tests\Feature;

use Tests\TestCase;

class AppearanceTest extends TestCase
{
    public function test_root_view_bootstraps_system_appearance_as_auto(): void
    {
        $response = $this->withUnencryptedCookie('appearance', 'system')
            ->get(route('login'));

        $response->assertOk();
        $response->assertSee("localStorage.setItem('vueuse-color-scheme', 'auto')", false);
        $response->assertSee("var cookieAppearance = 'system'", false);
    }

    public function test_root_view_bootstraps_dark_appearance(): void
    {
        $response = $this->withUnencryptedCookie('appearance', 'dark')
            ->get(route('login'));

        $response->assertOk();
        $response->assertSee("var cookieAppearance = 'dark'", false);
        $response->assertSee('class="dark"', false);
    }

    public function test_root_view_defaults_to_system_when_appearance_cookie_is_missing(): void
    {
        $response = $this->get(route('login'));

        $response->assertOk();
        $response->assertSee("var cookieAppearance = 'system'", false);
        $response->assertSee("localStorage.setItem('vueuse-color-scheme', 'auto')", false);
    }
}
