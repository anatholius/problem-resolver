<?php

namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ProblemRepository")
 */
class Problem
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
     * @ORM\OneToMany(targetEntity="App\Entity\Goal", mappedBy="problem")
     */
    private $goals;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Obstacle", mappedBy="problem")
     */
    private $obstacles;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Opportunity", mappedBy="problem")
     */
    private $opportunities;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Solution", mappedBy="problem", cascade={"persist", "remove"})
     */
    private $solution;

    public function __construct()
    {
        $this->goals = new ArrayCollection();
        $this->obstacles = new ArrayCollection();
        $this->opportunities = new ArrayCollection();
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
            $goal->setProblem($this);
        }

        return $this;
    }

    public function removeGoal(Goal $goal): self
    {
        if ($this->goals->contains($goal)) {
            $this->goals->removeElement($goal);
            // set the owning side to null (unless already changed)
            if ($goal->getProblem() === $this) {
                $goal->setProblem(null);
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
            $obstacle->setProblem($this);
        }

        return $this;
    }

    public function removeObstacle(Obstacle $obstacle): self
    {
        if ($this->obstacles->contains($obstacle)) {
            $this->obstacles->removeElement($obstacle);
            // set the owning side to null (unless already changed)
            if ($obstacle->getProblem() === $this) {
                $obstacle->setProblem(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Opportunity[]
     */
    public function getOpportunities(): Collection
    {
        return $this->opportunities;
    }

    public function addOpportunity(Opportunity $opportunity): self
    {
        if (!$this->opportunities->contains($opportunity)) {
            $this->opportunities[] = $opportunity;
            $opportunity->setProblem($this);
        }

        return $this;
    }

    public function removeOpportunity(Opportunity $opportunity): self
    {
        if ($this->opportunities->contains($opportunity)) {
            $this->opportunities->removeElement($opportunity);
            // set the owning side to null (unless already changed)
            if ($opportunity->getProblem() === $this) {
                $opportunity->setProblem(null);
            }
        }

        return $this;
    }

    public function getSolution(): ?Solution
    {
        return $this->solution;
    }

    public function setSolution(?Solution $solution): self
    {
        $this->solution = $solution;

        // set (or unset) the owning side of the relation if necessary
        $newProblem = null === $solution ? null : $this;
        if ($solution->getProblem() !== $newProblem) {
            $solution->setProblem($newProblem);
        }

        return $this;
    }
}
