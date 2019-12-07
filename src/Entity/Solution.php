<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\SolutionRepository")
 */
class Solution
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
    private $title;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Problem", inversedBy="solution", cascade={"persist", "remove"})
     */
    private $problem;

    /**
     * @ORM\Column(type="text")
     */
    private $summary;

    /**
     * @ORM\Column(type="simple_array")
     */
    private $reproduction = [];

    /**
     * @ORM\Column(type="text")
     */
    private $guide;

    /**
     * @ORM\Column(type="simple_array", nullable=true)
     */
    private $examples = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getProblem(): ?Problem
    {
        return $this->problem;
    }

    public function setProblem(?Problem $problem): self
    {
        $this->problem = $problem;

        return $this;
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(string $summary): self
    {
        $this->summary = $summary;

        return $this;
    }

    public function getReproduction(): ?array
    {
        return $this->reproduction;
    }

    public function setReproduction(array $reproduction): self
    {
        $this->reproduction = $reproduction;

        return $this;
    }

    public function getGuide(): ?string
    {
        return $this->guide;
    }

    public function setGuide(string $guide): self
    {
        $this->guide = $guide;

        return $this;
    }

    public function getExamples(): ?array
    {
        return $this->examples;
    }

    public function setExamples(?array $examples): self
    {
        $this->examples = $examples;

        return $this;
    }
}
