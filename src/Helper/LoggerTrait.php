<?php
/**
 * LoggerTrait.php - powered by PhpStorm
 *
 * Idea & Mind of Anatol Derbisz
 * Copyright(c) 2019 by Anatholius Programowanie <biuro@anatholius.pro>
 * Made with passion in Wrocław
 *
 * On: 09-07-2019 10:18:40
 */

namespace App\Helper;


use Psr\Log\LoggerInterface;

trait LoggerTrait
{
    
    /** @var LoggerInterface|null */
    private $logger;
    
    /**
     * @required
     */
    public function setLogger(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }
    
    public function logInfo(string $message, array $context = [])
    {
        if ($this->logger) {
            $this->logger->info($message, $context);
        }
    }
    
}