<?php

namespace App\Twig;


use Symfony\Component\Dotenv\Dotenv;
use Twig\Extension\AbstractExtension;
use Twig\Extension\ExtensionInterface;
use Twig\TwigFilter;
use Twig\TwigFunction;

class EnvExtension extends AbstractExtension
{
    
    public function getFunctions(): array
    {
        return [
            new TwigFunction('getEnv', [$this, 'envVariable']),
        ];
    }
    
    public function envVariable($varName)
    {
        return $_SERVER[$varName];
    }
}
