<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\OpportunityRepository")
 */
class Opportunity
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
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Goal", mappedBy="opportunity")
     */
    private $goals;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Obstacle", mappedBy="opportunity")
     */
    private $obstacles;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Problem", inversedBy="opportunities")
     */
    private $problem;

    public function __construct()
    {
        $this->goals = new ArrayCollection();
        $this->obstacles = new ArrayCollection();
    }

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|Goal[]
     */
    public function getGoals(): Collection
    {
        return $this->goals;
    }

    public function addGoal(Goal $goal): self
    {
        if (!$this->goals->contains($goal)) {
            $this->goals[] = $goal;
            $goal->setOpportunity($this);
        }

        return $this;
    }

    public function removeGoal(Goal $goal): self
    {
        if ($this->goals->contains($goal)) {
            $this->goals->removeElement($goal);
            // set the owning side to null (unless already changed)
            if ($goal->getOpportunity() === $this) {
                $goal->setOpportunity(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Obstacle[]
     */
    public function getObstacles(): Collection
    {
        return $this->obstacles;
    }

    public function addObstacle(Obstacle $obstacle): self
    {
        if (!$this->obstacles->contains($obstacle)) {
            $this->obstacles[] = $obstacle;
            $obstacle->setOpportunity($this);
        }

        return $this;
    }

    public function removeObstacle(Obstacle $obstacle): self
    {
        if ($this->obstacles->contains($obstacle)) {
            $this->obstacles->removeElement($obstacle);
            // set the owning side to null (unless already changed)
            if ($obstacle->getOpportunity() === $this) {
                $obstacle->setOpportunity(null);
            }
        }

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
}
