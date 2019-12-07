<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\DictionaryRepository")
 */
class Dictionary
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $term;

    /**
     * @ORM\Column(type="text")
     */
    private $definition;

    /**
     * @ORM\Column(type="simple_array", nullable=true)
     */
    private $relatedTo = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTerm(): ?string
    {
        return $this->term;
    }

    public function setTerm(string $term): self
    {
        $this->term = $term;

        return $this;
    }

    public function getDefinition(): ?string
    {
        return $this->definition;
    }

    public function setDefinition(string $definition): self
    {
        $this->definition = $definition;

        return $this;
    }

    public function getRelatedTo(): ?array
    {
        return $this->relatedTo;
    }

    public function setRelatedTo(?array $relatedTo): self
    {
        $this->relatedTo = $relatedTo;

        return $this;
    }
}
